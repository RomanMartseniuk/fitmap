from django.contrib.gis.db import models


class SportEstablishment(models.Model):
    title = models.CharField(max_length=255)
    here_id = models.CharField(max_length=255)
    city = models.ForeignKey("City", on_delete=models.CASCADE)
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

    @property
    def as_circle(self):
        """
        Возвращает круг (Polygon) вокруг точки.
        """
        return self.coordinates.buffer(self.radius / 111320)

    @staticmethod
    def is_area_blacklisted(coordinates, radius):
        """
        Проверяет, пересекается ли запрашиваемая область с черным списком.
        """
        from django.contrib.gis.geos import Point
        la,lo = coordinates[1], coordinates[0]
        query_circle = Point(la, lo).buffer(radius / 111320)

        blacklisted_areas = BlackListedArea.objects.all()
        for area in blacklisted_areas:
            if query_circle.intersects(area.as_circle):
                return True
        return False