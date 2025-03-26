import { client } from '../utils/fetchClient';

export const gyms = {
   getGymsNear: ({ lat, lon }: { lat: number; lon: number }, r = 10000) => {
      return client.get(`/gyms/?at=${lat},${lon}&r=${r}`);
   },
   getGymsByCity: () => {},
};
