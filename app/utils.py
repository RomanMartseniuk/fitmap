from django.contrib.gis.geos import Point
from geopy.distance import distance


def distance_between_two_points(point1: Point, point2: Point):
    return int(distance(point1, point2).meters)
