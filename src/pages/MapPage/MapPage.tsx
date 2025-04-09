import styles from './MapPage.module.scss';

import { useGeolocated } from 'react-geolocated';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { CitiesContext } from '../../store/CitiesContext';
import { gyms as gymsAPI } from '../../api/gymsApi';

import { City } from '../../types/City';

import { Map } from '../../components/Map';
import { SearchForm } from '../../components/SearchForm';

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
   const [gyms, setGyms] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const getGyms = async () => {
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

         console.log(res);

         if (!res.ok) {
            throw new Error('Error fetching gyms');
         }

         const data = await res.json();

         setGyms(data);
      } catch (err) {
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      getGyms();
   }, [city, coords]);

   return (
      <div className={styles.page}>
         <SearchForm className={styles.search} />
         <div className={styles.container}>
            <Outlet context={gyms} />
            <Map
               userPos={coords && [coords.latitude, coords.longitude]}
               pos={city ? city.pos : coords ? [coords.latitude, coords.longitude] : [0, 0]}
            />
         </div>
      </div>
   );
};
/*   

 {
        "title": "Stadion",
        "city": 1,
        "address_label": "Stadion, Vinnytsia, Ukraine",
        "categories": [
            {
                "id": 10,
                "name": "Running Track"
            },
            {
                "id": 3,
                "name": "Sports Facility/Venue"
            },
            {
                "id": 4,
                "name": "Sports Complex/Stadium"
            }
        ],
        "distance": 670,
        "weekly_schedule": "[]",
        "telephone_number": "",
        "site": "",
        "email": null,
        "street": null,
        "house_number": null,
        "district": "Vinnytsia"
    },

*/


