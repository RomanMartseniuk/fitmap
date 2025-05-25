import { useOutletContext } from 'react-router-dom';
import { Gym } from '../../../app/types/Gym';
import { GymItem } from '../GymItem';
import styles from './GymList.module.scss';
import { useState } from 'react';

const DistanceFilter = ({
   distance,
   setDistance,
   setOpen
}: {
   distance: number;
   setDistance: (arg: number) => void;
   setOpen: (arg: boolean) => void;
}) => {
   const [localDist, setLocalDist] = useState(distance);

   return (
      <div className={styles.distance_menu}>
         <img
            src="/images/other/icons/white-close-icon.svg"
            alt="Filters"
            className={styles.distance_menu_close}
            onClick={() => setOpen(false)}
         />
         <h3>Set distance to search</h3>
         <input
            type="range"
            min={0}
            max={20}
            value={localDist}
            onChange={(e) => setLocalDist(Number(e.target.value))}
         />
         <div className={styles.distance_menu_range}>
            <span>
               <p>Minimum</p>
               <div onClick={() => setLocalDist(0)}>0 km</div>
            </span>
            <span>
               <p>Maximum</p>
               <div onClick={() => setLocalDist(20)}>20 km</div>
            </span>
         </div>
         <button className={styles.distance_menu_button} onClick={e => {
            e.preventDefault();
            setDistance(localDist);
            setOpen(false);
         }}>Apply</button>
      </div>
   );
};

export const GymList = () => {
   const gyms: Gym[] = useOutletContext();

   const [distance, setDistance] = useState(0);

   const [changingDistance, setChangingDistance] = useState(false);

   return (
      <div className={styles.gyms}>
         <nav className={styles.nav}>
            <div className={styles.distance} onClick={() => setChangingDistance(!changingDistance)}>
               <p>Distance</p>
               <img src="/images/other/icons/black-filter-icon.svg" alt="Filters" />
            </div>
            {changingDistance && <DistanceFilter distance={distance} setDistance={setDistance} setOpen={setChangingDistance}/>}
         </nav>
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
