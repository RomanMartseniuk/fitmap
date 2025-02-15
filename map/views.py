from django.contrib.gis.geos import Point

from rest_framework import viewsets, views, status
from rest_framework.response import Response

from fitmap import settings
from map.utils import get_categories, get_contacts
import requests
from map.models import SportEstablishment, Category, City
from map.serializers import FitnessEstablishmentSerializer
from permissions import IsAdminOrIfAuthenticatedReadOnly

HERE_API_KEY = settings.HERE_API_KEY


class FitnessEstablishmentViewSet(viewsets.ModelViewSet):
    queryset = SportEstablishment.objects.all()


class GymsNearbyUser(views.APIView):
    """Get nearby gyms with at=la,lo and r=radius searching"""

    def get(self, request, format=None):
        at = request.query_params.get('at')
        r = request.query_params.get('r')
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
                for item in response.json().get("items", []):
                    address_data = item.get("address", {})
                    place_position = item.get("position", {})
                    lat = place_position.get("lat")
                    lng = place_position.get("lng")
                    coords = Point(float(lng), float(lat), srid=4326)

                    phones, sites = get_contacts(item.get("contacts", []))

                    categories = get_categories(item.get("categories", []))
                    for category_ in categories:
                        category_.save()

                    city = City.objects.get_or_create(
                        county=address_data.get("county"),
                        city=address_data.get("city"),
                        district=address_data.get("district"),
                    )

                    sport_place = SportEstablishment.objects.create(
                        title=item.get("title"),
                        here_id=item.get("id"),
                        city=city[0],
                        address_label=address_data.get("label"),
                        coordinates=coords,
                        telephone_number=", ".join(phones),
                        site=", ".join(sites),
                        street=address_data.get("street"),
                        house_number=address_data.get("houseNumber"),

                    )

                    if categories:
                        sport_place.categories.set(categories)



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
