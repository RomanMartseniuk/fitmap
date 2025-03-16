import { Link } from 'react-router-dom';
import styles from './GymDescr.module.scss';

export const GymDescr = () => {
   return (
      <div className={styles.gym}>
         <nav className={styles.nav}>
            <Link to='../' className={styles.back_btn}>
               <img src="/images/other/icons/white-arr-left.svg" alt="Back" />
               <p>Back</p>
            </Link>
         </nav>
         <div className={styles.content}>
            <div className={styles.img}>
               <img src="/images/category_images/gym.jpg" alt="Gym Image" />
            </div>
            <div className={styles.main_info}>
               <div>
                  <h1>Smartass Gym&Soul</h1>
                  <span>
                     <p>4,6</p>
                     <img src="/images/other/icons/black-rate-star-icon.svg" alt="Rate" />
                  </span>
               </div>
               <p className={styles.adress}>
                  Gradient БЦ, Korolenkivska St, 4, Kyiv, Ukraine, 01033
               </p>
            </div>
            <div className={styles.scheldue}>
               <div className={styles.day}>
                  <p>Sunday</p>
                  <p>8am-8pm</p>
               </div>
               <div className={styles.day}>
                  <p>Monday</p>
                  <p>7am-10pm</p>
               </div>
               <div className={styles.day}>
                  <p>Tuesday</p>
                  <p>7am-10pm</p>
               </div>
               <div className={styles.day}>
                  <p>Wednesday</p>
                  <p>7am-10pm</p>
               </div>
               <div className={styles.day}>
                  <p>Thursday</p>
                  <p>7am-10pm</p>
               </div>
               <div className={styles.day}>
                  <p>Friday</p>
                  <p>7am-10pm</p>
               </div>
               <div className={styles.day}>
                  <p>Saturday</p>
                  <p>8am-8pm</p>
               </div>
            </div>
            <div className={styles.contact_btn}>
               <img src="/images/other/icons/black-plus-icon.svg" alt="plus icon" />
               <p>Contact Gym</p>
               <img src="/images/other/icons/black-plus-icon.svg" alt="plus icon" />
            </div>
            <div className={styles.filters}>
               <h2 className={styles.h2}>Filter Matches</h2>
               <ul>
                  <li>Group classes</li>
                  <li>Bath</li>
                  <li>Parking</li>
               </ul>
            </div>
            <div className={styles.offers}>
               <h2 className={styles.h2}>Offers</h2>
               <ul>
                  <li>Gym</li>
                  <li>Pilates</li>
                  <li>Run</li>
                  <li>Cycle</li>
               </ul>
            </div>
            <div className={styles.contacts}>
               <h2 className={styles.h2}>Contact</h2>
               <ul>
                  <li>
                     <a href="smartass.com">
                        <img src="/images/other/icons/black-web-icon.svg" alt="Web" />
                        <p>smartass.com</p>
                     </a>
                  </li>
                  <li>
                     <a href="mailto:smartass.com">
                        <img src="/images/other/icons/black-mail-icon.svg" alt="Email" />
                        <p>smartass@gmail.com</p>
                     </a>
                  </li>
                  <li>
                     <a href="tel:smartass.com">
                        <img src="/images/other/icons/black-phone-icon.svg" alt="Tel" />
                        <p>smartass.com</p>
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};
