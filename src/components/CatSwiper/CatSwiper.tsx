import { useContext, useRef } from 'react';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
// @ts-ignore
import '@splidejs/react-splide/css/core';

import styles from './CatSwiper.module.scss';

import { CatSlide } from '../CatSlide';
import classNames from 'classnames';
import { CategoriesContext } from '../../store/CategoriesContext';

export const CatSwiper = () => {
   const splideRef = useRef<Splide>(null);
   const { categories } = useContext(CategoriesContext);

   return (
      <div className={styles.catSwiper}>
         <button
            className={classNames(styles.arrow, styles.leftArrow)}
            onClick={() => splideRef.current?.splide?.go('<')}
         >
            <img src="/images/other/icons/white-arr-left.svg" alt="" />
         </button>
         <Splide
            aria-label="My Favorite Images"
            options={{ arrows: false, gap: 24, perPage: 5, pagination: false }}
            className={styles.content}
            ref={splideRef}
         >
            {categories.map((cat) => {
               return <CatSlide key={cat.id} cat={cat} />;
            })}
         </Splide>
         <button
            className={classNames(styles.arrow, styles.rightArrow)}
            onClick={() => splideRef.current?.splide?.go('>')}
         >
            <img src="/images/other/icons/white-arr-left.svg" alt="" />
         </button>
      </div>
   );
};
