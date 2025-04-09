import React from 'react';
import styles from './GymItem.module.scss';

import { Gym } from '../../types/Gym';

import PlusIcon from '../PlusIcon/PlusIcon';
import { Link } from 'react-router-dom';

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

type Props = {
   item: item;
};

export const GymItem: React.FC<Props> = ({ item }) => {
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
         <Link to="/" className={styles.button}>
            <p>See Details</p>
            <PlusIcon className={styles.btn_icon} />
         </Link>
      </div>
   );
};
