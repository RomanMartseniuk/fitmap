from django.contrib.gis.geos import Point
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import generics
from rest_framework import viewsets, status
from rest_framework.response import Response

from app.utils import get_nearby_gyms
from fitmap.settings import DEFAULT_RADIUS, BLACKLIST_RADIUS_SEARCH
from app.helpers import process_sport_places
import requests
from app.models import SportEstablishment, City, BlackListedArea, Category
from app.serializers import (FitnessEstablishmentSerializer, GymsByCityRetrieveSerializer, GymsNearbySerializer,
                             CitySerializer, CategorySerializer)
from permissions import IsAdminOrIfAuthenticatedReadOnly


class FitnessEstablishmentViewSet(viewsets.ModelViewSet):
    serializer_class = FitnessEstablishmentSerializer
    queryset = SportEstablishment.objects.all()


class CategoriesListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SearchableCityListView(generics.ListAPIView):
    queryset = City.objects.filter(searchable_by_city=True)
    serializer_class = CitySerializer


class SportPlaceByCityAndCategoryView(generics.ListAPIView):
    serializer_class = GymsByCityRetrieveSerializer

    def get_queryset(self):
        city_name = self.request.query_params.get("city")
        category_name = self.request.query_params.get("category")

        if not city_name:
            return SportEstablishment.objects.none()

        queryset = SportEstablishment.objects.filter(
            city__searchable_by_city=True,
            city__city__iexact=city_name,
        ).select_related("city").prefetch_related("categories")

        if category_name:
            queryset = queryset.filter(categories__name__iexact=category_name)

        return queryset

    def list(self, request, *args, **kwargs):
        city_name = request.query_params.get("city")

        if not city_name:
            return Response({"detail": "You must provide city"}, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"detail": "No sport places found for the given city and category."},
                status=status.HTTP_404_NOT_FOUND
            )

        return super().list(request, *args, **kwargs)


class GymsNearbyUser(generics.ListAPIView):
    """Get nearby gyms with at=la,lo and r=radius searching"""
    serializer_class = GymsNearbySerializer
    queryset = SportEstablishment.objects.all()

    @method_decorator(cache_page(60 * 20))
    def list(self, request, *args, **kwargs):
        at = request.query_params.get("at")
        r = request.query_params.get("r", DEFAULT_RADIUS)

        if not at:
            return Response(
                {"error": "Missing 'at' parameter. Expected format: 'latitude,longitude'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            latitude, longitude = map(float, at.split(','))
            user_point = Point(longitude, latitude, srid=4326)

            if BlackListedArea.is_area_blacklisted([longitude, latitude], BLACKLIST_RADIUS_SEARCH):
                return Response(
                    {"details": "No nearby gyms"},
                    status=status.HTTP_404_NOT_FOUND
                )

            gyms_data = get_nearby_gyms(at, r)

            if not gyms_data:
                BlackListedArea.objects.create(
                    coordinates=Point(longitude, latitude),
                    annotation="Empty area"
                )
                return Response(
                    {"details": "No nearby gyms"},
                    status=status.HTTP_404_NOT_FOUND
                )

            process_sport_places(gyms_data)
            return Response(gyms_data, status=status.HTTP_200_OK)

        except ValueError:
            return Response(
                {"error": "Invalid coordinates in 'at'. Expected format: 'latitude,longitude'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except requests.RequestException as e:
            return Response(
                {"error": "Failed to fetch data from external API", "details": str(e)},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        except Exception as e:
            return Response(
                {"error": "An unknown error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
