import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { City } from '../types/City';
import getCities from '../../api/citiesApi';

interface CitiesContextProps {
   cities: City[];
   error: string;
}

export const CitiesContext = createContext<CitiesContextProps>({ cities: [], error: '' });

export const CitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [cities, setCities] = useState<City[]>([]);
   const [error, setError] = useState<string>('');

   useEffect(() => {
      getCities()
         .then((res) => {
            if (!res.ok) throw new Error();
            return res.json();
         })
         .then((data) => setCities(data as City[]))
         .catch(() => {
            setError('Can not load cities... Try again later.');
         });
   }, []);

   return <CitiesContext.Provider value={{ cities, error }}>{children}</CitiesContext.Provider>;
};
