import { Gym } from '../types/Gym';

export function normalizePlacesData(apiData: any[]): Gym[] {
   return apiData.map((item: any): Gym => {
      const phone = item.contacts?.[0]?.phone?.[0]?.value || null;
      const web = item.contacts?.[0]?.www?.[0]?.value || null;
      const email = item.contacts?.[0]?.email?.[0]?.value || null;

      return {
         id: item.id,
         title: item.title,
         city: item.address?.city || null,
         categories: item.categories?.map((c: any) => c.name) || [],
         coordinates: item.position ? [item.position.lat, item.position.lng] : null,
         weekly_schedule: [], // можна заповнити згодом
         contacts: {
            email,
            phone,
            web,
         },
         address: item.address?.label || '',
      };
   });
}