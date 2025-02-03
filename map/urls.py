from django.urls import path
from rest_framework import routers

from map.views import FitnessEstablishmentViewSet
from user.views import UserLocationView

app_name = "map"

router = routers.DefaultRouter()
router.register("establishments", FitnessEstablishmentViewSet)

urlpatterns = [
    path("api/users/location/", UserLocationView.as_view(), name="user-location"),
]
