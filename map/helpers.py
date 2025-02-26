from django.contrib.gis.geos import Point

from map.models import Category, SportEstablishment, City


def get_categories(categories: list) -> list[Category]:
    categories_list = []
    for category in categories:
        here_id = category.get("id")
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

        city, created = City.objects.get_or_create(
            county=address_data.get("county"),
            city=address_data.get("city"),
            district=address_data.get("district"),
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
