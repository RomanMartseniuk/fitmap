from django.db import models


class SportEstablishment(models.Model):
    title = models.CharField(max_length=255)
    here_id = models.CharField(max_length=255)
    city = models.ForeignKey("City", on_delete=models.CASCADE)
    address_label = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    categories = models.ManyToManyField("Category")
    working_hours = models.DateTimeField(blank=True, null=True)
    working_days = models.DateField(blank=True, null=True)
    telephone_number = models.CharField(max_length=255)
    site = models.URLField(blank=True, null=True)
    email = models.EmailField(max_length=100)
    street = models.CharField(max_length=100, blank=True, null=True)
    house_number = models.CharField(max_length=20, blank=True, null=True)




class Category(models.Model):
    here_id = models.CharField(max_length=255)
    name = models.CharField(max_length=100)

class City(models.Model):
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    district = models.CharField(max_length=100)

