from django.core.management import BaseCommand

from app.seeders import write_cities_from_json_to_db, write_categories_from_csv_to_db, \
    write_sport_establishments_by_city_name


class Command(BaseCommand):
    """django command to add  source data in database"""

    def handle(self, *args, **options):
        self.stdout.write("Data filling has begun...")

        self.stdout.write("Cities filling has been started. 1/3")
        write_cities_from_json_to_db()
        self.stdout.write("Cities filling has completed. 1/3")

        self.stdout.write("Categorys filling has been started. 2/3")
        write_categories_from_csv_to_db()
        self.stdout.write("Categorys filling has completed. 2/3")

        self.stdout.write("Sport establishments filling has been started. 3/3")
        write_sport_establishments_by_city_name()
        self.stdout.write("Sport establishments filling has completed. 3/3")