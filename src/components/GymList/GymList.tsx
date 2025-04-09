import { useOutletContext } from 'react-router-dom';
import { Gym } from '../../types/Gym';
import { GymItem } from '../GymItem';
import styles from './GymList.module.scss';

const item: Gym = {
   id: 0,
   title: 'GYM TOP',
   adress: {
      str: 'adress 1123123 fdbrgbfg',
      city: 'Kyiv',
   },
   categories: ['Fitness'],
   pos: [49.23395, 28.4196869],
   contacts: {
      web: '',
      tel: '',
      mail: '',
   },
   img_url: '/images/category_images/gym.jpg'
};

type item = {
   title: string;
   city: number;
   address_label: string;
   categories: {
      id: number;
      name: string;
   }[];
   district: string;
   site: string;
   email: string;
   telephone_number: string;
};

export const GymList = () => {
   const gyms: item[] = useOutletContext();

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
</div>