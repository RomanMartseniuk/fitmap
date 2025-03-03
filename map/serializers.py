from rest_framework import serializers

from map.models import SportEstablishment, City, Category


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


class GymsNearbySerializer(serializers.Serializer):
    at = serializers.CharField(required=True)
    r = serializers.IntegerField(required=False, default=10000)

    def validate_at(self, value):
        value = value.replace(" ", "")
        latitude, longitude = map(float, value.split(','))
        if not (-90 <= latitude <= 90) or not (-180 <= longitude <= 180):
            raise serializers.ValidationError(
                "Latitude must be between -90 and 90, longitude between -180 and 180"
            )
        return value

    def validate_r(self, value):
        if not isinstance(value, int):
            try:
                value = float(value)
            except:
                raise serializers.ValidationError("Radius must be integer 0 < r <= 10000")
        if value <= 0:
            raise serializers.ValidationError("Radius must be a positive integer.")
        return value

    def get_is_default_r(self):
        if "r" in self.initial_data:
            return self.initial_data["r"], self.fields["r"].default
