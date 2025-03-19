import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { user as userAPI } from '../api/userApi';

type User = {
   id: number;
   email: string;
   firstName: string;
   lastName: string;
   adress: string | null;
   phone: string | null;
};

export const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [accessToken, setAccessToken] = useState<string | null>(null);
   const [refreshToken, setRefreshToken] = useState<string | null>(null);

   //const [user, setUser] = useState<any>(null);

   const updateAccessToken = () => {
      if (refreshToken) {
         userAPI
            .tokenRefresh(refreshToken)
            .then((res) => res.json())
            .then((data) => {
               setAccessToken(data.access);
               localStorage.setItem('accessToken', data.access);
            })
            .catch()
            .finally();
      }
   };

   useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');


      if (refreshToken) {
         setRefreshToken(refreshToken);
         if (accessToken !== null) {
            userAPI.tokenVerify(accessToken).then(res => {
               if (res.status === 401) {
                  updateAccessToken();
                  throw new Error('401');
               }

               setAccessToken(accessToken);
            });
         } else {
            updateAccessToken();
         }

      }
   }, []);

   useEffect(() => {
      if (accessToken !== null) {
         userAPI
            .data(accessToken)
            .then((res) => {
               if (res.status === 401) {
                  throw new Error('401');
               }

               return res.json();
            })
            .then((data) => console.log(data))
            .catch((err) => {
               console.log(err);
               if (err.message === '401') {
                  updateAccessToken();
               }
            })
            .finally();
      }
   }, [accessToken]);

   return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};
