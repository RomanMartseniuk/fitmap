from rest_framework import serializers

from map.models import SportEstablishment


class FitnessEstablishmentSerializer(serializers.Serializer):
    class Meta:
        model = SportEstablishment
        fields = "__all__"


class FitnessEstablishmentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportEstablishment
        fields = "__all__"
