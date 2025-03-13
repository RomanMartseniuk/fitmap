import styles from './MapPage.module.scss';

import { Map } from '../../components/Map';
import { SearchForm } from '../../components/SearchForm';
import { useGeolocated } from 'react-geolocated';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CitiesContext } from '../../store/CitiesContext';
import { City } from '../../types/City';

export const MapPage = () => {
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

   return (
      <div className={styles.mapPage}>
         <SearchForm className={styles.search} />
         <div className={styles.container}>
            <Outlet />
            <Map
               userPos={coords && [coords.latitude, coords.longitude]}
               pos={city ? city.pos : coords ? [coords.latitude, coords.longitude] : [0, 0]}
            />
         </div>
      </div>
   );
};
