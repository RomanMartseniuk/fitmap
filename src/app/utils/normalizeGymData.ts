import { Gym } from "../types/Gym";

export function normalizePlacesData(data: any[]): Gym[] {
   return data.map((item: any): Gym => {
      let lat: number | null = null;
      let lng: number | null = null;

      if (item.position) {
         lat = item.position.lat;
         lng = item.position.lng;
      } else if (typeof item.coordinates === 'string') {
         const match = item.coordinates.match(/POINT \(([\d.]+) ([\d.]+)\)/);
         if (match) {
            lng = parseFloat(match[1]);
            lat = parseFloat(match[2]);
         }
      }

      const categories: string[] = (item.categories || []).map((c: any) =>
         typeof c === 'string' ? c : c.name,
      );

      let phone: string | null = null;
      if (item.contacts?.phone?.length) {
         phone = item.contacts.phone[0].value;
      } else if (item.telephone_number) {
         phone = item.telephone_number;
      }

      const address: string =
         item.address?.label ||
         item.address_label ||
         [
            item.street || item.address?.street,
            item.house_number || item.address?.houseNumber,
            item.district || item.address?.district,
            typeof item.city === 'string' ? item.city : item.address?.city,
            item.countryName || item.address?.countryName || 'Ukraine',
         ]
            .filter(Boolean)
            .join(', ');

      return {
         title: item.title || 'Без назви',
         city: (item.district ?? item.address?.district ?? null)?.toString() ?? null,
         categories,
         coordinates: lat !== null && lng !== null ? [lat, lng] : null,
         weekly_schedule:
            Array.isArray(item.weekly_schedule) && item.weekly_schedule.length > 0
               ? item.weekly_schedule
               : [],
         contacts: {
            email: item.email || null,
            phone,
            web: item.site || null,
         },
         address,
      };
   });
}
