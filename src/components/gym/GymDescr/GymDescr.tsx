import { Link, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import styles from './GymDescr.module.scss';
import { Gym } from '../../../app/types/Gym';
import { useEffect, useState } from 'react';

export const GymDescr = () => {
   const navigate = useNavigate();
   const location = useLocation(); // Отримуємо поточне місце в URL
   const gymId = useParams().gymId || '';
   const gyms: Gym[] = useOutletContext();
   const [gym, setGym] = useState<Gym | null>(null);

   useEffect(() => {
      const gym = gyms.find((g) => g.id === gymId);
      if (!gym) {
         navigate('/map');
      } else {
         setGym(gym);
      }
   }, [gyms, gymId, navigate]);

   const searchParams = new URLSearchParams(location.search);
   const city = searchParams.get('city'); // наприклад, city

   // Формуємо шлях назад з параметрами пошуку
   const backLink = city ? `/map?city=${city}` : '/map'; 

   return (
      <div className={styles.gym}>
         <nav className={styles.nav}>
            <Link to={backLink} className={styles.back_btn}>
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
                  <h1>{gym?.title}</h1>
                  <span>
                     <p>4,6</p>
                     <img src="/images/other/icons/black-rate-star-icon.svg" alt="Rate" />
                  </span>
               </div>
               <p className={styles.adress}>{gym?.address}</p>
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
            <a href="#contacts" className={styles.contact_btn}>
               <img src="/images/other/icons/black-plus-icon.svg" alt="plus icon" />
               <p>Contact Gym</p>
               <img src="/images/other/icons/black-plus-icon.svg" alt="plus icon" />
            </a>
            {/* <div className={styles.filters}>
               <h2 className={styles.h2}>Filter Matches</h2>
               <ul>
                  <li>Group classes</li>
                  <li>Bath</li>
                  <li>Parking</li>
               </ul>
            </div> */}
            <div className={styles.offers}>
               <h2 className={styles.h2}>Offers</h2>
               <ul>{gym?.categories.map((category: string) => <li key={category}>{category}</li>)}</ul>
            </div>
            <div id="contacts" className={styles.contacts}>
               <h2 className={styles.h2}>Contact</h2>
               <ul>
                  <li>
                     {gym?.contacts.web && (
                        <a href={gym?.contacts.web}>
                           <img src="/images/other/icons/black-web-icon.svg" alt="Web" />
                           <p>{gym?.contacts.web}</p>
                        </a>
                     )}
                  </li>
                  <li>
                     {gym?.contacts.email && (
                        <a href={gym?.contacts.email}>
                           <img src="/images/other/icons/black-mail-icon.svg" alt="Email" />
                           <p>{gym?.contacts.email}</p>
                        </a>
                     )}
                  </li>
                  <li>
                     {gym?.contacts.phone && (
                        <a href={gym?.contacts.phone}>
                           <img src="/images/other/icons/black-phone-icon.svg" alt="Tel" />
                           <p>+380{gym?.contacts.phone}</p>
                        </a>
                     )}
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};
// +380 43 232 48 53
