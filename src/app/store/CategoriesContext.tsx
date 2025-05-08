import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Category } from '../types/Category';
import getCategories from '../../api/categoriesApi';

interface CategoriesContextProps {
   categories: Category[];
}

export const CategoriesContext = createContext<CategoriesContextProps>({
   categories: [],
});

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [categories, setCategories] = useState<Category[]>([]);

   useEffect(() => {
      getCategories()
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setCategories(data.map((item: any) => ({ id: item.id, title: item.name } as Category)));
         })
         .catch()
         .finally();
   }, []);

   return (
      <CategoriesContext.Provider value={{ categories }}>{children}</CategoriesContext.Provider>
   );
};
