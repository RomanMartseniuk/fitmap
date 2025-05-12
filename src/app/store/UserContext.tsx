import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { user as userAPI } from '../../api/userApi';

type User = {
   id: number;
   email: string;
   first_name: string;
   last_name: string;
   adress: string | null;
   phone: string | null;
};

type UserContextType = {
   user: User | null;
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
   setTokens: (access: string, refresh: string) => void;
   logout: () => void;
   updateUser: (updates: Partial<User>) => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
   user: null,
   setUser: () => {},
   setTokens: () => {},
   logout: () => {},
   updateUser: async () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [accessToken, setAccessToken] = useState<string | null>(
      localStorage.getItem('accessToken'),
   );
   const [refreshToken, setRefreshToken] = useState<string | null>(
      localStorage.getItem('refreshToken'),
   );
   const [user, setUser] = useState<User | null>(null);

   // 🔄 Оновлення токенів після логіну
   const setTokens = (access: string, refresh: string) => {
      setAccessToken(access);
      setRefreshToken(refresh);
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
   };

   // 🚪 Логаут
   const logout = () => {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
   };

   // 🔄 Оновлення accessToken
   const updateAccessToken = async () => {
      if (!refreshToken) return logout();

      try {
         const res = await userAPI.tokenRefresh(refreshToken);
         if (!res.ok) throw new Error('401');

         const data = await res.json();
         setAccessToken(data.access);
         localStorage.setItem('accessToken', data.access);
      } catch {
         logout();
      }
   };

   // 🏠 Зчитування юзера
   const fetchUserData = async (token: string) => {
      try {
         const res = await userAPI.data(token);
         if (res.status === 401) {
            await updateAccessToken();
            return;
         }
         const data = await res.json();
         setUser(data);
      } catch {
         logout();
      }
   };

   const updateUser = async (updates: Partial<User>) => {
      const token = accessToken;
      if (!token) return;

      try {
         const res = await userAPI.update(token, updates);
         if (!res.ok) {
            if (res.status === 401) {
               await updateAccessToken();
               return;
            }
            throw new Error('Update failed');
         }

         const updatedData = await res.json();
         setUser((prevUser) => ({
            ...prevUser!,
            ...updatedData,
         }));
      } catch (error) {
         console.error('Update user failed:', error);
         logout();
      }
   };

   // 🛠 Слухаємо зміну токенів та отримуємо юзера
   useEffect(() => {
      if (accessToken) {
         fetchUserData(accessToken);
      }
   }, [accessToken]);

   return (
      <UserContext.Provider value={{ user, setUser, setTokens, logout, updateUser }}>
         {children}
      </UserContext.Provider>
   );
};
