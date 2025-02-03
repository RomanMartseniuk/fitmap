from django.db import models


class FitnessEstablishment(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(max_length=255)
    working_hours = models.CharField(max_length=255)
    working_days = models.CharField(max_length=255)
    telephone_number = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    sport_activities = models.ManyToManyField('SportActivity', blank=True, related_name='activities')
    additional_services = models.ManyToManyField('AdditionalService', blank=True, related_name='services')
    location = models.CharField(max_length=255)  # надо посмотреть как прикрутить gps


class SportActivity(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()


class AdditionalService(models.Model):
    name = models.CharField(max_length=255)
