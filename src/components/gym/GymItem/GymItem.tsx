import React from 'react';
import styles from './GymItem.module.scss';

import { Gym } from '../../app/types/Gym';

import PlusIcon from '../PlusIcon/PlusIcon';
import { Link, useLocation } from 'react-router-dom';

type Props = {
   item: Gym;
};

export const GymItem: React.FC<Props> = ({ item }) => {
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const city = searchParams.get('city'); // Отримуємо параметр city

   // Формуємо шлях із додаванням city, якщо воно є
   const gymLink = `/map/${item.id}${city ? `?city=${city}` : ''}`;

   return (
      <div className={styles.item}>
         <div className={styles.img}>
            <img src="/images/category_images/gym.jpg" alt={item.title} />
         </div>
         <h1 className={styles.title}>{item.title}</h1>
         {/* <span className={styles.rate}>
            <p>{item.rate}</p>
            <img src="/images/other/icons/black-rate-star-icon.svg" alt="Rate" />
         </span> */}
         {/* <span className={styles.price}>{item.price}$</span> */}
         <Link to={gymLink} className={styles.button}>
            <p>See Details</p>
            <PlusIcon className={styles.btn_icon} />
         </Link>
      </div>
   );
};
