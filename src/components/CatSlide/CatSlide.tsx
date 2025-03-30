// @ts-ignore
import { SplideSlide } from '@splidejs/react-splide';
import { Category } from '../../types/Category';
import { Link } from 'react-router-dom';


import styles from './CatSlide.module.scss';

type Props = {
   cat: Category;
}

export const CatSlide: React.FC<Props> = ({ cat }) => {
   return (
      <SplideSlide className={styles.slide}>
         <div className={styles.content}>
            <h3 className={styles.title}>{cat.title}</h3>
            <img className={styles.img} src={cat.img_url} alt={cat.title} />
            <div className={styles.buttons}>
               <Link className={styles.btnFirst} to="">
                  See where
               </Link>
               <Link className={styles.btnSecond} to="">
                  <img src="/images/other/icons/black-search-icon.svg" alt={cat.title} />
               </Link>
            </div>
         </div>
      </SplideSlide>
   );
};
