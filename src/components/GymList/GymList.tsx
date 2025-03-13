import styles from './GymList.module.scss';


export const GymList = () => {
   return (
      <div className={styles.gyms}>
         {/* <nav className={styles.nav}>
            <div className={styles.filters}>
               <p>Filters</p>
               <img src="/images/other/icons/black-filter-icon.svg" alt="Filters" />
            </div>
         </nav> */}
         <ul className={styles.list}>
            {/* <GymItem item={item} /> */}
         </ul>
      </div>
   );
};
