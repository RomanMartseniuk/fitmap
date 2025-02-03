from rest_framework import routers

from map.views import FitnessEstablishmentViewSet

router = routers.DefaultRouter()
router.register("establishments", FitnessEstablishmentViewSet)
