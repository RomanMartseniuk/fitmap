from django.urls import path
from rest_framework import routers


from app.views import FitnessEstablishmentViewSet, GymsNearbyUser, GymsByCityView, SportCategories

app_name = "app"

router = routers.DefaultRouter()
router.register("establishments", FitnessEstablishmentViewSet)

urlpatterns = [
    path("gyms-by-city/", GymsByCityView.as_view(), name="city-places"),
    path("gyms/", GymsNearbyUser.as_view(), name="gyms"),
    path("categories/", SportCategories.as_view(), name="categories")
]

urlpatterns += router.urls