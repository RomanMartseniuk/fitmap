import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { City } from '../types/City';
import getCities from '../api/citiesApi';

interface CitiesContextProps {
   cities: City[];
}

export const CitiesContext = createContext<CitiesContextProps>({ cities: [] });

export const CitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [cities, setCities] = useState<City[]>([]);

   useEffect(() => {
      getCities()
         .then((res) => res.json())
         .then((data) => setCities(data as City[]))
         .catch()
         .finally();
   }, []);

   return <CitiesContext.Provider value={{ cities }}>{children}</CitiesContext.Provider>;
};
