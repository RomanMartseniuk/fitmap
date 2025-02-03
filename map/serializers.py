from rest_framework import serializers

from map.models import FitnessEstablishment, SportActivity, AdditionalService


class FitnessEstablishmentSerializer(serializers.Serializer):
    class Meta:
        model = FitnessEstablishment
        fields = (
            "name",
            "price",
            "address",
            "working_hours",
            "working_days",
            "telephone_number",
            "email",
            "sport_activities",
            "additional_service",
            "location",
        )


class FitnessEstablishmentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = FitnessEstablishment
        fields = '__all__'


class SportActivitySerializer(serializers.Serializer):
    class Meta:
        model = SportActivity
        fields = ("name", "description")


class AdditionalServiceSerializer(serializers.Serializer):
    class Meta:
        model = AdditionalService
        fields = ("name",)
