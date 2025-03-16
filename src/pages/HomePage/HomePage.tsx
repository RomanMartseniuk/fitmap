import { CatSwiper } from '../../components/CatSwiper';
import { SearchForm } from '../../components/SearchForm';

import styles from './HomePage.module.scss';

export const HomePage = () => {
   return (
      <div className={styles.page}>
         <section className={styles.intro}>
            <div className={styles.container}>
               <h1 className={styles.title}>Your personal Sports and Wellness Map</h1>
               <SearchForm className={styles.searchF} />
               <CatSwiper />
            </div>
         </section>
      </div>
   );
};
