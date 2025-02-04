from django.contrib.sites import requests


def get_nearby_gyms_osm(latitude, longitude, radius=15):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": "gym",
        "format": "json",
        "lat": latitude,
        "lon": longitude,
        "radius": radius * 10000,
    }
    response = requests.get(url, params=params)
    return response.json()
