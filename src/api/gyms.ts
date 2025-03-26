import { client } from '../utils/fetchClient';

export const gyms = {
   getGymsNear: ({ lat, lon }: { lat: number; lon: number }) => {
      return client.get(`/gyms/?at${lat},${lon}`);
   },
   getGymsByCity: () => {},
};
