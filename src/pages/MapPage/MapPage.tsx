import styles from './MapPage.module.scss';

import { useGeolocated } from 'react-geolocated';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState, useCallback } from 'react';

import { CitiesContext } from '../../app/store/CitiesContext';
import { gyms as gymsAPI } from '../../api/gymsApi';

import { City } from '../../app/types/City';
import { Gym } from '../../app/types/Gym';

import { Map } from '../../components/Map';
import { SearchForm } from '../../components/SearchForm';
import { normalizePlacesData } from '../../app/utils/normalizeGymData';
import { Loader } from '../../components/Loader';
import { CategoriesContext } from '../../app/store/CategoriesContext';

export const MapPage = () => {
   const [searchParams] = useSearchParams();
   const cityParam = searchParams.get('city') || '';
   const categoryParam = searchParams.get('category') || '';
   const [selectedCity, setSelectedCity] = useState<City | null>(null);

   const { cities } = useContext(CitiesContext);
   const { categories } = useContext(CategoriesContext);

   const { coords } = useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      userDecisionTimeout: 5000,
   });

   const [gyms, setGyms] = useState<Gym[]>([]);
   const [loading, setLoading] = useState(false);
   const [hasFetched, setHasFetched] = useState(false);

   // Main function to fetch gyms based on city or user coordinates
   const getGyms = useCallback(async () => {
      setLoading(true);

      try {
         const city = cities.find((c) => c.title.toLowerCase() === cityParam.toLowerCase()) || null;
         setSelectedCity(city);

         const category = categories.find((c) => c.title.toLowerCase() === categoryParam.toLowerCase()) || null;

         let res;
         if (city) {
            res = await gymsAPI.getNear(city.pos, 30000);
         } else if (coords?.latitude && coords?.longitude) {
            res = await gymsAPI.getNear([coords.latitude, coords.longitude], 2500);
         } else {
            throw new Error('No city or coordinates available');
         }

         if (!res.ok) throw new Error('Error fetching gyms');

         const data = await res.json();

         const resData = normalizePlacesData(data.items);

         const filteredGyms = resData.filter((gym) => {
            if (category) {
               return gym.categories.some((cat) => cat.toLowerCase() === category.title.toLowerCase());
            }
            return true;
         });

         setGyms(filteredGyms);
      } catch (err) {
         // Optional: log or show error
      } finally {
         setLoading(false);
      }
   }, [cityParam, categoryParam, coords, cities]);

   // Auto-fetch only once on mount if there's city or coords
   useEffect(() => {
      if ((cityParam || coords) && !hasFetched) {
         getGyms();
         setHasFetched(true);
      }
   }, [getGyms, coords, cityParam, hasFetched]);

   // Disable scroll when loading
   useEffect(() => {
      document.body.style.overflow = loading ? 'hidden' : '';
      return () => {
         document.body.style.overflow = '';
      };
   }, [loading]);

   return (
      <div className={styles.page}>
         <SearchForm className={styles.search} onSearch={getGyms} />
         <div className={styles.container}>
            <Outlet context={gyms} />
            {(selectedCity || coords) && (
               <Map
                  userPos={coords && [coords.latitude, coords.longitude]}
                  pos={
                     selectedCity
                        ? selectedCity.pos
                        : coords
                          ? [coords.latitude, coords.longitude]
                          : [0, 0]
                  }
                  gyms={gyms}
               />
            )}
         </div>
         {loading && <Loader className={styles.loader} />}
      </div>
   );
};
