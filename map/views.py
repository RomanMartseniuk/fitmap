from django.shortcuts import render
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
