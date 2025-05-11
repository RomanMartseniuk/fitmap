import { useLocation } from 'react-router-dom';
import { CatSwiper } from '../../components/category/CatSwiper';
import { SearchForm } from '../../components/search/SearchForm';

import styles from './HomePage.module.scss';
import { Login } from '../../components/auth/Login';
import { SingUp } from '../../components/auth/SignUp/SingUp';
import { useEffect } from 'react';

export const HomePage = () => {
   const location = useLocation();

   useEffect(() => {
      if (location.pathname === '/login' || location.pathname === '/sign-up') {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = '';
      }

      return () => {
         document.body.style.overflow = '';
      };
   }, [location.pathname]);

   return (
      <div className={styles.page}>
         <section className={styles.intro}>
            <div className={styles.container}>
               <h1 className={styles.title}>Your personal Sports and Wellness Map</h1>
               <SearchForm className={styles.searchF} />
               <CatSwiper className={styles.slider} />
            </div>
         </section>
         {location.pathname === '/login' && <Login />}
         {location.pathname === '/sign-up' && <SingUp />}
      </div>
   );
};
