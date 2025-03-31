from rest_framework import serializers

from app.models import SportEstablishment, City, Category


class FitnessEstablishmentSerializer(serializers.Serializer):
    class Meta:
        model = SportEstablishment
        fields = "__all__"

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ("id", "city")



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id" ,"name", )

class FitnessEstablishmentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportEstablishment
        fields = "__all__"


class GymsByCityRetrieveSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    categories = CategorySerializer(read_only=True, many=True)
    class Meta:
        model = SportEstablishment
        fields = ["title", "here_id", "city", "address_label", "coordinates", "categories"]


class GymsNearbySerializer(serializers.ModelSerializer):
    distance = serializers.SerializerMethodField()
    categories = CategorySerializer(read_only=True, many=True)
    def get_distance(self, obj):
        if hasattr(obj, 'distance'):
            return int(obj.distance.m)
        return None

    class Meta:
        model = SportEstablishment
        fields = ("title", "city", "address_label", "categories", "distance",
                  "weekly_schedule", "telephone_number", "site", "email",
                  "street", "house_number", "district")