from django.urls import path
from rest_framework import routers


from map.views import FitnessEstablishmentViewSet, GymsNearbyUser, GymsByCityView

app_name = "map"

router = routers.DefaultRouter()
router.register("establishments", FitnessEstablishmentViewSet)

urlpatterns = [
    path("gyms-in-city/", GymsByCityView.as_view(), name="city-places"),
    path("gyms/", GymsNearbyUser.as_view(), name="gyms"),
]

urlpatterns += router.urls