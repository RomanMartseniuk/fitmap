import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { Category } from '../types/Category';
import getCategories from '../../api/categoriesApi';
import { City } from '../types/City';
import getCities from '../../api/citiesApi';
import { MessagesContext } from './MessageContext';

interface StaticDataContextProps {
   categories: Category[];
   cities: City[];
}

export const StaticDataContext = createContext<StaticDataContextProps>({
   categories: [],
   cities: [],
});

export const StaticDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const { addMessage } = useContext(MessagesContext);

   const [categories, setCategories] = useState<Category[]>([]);
   const [cities, setCities] = useState<City[]>([]);

   useEffect(() => {
      getCategories()
         .then((res) => {
            if (res.status === 404) {
               addMessage({
                  type: 'error',
                  text: 'Cannot connect to the server. Please try again later.',
               });
               return;
            }

            return res.json();
         })
         .then((data) => {
            if (data.length === 0) {
               throw new Error('No categories found');
            }
            
            setCategories(data);
         })
         .catch(() => {
            addMessage({
               type: 'error',
               text: 'Failed to load categories',
            });
         })
         .finally();

      getCities()
         .then((res) => {
            if (res.status === 404) {
               addMessage({
                  type: 'error',
                  text: 'Cannot connect to the server. Please try again later.',
               });
            }

            return res.json();
         })
         .then((data) => {
            if (data.length === 0) {
               throw new Error('No categories found');
            }
            setCities(data.sort((a: City, b: City) => a.title.localeCompare(b.title)));
         })
         .catch(() => {
            addMessage({
               type: 'error',
               text: 'Failed to load cities',
            });
         })
         .finally();
   }, []);

   return (
      <StaticDataContext.Provider value={{ categories, cities }}>
         {children}
      </StaticDataContext.Provider>
   );
};
