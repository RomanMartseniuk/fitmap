import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
export const Footer = () => {
   return (
      <div className={styles.footer}>
         <div className={styles.container}>
            <nav className={styles.nav}>
               <p>© 2025 FitMap</p>
               <Link to="" className={styles.link}>Terms</Link>
               <Link to="" className={styles.link}>Privacy</Link>
               <Link to="" className={styles.link}>Contact us</Link>
            </nav>
            <div className={styles.other}>
               <div className={styles.lang}>
                  <img src="/images/other/icons/white-lang-icon.svg" alt="Language" />
                  <p>English (US)</p>
               </div>
               <p className={styles.curr}>HRN</p>
            </div>
         </div>
      </div>
   );
};
