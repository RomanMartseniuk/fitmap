import styles from './MapPage.module.scss';

import { useGeolocated } from 'react-geolocated';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { CitiesContext } from '../../app/store/CitiesContext';
import { gyms as gymsAPI } from '../../api/gymsApi';

import { City } from '../../app/types/City';

import { Map } from '../../components/Map';
import { SearchForm } from '../../components/SearchForm';
import { normalizePlacesData } from '../../app/utils/normalizeGymData';
import { Gym } from '../../app/types/Gym';
import { Loader } from '../../components/Loader';

export const MapPage = () => {
   // Work with search params
   const [searchParams] = useSearchParams();
   const { cities } = useContext(CitiesContext);

   const [city, setCity] = useState<City | null>(null);

   useEffect(() => {
      const city = searchParams.get('city') || '';

      setCity(cities.find((c) => c.title.toLowerCase() === city.toLowerCase()) as City | null);
   }, [cities, searchParams]);

   const { coords } = useGeolocated({
      positionOptions: {
         enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
   });

   // Getting gyms
   const [gyms, setGyms] = useState<Gym[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const getGyms = async () => {
      if (!city && !coords) return;

      try {
         let res;
         setLoading(true);
         if (city) {
            res = await gymsAPI.getNear(city.pos, 10000);
         } else if (coords) {
            res = await gymsAPI.getNear([coords.latitude, coords.longitude], 2500);
         } else {
            throw new Error('No position');
         }

         if (!res.ok) {
            throw new Error('Error fetching gyms');
         }

         const data = await res.json();

         const resData = normalizePlacesData(data);

         console.log(resData);

         setGyms(resData);
      } catch (err) {
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (city || coords) {
         getGyms();
      }
   }, [city, coords]);

   useEffect(() => {
      if (loading) {
         document.body.style.overflow = 'hidden'; // Заборона скролу
      } else {
         document.body.style.overflow = ''; // Повернення до нормального стану
      }

      return () => {
         document.body.style.overflow = ''; // При розмонтуванні компонента
      };
   }, [loading]);

   return (
      <div className={styles.page}>
         <SearchForm className={styles.search} />
         <div className={styles.container}>
            <Outlet context={gyms} />
            <Map
               userPos={coords && [coords.latitude, coords.longitude]}
               pos={city ? city.pos : coords ? [coords.latitude, coords.longitude] : [0, 0]}
               gyms={gyms}
            />
         </div>
         {loading && <Loader className={styles.loader} />}
      </div>
   );
};
