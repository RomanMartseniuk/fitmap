import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Category } from '../types/Category';
import getCategories from '../../api/categoriesApi';
import { City } from '../types/City';
import getCities from '../../api/citiesApi';

interface StaticDataContextProps {
   categories: Category[];
   cities: City[];
}

export const StaticDataContext = createContext<StaticDataContextProps>({
   categories: [],
   cities: [],
});

export const StaticDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [categories, setCategories] = useState<Category[]>([]);
   const [cities, setCities] = useState<City[]>([]);

   useEffect(() => {
      getCategories()
         .then((res) => res.json())
         .then((data) => {
            setCategories(data.map((item: any) => ({ id: item.id, title: item.name }) as Category));
         })
         .catch()
         .finally();

      getCities()
         .then((res) => res.json())
         .then((data)=> {
            setCities(data.sort((a: City, b: City) => a.title.localeCompare(b.title)));
         })
         .catch()
         .finally();
   }, []);

   return (
      <StaticDataContext.Provider value={{ categories, cities }}>
         {children}
      </StaticDataContext.Provider>
   );
};
