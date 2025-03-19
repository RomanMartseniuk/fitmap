import json
import os

import requests
from django.contrib.gis.geos import Point

from app.models import Category, SportEstablishment, City


def get_categories(categories: list) -> list[Category]:
    categories_list = []
    for category in categories:
        here_id = category.get("id")

        if here_id.startswith("800-8600"):
            name = category.get("name")
            if here_id and name:
                categories_list.append(Category(here_id=here_id, name=name))

    return categories_list


def get_contacts(contacts: list | None) -> tuple | None:
    if contacts is None:
        return [], []

    list_phones = []
    list_sites = []
    for contact in contacts:
        phone_contact = contact.get("phone")
        if phone_contact:
            list_phones = [number.get("value") for number in phone_contact]

        site_contact = contact.get("www")
        if site_contact:
            list_sites = [site_url.get("value") for site_url in site_contact]

    return list_phones, list_sites


def get_opening_time(opening_hours: list[dict] | None):
    if opening_hours is None:
        return []
    work_hours = ""
    for data in opening_hours:
        work_data_list = data.get("text")
        work_hours += " ".join(work_data_list)
    return work_hours


def process_sport_places(data: dict):
    for item in data.get("items", []):
        address_data = item.get("address", {})
        place_position = item.get("position", {})
        lat = place_position.get("lat")
        lng = place_position.get("lng")
        coords = Point(float(lng), float(lat), srid=4326)

        phones, sites = get_contacts(item.get("contacts", []))

        categories = get_categories(item.get("categories", []))
        category_list = []

        for category_ in categories:
            category_obj, answer = Category.objects.get_or_create(name=category_.name, here_id=category_.here_id)
            category_list.append(category_obj)

        district = address_data.get("district")
        if district is None:
            district = address_data.get("city")

        city, created = City.objects.get_or_create(
            county=address_data.get("county"),
            city=address_data.get("city"),
            district=district,
        )

        sport_place, created = SportEstablishment.objects.get_or_create(
            title=item.get("title"),
            here_id=item.get("id"),
            city=city,
            address_label=address_data.get("label"),
            coordinates=coords,
            weekly_schedule=get_opening_time(item.get("openingHours")),
            telephone_number=", ".join(phones),
            site=", ".join(sites),
            street=address_data.get("street"),
            house_number=address_data.get("houseNumber"),

        )

        if categories:
            sport_place.categories.set(category_list)

def write_cities_to_db():
    with open("public/api/cities.json", "r") as file:
        data = json.loads(file.read())
        titles = [i.get('title') for i in data]

        existing_cities = set(City.objects.values_list('city', flat=True))

        cities_to_add = [city for city in titles if city not in existing_cities]

        if not cities_to_add:
            print("All cities already exist in the database.")
            return

        for city in cities_to_add:
            params = {
                "q": city,
                "apiKey": os.getenv("HERE_API_KEY")
            }
            request = requests.get("https://geocode.search.hereapi.com/v1/geocode", params=params)
            request.raise_for_status()

            data = request.json()
            data_items = data.get("items")
            for data in data_items:
                address_data = data.get("address")
                city = address_data.get("city")
                county = address_data.get("county")

                point = data.get("position")
                la = point.get("lat")
                lo = point.get("lng")
                City.objects.get_or_create(
                    city=city,
                    county=county,
                    central_point=Point(lo, la)
                )
