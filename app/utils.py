import requests
from django.contrib.gis.geos import Point
from geopy.distance import distance

from fitmap import settings
from fitmap.settings import DEFAULT_RADIUS


HERE_API_KEY = settings.HERE_API_KEY

def distance_between_two_points(point1: Point, point2: Point):
    return int(distance(point1, point2).meters)


def get_nearby_gyms(at: str, radius: str = DEFAULT_RADIUS):
    """
    Additional method for receiving data from external API
    """
    params = {
        "at": at,
        "categories": "800-8600",
        "in": f"circle:{at};r={radius}",
        "apiKey": HERE_API_KEY,
        "limit": "100",
        "lang": "en"
    }
    response = requests.get("https://browse.search.hereapi.com/v1/browse", params=params)
    response.raise_for_status()

    data = response.json()
    return data