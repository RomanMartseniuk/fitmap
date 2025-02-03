from django.contrib.gis.measure import Distance
from geopy import Point
from rest_framework import viewsets

from map.models import FitnessEstablishment
from map.serializers import FitnessEstablishmentSerializer
from permissions import IsAdminOrIfAuthenticatedReadOnly


class FitnessEstablishmentViewSet(viewsets.ModelViewSet):
    queryset = FitnessEstablishment.objects.prefetch_related(
        "additional_services",
        "sport_activities"
    ).all().order_by("name")

    serializer_class = FitnessEstablishmentSerializer
    permission_classes = (IsAdminOrIfAuthenticatedReadOnly,)

    def get_queryset(self):
        queryset = super().get_queryset()
        latitude = self.request.GET.get('latitude')
        longitude = self.request.GET.get('longitude')
        if latitude and longitude:
            point = Point(longitude, latitude, srid=4326)
            queryset = queryset.filter(location__distance_lte=(point, Distance(km=15)))
        return queryset
