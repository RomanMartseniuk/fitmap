import { Gym } from '../../types/Gym';
import { GymItem } from '../GymItem';
import styles from './GymList.module.scss';


const item: Gym = {
   id: 1,
   title: 'Gym Name',
   description: 'Gym Description',
   price: 50,
   rate: 4,git 
   category: 'Category',
   city: 'City',
   pos: [0, 0],
   img_url: '/images/category_images/gym.jpg',
};



export const GymList = () => {
   return (
      <div className={styles.gyms}>
         <nav className={styles.nav}>
            <div className={styles.filters}>
               <p>Filters</p>
               <img src="/images/other/icons/black-filter-icon.svg" alt="Filters" />
            </div>
         </nav>
         <ul className={styles.list}>
            <GymItem item={item} />
         </ul>
      </div>
   );
};
