import csv
import json
import os

import requests
from django.contrib.gis.geos import Point

from app.models import City, Category


def write_cities_from_json_to_db(path_file="public/json/cities.json"):
    with open(path_file, "r") as file:
        data = json.loads(file.read())
        titles = [i.get('title') for i in data]

        existing_cities = set(City.objects.values_list('city', flat=True))

        print(f"existing cities {existing_cities}")
        cities_to_add = [city for city in titles if city not in existing_cities]

        print(f"cities to add {cities_to_add}")
        if not cities_to_add:
            print("All cities already exist in the database.")
            return

        for city in cities_to_add:
            params = {
                "q": city,
                "apiKey": os.getenv("HERE_API_KEY"),
                "in": "countryCode:UKR",
                "lang": "en"
            }
            request = requests.get("https://geocode.search.hereapi.com/v1/geocode", params=params)
            request.raise_for_status()

            data = request.json()
            data_items = data.get("items")
            for data in data_items:
                address_data = data.get("address")
                city = address_data.get("city")
                county = address_data.get("county")
                district = address_data.get("district", None)
                if "raion" in city and district is not None:
                    city = district
                print(
                    f"City: {city}, County: {county}"
                )
                point = data.get("position")
                la = point.get("lat")
                lo = point.get("lng")
                city, created = City.objects.get_or_create(
                    city=city,
                    county=county,
                    defaults={
                        "central_point": Point(lo, la),
                        "searchable_by_city": True
                    }
                )

                if not created:
                    city.searchable_by_city = True
                    city.save()
                print(f"{city} was added")
        print("cities were added")


def write_categories_from_csv_to_db(path_file="categories.csv"):
    with open(path_file, "r") as file:
        reader  = csv.DictReader(file)
        for row in reader:
            here_id = row["here_id"]
            name = row["name"]
            if not Category.objects.filter(here_id=here_id).exists():
                Category.objects.create(here_id=here_id, name=name)
                print(f"{name} category was added")
