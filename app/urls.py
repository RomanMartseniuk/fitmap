from django.urls import path
from rest_framework import routers


from app.views import FitnessEstablishmentViewSet, GymsNearbyUser, SearchableListView, CategoriesListView, \
    SportPlaceByCityAndCategoryView

app_name = "app"

router = routers.DefaultRouter()
router.register("establishments", FitnessEstablishmentViewSet)

urlpatterns = [
    path("gyms-nearby/", GymsNearbyUser.as_view(), name="gyms"),
    path("city/", SearchableListView.as_view(), name="searchable_city"),
    path("categories/", CategoriesListView.as_view(), name="categories"),
    path("places-map/", SportPlaceByCityAndCategoryView.as_view(), name="map"),

]

urlpatterns += router.urls