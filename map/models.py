from django.contrib.gis.db import models

from map.utils import distance_between_two_points


class SportEstablishment(models.Model):
    title = models.CharField(max_length=255)
    here_id = models.CharField(max_length=255)
    city = models.ForeignKey("City", on_delete=models.CASCADE, related_name="sportestablishments")
    address_label = models.CharField(max_length=255)
    coordinates = models.PointField(geography=True, srid=4326)  # attr srid has using system WGS 84
    categories = models.ManyToManyField("Category")
    weekly_schedule = models.CharField(blank=True, null=True)
    telephone_number = models.CharField(max_length=255)
    site = models.CharField(blank=True, null=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    street = models.CharField(max_length=100, blank=True, null=True)
    house_number = models.CharField(max_length=20, blank=True, null=True)


class Category(models.Model):
    here_id = models.CharField(max_length=255)
    name = models.CharField(max_length=100)


class City(models.Model):
    county = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    district = models.CharField(max_length=100)


class BlackListedArea(models.Model):
    coordinates = models.PointField(geography=True, srid=4326)
    radius = models.IntegerField(default=10000)
    annotation = models.TextField(help_text="Reason to add coordinates in model")
    created_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def is_area_blacklisted(coordinates: list[float] | tuple[float], radius: int) -> int | bool:
        """
        Проверяет, пересекается ли запрашиваемая область с черным списком.
        """
        from django.contrib.gis.geos import Point

        coords_point_obj = Point(coordinates[1], coordinates[0])  # latitude, longitude

        min_distance = float('inf')

        blacklisted_areas = BlackListedArea.objects.all()
        for area in blacklisted_areas:
            distance = distance_between_two_points(area.coordinates, coords_point_obj)
            min_distance = min(min_distance, distance)

        if min_distance > radius:
            return False
        return True
