import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import classNames from 'classnames';

import styles from './CatSwiper.module.scss';

import { CatSlide } from '../CatSlide';
import { CategoriesContext } from '../../store/CategoriesContext';

type SampleArrowProps = {
   className?: any;
   style?: any;
   onClick?: any;
};

const SampleNextArrow: React.FC<SampleArrowProps> = ({ className, style, onClick }) => {
   return (
      <button
         className={classNames(styles.arrow, styles.rightArrow, className)}
         onClick={onClick}
         style={{ ...style }}
      >
         <img src="/images/other/icons/white-arr-left.svg" alt="" />
      </button>
   );
};

const SamplePrevArrow: React.FC<SampleArrowProps> = ({ className, style, onClick }) => {
   return (
      <button
         className={classNames(styles.arrow, styles.leftArrow, className)}
         onClick={onClick}
         style={{ ...style }}
      >
         <img src="/images/other/icons/white-arr-left.svg" alt="" />
      </button>
   );
};

export const CatSwiper = () => {
   const { categories } = useContext(CategoriesContext);

   const [width, setWidth] = useState(window.innerWidth);
   useEffect(() => {
      const handleResize = () => {
         setWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const isDesc = width >= 1224;
   const isLaptop = width >= 912 && width < 1224;

   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: isDesc ? 5 : isLaptop ? 4 : 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
   };
   return (
      <div className={styles.catSwiper}>
         <Slider {...settings} className={styles.slider}>
            {categories.map((cat) => {
               return <CatSlide key={cat.id} cat={cat} />;
            })}
         </Slider>
      </div>
   );
};
