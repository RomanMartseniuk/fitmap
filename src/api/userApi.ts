import { client } from '../utils/fetchClient';

export const user = {
   // returns accesToken and refreshToken
   login: (email: string, password: string) => {
      return client.post('/user/token/', { email, password });
   },

   // nothing to process, need to login after this
   register: (firstName: string, lastName: string, email: string, password: string) => {
      return client.post('/user/register/', { firstName, lastName, email, password });
   },

   // return or status 200 or 401
   tokenVerify: (token: string) => {
      return client.post('/user/token/verify/', { token });
   },

   // returns new accessToken
   tokenRefresh: (refresh: string) => {
      return client.post('/user/token/refresh/', { refresh });
   },

   // return user data
   data: (token: string) => {
      const headers = {
         Authorization: `Bearer ${token}`,
      };

      return client.get('/user/me/', headers);
   },
};
