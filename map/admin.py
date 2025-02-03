from django.contrib import admin

from map.models import FitnessEstablishment, SportActivity, AdditionalService


admin.site.register(FitnessEstablishment)
admin.site.register(SportActivity)
admin.site.register(AdditionalService)
