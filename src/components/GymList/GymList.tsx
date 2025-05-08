import { useOutletContext } from 'react-router-dom';
import { Gym } from '../../app/types/Gym';
import { GymItem } from '../GymItem';
import styles from './GymList.module.scss';

export const GymList = () => {
   const gyms: Gym[] = useOutletContext();

   return (
      <div className={styles.gyms}>
         {/* <nav className={styles.nav}>
            <div className={styles.filters}>
               <p>Filters</p>
               <img src="/images/other/icons/black-filter-icon.svg" alt="Filters" />
            </div>
         </nav> */}
         <ul className={styles.list}>
            {/* <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} />
            <GymItem item={item} /> */}

            {gyms.map((gym, id) => (
               <GymItem key={id} item={gym} />
            ))}
         </ul>
      </div>
   );
};

<div className="page">
   <div className="container">
      <div className="list"></div>
   </div>
   <div className="map"></div>
</div>;
