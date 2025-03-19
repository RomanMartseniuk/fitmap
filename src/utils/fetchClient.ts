const BASE_URL = 'http://localhost:5174/api';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request(
   url: string,
   method: RequestMethod = 'GET',
   data: any = null,
   headers: any = {},
) {
   const options: RequestInit = { method, headers: { ...headers } };

   if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
      options.headers = {
         ...options.headers,
         'Content-Type': 'application/json; charset=UTF-8',
      };
   }

   return fetch(BASE_URL + url, options);
}

export const client = {
   get: (url: string, headers?: any) => request(url, 'GET', null, headers),
   post: (url: string, data: any) => request(url, 'POST', data),
   patch: (url: string, data: any) => request(url, 'PATCH', data),
   delete: (url: string) => request(url, 'DELETE'),
};
