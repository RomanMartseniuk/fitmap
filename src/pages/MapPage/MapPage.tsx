import styles from './MapPage.module.scss';

import { GymList } from '../../components/GymList';
import { Map } from '../../components/Map';
import { SearchForm } from '../../components/SearchForm';
import { useGeolocated } from 'react-geolocated';

export const MapPage = () => {
   const { coords } = useGeolocated({
      positionOptions: {
         enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
   });
   return (
      <div className={styles.mapPage}>
         <SearchForm className={styles.search} />
         <div className={styles.container}>
            <GymList />
            <Map pos={coords ? [coords?.latitude, coords?.longitude] : [0,0]} />
         </div>
      </div>
   );
};
