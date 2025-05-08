import { client } from '../app/utils/fetchClient';

export const user = {
   // returns accesToken and refreshToken
   login: (email: string, password: string) => {
      return client.post('/user/token/', { email, password });
   },

   // nothing to process, need to login after this
   register: (first_name: string, last_name: string, email: string, password: string) => {
      return client.post('/user/register/', { first_name, last_name, email, password });
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

export const login = async (
   loading: React.Dispatch<React.SetStateAction<boolean>>,
   validation: boolean,
   email: string,
   password: string,
   setTokens: (access: string, refresh: string) => void,
) => {
   console.log(email, password);
   loading(true);

   if (!validation) {
      loading(false);
      return;
   }

   try {
      const res = await user.login(email, password);

      if (!res.ok) {
         if (res.status === 401) {
            throw new Error('401');
         }
         throw new Error(`${res.status}`);
      }

      const data = await res.json();

      setTokens(data.access, data.refresh);

      window.location.href = '/';
   } catch (err) {
      console.error(err);
   } finally {
      loading(false);
   }
};

export const register = async (
   loading: React.Dispatch<React.SetStateAction<boolean>>,
   validation: boolean,
   firstName: string,
   lastName: string,
   email: string,
   password: string,
   setTokens: (access: string, refresh: string) => void,
   error: (arg: string) => void,
) => {
   loading(true);
   if (!validation) {
      loading(false);
      return;
   }

   try {
      const res = await user.register(firstName, lastName, email, password);

      if (!res.ok) {
         if (res.status === 400) {
            const data = await res.json();
            error(data.email[0]);
         }
         throw new Error(`${res.status}`);
      }

      login(() => {}, validation, email, password, setTokens);
   } catch (err) {
      console.error(err);
   } finally {
      loading(false);
   }
};
