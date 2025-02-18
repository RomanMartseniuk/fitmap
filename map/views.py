from django.contrib.gis.geos import Point
from django.db.models import Q

from rest_framework import viewsets, views, status
from rest_framework.response import Response

from fitmap import settings
from map.helpers import get_categories, get_contacts, get_opening_time
import requests
from map.models import SportEstablishment, Category, City
from map.serializers import FitnessEstablishmentSerializer, GymsByCityRetrieveSerializer
from permissions import IsAdminOrIfAuthenticatedReadOnly

HERE_API_KEY = settings.HERE_API_KEY


def process_sport_places(data: dict):
    for item in data.get("items", []):
        address_data = item.get("address", {})
        place_position = item.get("position", {})
        lat = place_position.get("lat")
        lng = place_position.get("lng")
        coords = Point(float(lng), float(lat), srid=4326)

        phones, sites = get_contacts(item.get("contacts", []))

        categories = get_categories(item.get("categories", []))
        category_list = []

        for category_ in categories:
            category_obj, answer = Category.objects.get_or_create(name=category_.name, here_id=category_.here_id)
            category_list.append(category_obj)

        city, created = City.objects.get_or_create(
            county=address_data.get("county"),
            city=address_data.get("city"),
            district=address_data.get("district"),
        )

        sport_place, created = SportEstablishment.objects.get_or_create(
            title=item.get("title"),
            here_id=item.get("id"),
            city=city,
            address_label=address_data.get("label"),
            coordinates=coords,
            weekly_schedule=get_opening_time(item.get("openingHours")),
            telephone_number=", ".join(phones),
            site=", ".join(sites),
            street=address_data.get("street"),
            house_number=address_data.get("houseNumber"),

        )

        if categories:
            sport_place.categories.set(category_list)


class FitnessEstablishmentViewSet(viewsets.ModelViewSet):
    queryset = SportEstablishment.objects.all()


class GymsByCityView(views.APIView):
    def get(self, request):
        city = request.query_params.get("city")
        matching_city = City.objects.filter(Q(city__iexact=city)
                                            | Q(district__iexact=city))
        if not matching_city:
            return Response({"details": "City not found"}, status=status.HTTP_404_NOT_FOUND)

        gyms_in_city = SportEstablishment.objects.filter(city__in=matching_city)
        serializer = GymsByCityRetrieveSerializer(gyms_in_city, many=True)
        return Response(serializer.data)


class GymsNearbyUser(views.APIView):
    """Get nearby gyms with at=la,lo and r=radius searching"""

    def get(self, request):
        at: str = request.query_params.get('at')
        r: int = request.query_params.get('r', 3500)


        if not at or not r:
            return Response(
                {"error": "Missing parameters", "details": "Please provide 'at' (latitude,longitude) and 'r' (radius)"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not isinstance(r, int):
            return Response({"error":"Invalid parameter r","detail": "radius of finding places must be type int"}, status=status.HTTP_400_BAD_REQUEST)

        latitude, longitude = map(float, at.split(','))
        if not (-90 <= latitude <= 90) or not (-180 <= longitude <= 180):
            return Response(
                {"error": "Invalid coordinates",
                 "details": "Latitude must be between -90 and 90, longitude between -180 and 180"},
                status=status.HTTP_400_BAD_REQUEST
            )
        params = {
            "at": at,
            "categories": "800-8600",
            "in": f"circle:{at};r={r}",
            "apiKey": {HERE_API_KEY},
            "limit": "100",
        }
        try:
            response = requests.get(f"https://browse.search.hereapi.com/v1/browse", params=params)
            if response.status_code == 200:
                process_sport_places(response.json())
                return Response(response.json(), status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "External API request failed", "details": response.text},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except requests.RequestException as e:
            return Response(
                {"error": "Request failed", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
