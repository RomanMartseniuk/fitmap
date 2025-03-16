import { useLocation } from 'react-router-dom';
import { CatSwiper } from '../../components/CatSwiper';
import { SearchForm } from '../../components/SearchForm';

import styles from './HomePage.module.scss';
import { useEffect, useState } from 'react';
import { Login } from '../../components/Login';

export const HomePage = () => {
   const location = useLocation();

   return (
      <div className={styles.page}>
         <section className={styles.intro}>
            <div className={styles.container}>
               <h1 className={styles.title}>Your personal Sports and Wellness Map</h1>
               <SearchForm className={styles.searchF} />
               <CatSwiper />
            </div>
         </section>
         {location.pathname === '/login' && <Login />}
         
      </div>
   );
};
