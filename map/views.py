from rest_framework import viewsets, views, status
from rest_framework.response import Response

from fitmap import settings
from map.utils import get_nearby_gyms_osm
import requests
from map.models import FitnessEstablishment, SportActivity, AdditionalService
from map.serializers import (
    FitnessEstablishmentSerializer,
    SportActivitySerializer,
    AdditionalServiceSerializer,
)
from permissions import IsAdminOrIfAuthenticatedReadOnly

HERE_API_KEY = settings.HERE_API_KEY


class FitnessEstablishmentViewSet(viewsets.ModelViewSet):
    queryset = (
        FitnessEstablishment.objects.prefetch_related(
            "additional_services", "sport_activities"
        )
        .all()
        .order_by("name")
    )

    serializer_class = FitnessEstablishmentSerializer
    permission_classes = (IsAdminOrIfAuthenticatedReadOnly,)

    @staticmethod
    def _params_to_ints(qs):
        """Converts a list of string IDs to a list of integers"""
        return [int(str_id) for str_id in qs.split(",")]

    def get_queryset(self):
        """Retrieve the movies with filters"""
        sport_activities = self.request.query_params.get("sport_activities")
        additional_services = self.request.query_params.get("additional_services")
        price = self.request.query_params.get("price")

        queryset = self.queryset

        if sport_activities:
            queryset = queryset.filter(sport_activities__icontains=sport_activities)

        if additional_services:
            queryset = queryset.filter(additional_services__id__in=additional_services)

        if price:
            price_ids = self._params_to_ints(price)
            queryset = queryset.filter(price__id__in=price_ids)

        return queryset.distinct()

    def get_location(self, request, *args, **kwargs):
        user_lat = float(request.query_params.get("latitude"))
        user_lon = float(request.query_params.get("longitude"))
        gyms_data = get_nearby_gyms_osm(user_lat, user_lon)
        return Response(gyms_data)


class SportActivityView(viewsets.ViewSet):
    queryset = SportActivity.objects.all()
    serializer_class = SportActivitySerializer
    permission_classes = (IsAdminOrIfAuthenticatedReadOnly,)


class AdditionalServiceView(viewsets.ViewSet):
    queryset = AdditionalService.objects.all()
    serializer_class = AdditionalServiceSerializer
    permission_classes = (IsAdminOrIfAuthenticatedReadOnly,)


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
