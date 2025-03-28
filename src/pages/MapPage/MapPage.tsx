import styles from './MapPage.module.scss';

import { Map } from '../../components/Map';
import { SearchForm } from '../../components/SearchForm';
import { useGeolocated } from 'react-geolocated';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CitiesContext } from '../../store/CitiesContext';
import { City } from '../../types/City';
import { gyms as gymsAPI } from '../../api/gyms';

export const MapPage = () => {
   const [searchParams] = useSearchParams();
   const { cities } = useContext(CitiesContext);

   const [city, setCity] = useState<City | null>(null);
   const [gyms, setGyms] = useState<any[]>([]); // Replace 'any' with your actual gym type
   const [errorMessage, setErrorMessage] = useState<string | null>(null);

   useEffect(() => {
      const cityName = searchParams.get('city');
      if (!cityName) {
         setCity(null);
         return;
      }

      const foundCity = cities.find((c) => c.title.toLowerCase() === cityName.toLowerCase());
      setCity(foundCity || null);
   }, [searchParams, cities]);

   const { coords } = useGeolocated({
      positionOptions: {
         enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
   });

   const getGyms = useCallback(async () => {
      if (!coords) return;

      try {
         const res = await gymsAPI.getGymsNear({ lat: coords.latitude, lon: coords.longitude });

         if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
         }

         const data = await res.json();
         setGyms(data);
         console.log(data);
      } catch (err) {
         console.error('Failed to fetch gyms:', err);
         setErrorMessage('Something went wrong. Please try again later.');
      }
   }, [coords]);

   useEffect(() => {
      getGyms();
   }, [coords, city]);

   return (
      <div className={styles.page}>
         <SearchForm className={styles.search} />
         <div className={styles.container}>
            <Outlet />
            <Map
               userPos={coords && [coords.latitude, coords.longitude]}
               pos={city ? city.pos : coords ? [coords.latitude, coords.longitude] : [0, 0]}
               gyms={gyms}
            />
         </div>
      </div>
   );
};
