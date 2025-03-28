from django.contrib.gis.geos import Point
from django.db.models import Q
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
    queryset = SportEstablishment.objects.select_related("city")
    serializer_class = GymsByCityRetrieveSerializer

    def list(self, request, *args, **kwargs):
        city_name = request.query_params.get("city")
        category_name = request.query_params.get("category")

        if not city_name:
            return Response({"detail": "You must provide city"}, status=status.HTTP_400_BAD_REQUEST)

        if not category_name:
            return Response({"detail": "You must provide category"}, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.get_queryset().filter(
            city__searchable_by_city=True,
            city__city__iexact=city_name,
            categories__name__iexact=category_name
        )

        if not queryset.exists():
            return Response(
                {"detail": "No sport places found for the given city and category."},
                status=status.HTTP_404_NOT_FOUND
            )

        return super().list(request, *args, **kwargs)


class GymsNearbyUser(views.APIView):
    """Get nearby gyms with at=la,lo and r=radius searching"""

    def get(self, request):

        serializer = GymsNearbySerializer(data=request.query_params)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated_data = serializer.validated_data
        at = validated_data.get("at")
        r = validated_data.get("r", 10000)  # Умолчание радиуса

        try:

            latitude, longitude = map(float, at.split(','))

            black_area = BlackListedArea.is_area_blacklisted(
                [longitude, latitude], BLACKLIST_RADIUS_SEARCH
            )

            if black_area is False:
                gyms_data = self.get_nearby_gyms(at, r)
                if not gyms_data:
                    BlackListedArea.objects.get_or_create(
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
