from rest_framework import viewsets, views, status
from rest_framework.response import Response

from fitmap import settings
from map.utils import get_nearby_gyms_osm
import requests
from map.models import SportEstablishment
from map.serializers import FitnessEstablishmentSerializer
from permissions import IsAdminOrIfAuthenticatedReadOnly

HERE_API_KEY = settings.HERE_API_KEY


class FitnessEstablishmentViewSet(viewsets.ModelViewSet):
    queryset = SportEstablishment.objects.all()


class GymsNearbyUser(views.APIView):
    """Get nearby gyms with at=la,lo and r=radius searching"""

    def get(self, request, at, r, format=None):
        params = {
            "at": at,
            "categories": "800-8600",
            "in": f"circle:{at};r={r}",
            "apiKey": {HERE_API_KEY}
        }
        try:
            response = requests.get(f"https://browse.search.hereapi.com/v1/browse", params=params)
            if response.status_code == 200:
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

    def post(self, request, format=None):
        at = request.data.get("at")
        r = request.data.get("r")
        return self.get(request, at=at, r=r)
