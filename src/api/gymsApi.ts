//import { City } from '../types/City';
import { client } from '../app/utils/fetchClient';

export const gyms = {
   getNear: ([lat, lon]: [number, number], r = 2500) => {
      return client.get(`/gyms-nearby/?at=${lat},${lon}&r=${r}`);
   },

   // getInCity: (city: City) => {
   //    return client.get(`/gyms-nearby/?at=${city.pos[0]},${city.pos[1]}&r=${10000}`);
   // }
};
