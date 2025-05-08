import { Category } from '../../app/types/Category';
import { Link } from 'react-router-dom';

import styles from './CatSlide.module.scss';

type Props = {
   cat: Category;
   otherProps?: any;
};

export const CatSlide: React.FC<Props> = ({ cat, otherProps }) => {
   return (
      <div className={styles.slide} {...otherProps}>
         <h1 className={styles.title}>{cat.title}</h1>
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
   );
};
