from map.models import Category


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
