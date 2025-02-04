from rest_framework import routers

from map.views import FitnessEstablishmentViewSet

app_name = "map"

router = routers.DefaultRouter()
router.register("establishments", FitnessEstablishmentViewSet)
router.register()
