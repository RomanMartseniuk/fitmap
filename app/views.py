from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from rest_framework import generics

from rest_framework import viewsets, views, status
from rest_framework.response import Response

from fitmap import settings
from fitmap.settings import DEFAULT_RADIUS, BLACKLIST_RADIUS_SEARCH
from app.helpers import process_sport_places
import requests
from app.models import SportEstablishment, City, BlackListedArea, Category
from app.serializers import (FitnessEstablishmentSerializer, GymsByCityRetrieveSerializer, GymsNearbySerializer,
                             CitySerializer, CategorySerializer)
from permissions import IsAdminOrIfAuthenticatedReadOnly

HERE_API_KEY = settings.HERE_API_KEY


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

        if not city_name or not category_name:
            return SportEstablishment.objects.none()

        return SportEstablishment.objects.filter(
            city__searchable_by_city=True,
            city__city__iexact=city_name,
            categories__name__iexact=category_name
        ).select_related("city").prefetch_related("categories")

    def list(self, request, *args, **kwargs):
        city_name = request.query_params.get("city")
        category_name = request.query_params.get("category")

        if not city_name:
            return Response({"detail": "You must provide city"}, status=status.HTTP_400_BAD_REQUEST)

        if not category_name:
            return Response({"detail": "You must provide category"}, status=status.HTTP_400_BAD_REQUEST)

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

    def list(self, request, *args, **kwargs):
        at = request.query_params.get("at")
        r = request.query_params.get("r", DEFAULT_RADIUS)  # Умолчание радиуса

        try:

            latitude, longitude = map(float, at.split(','))

            black_area = BlackListedArea.is_area_blacklisted(
                [longitude, latitude], BLACKLIST_RADIUS_SEARCH
            )
            user_point = Point(longitude, latitude, srid=4326)

            if black_area is False:
                gyms_nearby = (self.get_queryset()
                               .filter(coordinates__distance_lte=(user_point,D(m=r)))
                               .annotate(distance=Distance('coordinates', user_point))
                               .order_by('distance')
                               .prefetch_related("categories"))
                serializer = self.get_serializer(gyms_nearby, many=True)
                if serializer.data:
                    return Response(serializer.data, status=status.HTTP_200_OK)

                if not serializer.data:
                    gyms_data = self.get_nearby_gyms(at, r)
                    if not gyms_data:
                        BlackListedArea.objects.create(
                            coordinates=Point(latitude, longitude),
                            annotation="Empty area"
                        )
                        return Response(
                            {"details": "No nearby gyms"},
                            status=status.HTTP_200_OK
                        )

                    process_sport_places(gyms_data)

                    return Response(gyms_data, status=status.HTTP_200_OK)

            elif black_area is True:
                return Response(
                    {"details": "No nearby gyms"},
                    status=status.HTTP_200_OK
                )

        except ValueError:
            return Response(
                {"error": "Invalid coordinates in 'at'. Expected format: 'latitude,longitude'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except requests.RequestException as e:
            return Response(
                {"error": "Failed to fetch data from external API", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            return Response(
                {"error": "An unknown error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return super().list( request, *args, **kwargs)

    def get_nearby_gyms(self, at, radius):
        """
        Additional method for receiving data from external API
        """
        params = {
            "at": at,
            "categories": "800-8600",
            "in": f"circle:{at};r={radius}",
            "apiKey": HERE_API_KEY,
            "limit": "100",
            "lang": "en"
        }
        response = requests.get("https://browse.search.hereapi.com/v1/browse", params=params)
        response.raise_for_status()

        data = response.json()
        return data
