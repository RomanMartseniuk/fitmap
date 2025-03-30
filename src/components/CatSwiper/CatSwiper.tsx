import { useContext, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

// @ts-ignore
//import '@splidejs/react-splide/css/core';
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
   //const splideRef = useRef<Splide>(null);
   const { categories } = useContext(CategoriesContext);

   const [width, setWidth] = useState(window.innerWidth);
   const [n, setN] = useState(5);
   useEffect(() => {
      const handleResize = () => {
         setWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const isDesc = width >= 1224;
   const isLaptop = width >= 980 && width < 1224;
   const isTablet = width >= 768 && width < 980;
   const isMobile = width < 768;

   console.log(width, isDesc, isLaptop, isTablet, isMobile);

   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: n,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
   };
   return (
      <div className={styles.catSwiper}>
         {/* <button
            className={classNames(styles.arrow, styles.leftArrow)}
            //onClick={() => setN((prev) => (prev > 1 ? prev - 1 : prev))}
         >
            <img src="/images/other/icons/white-arr-left.svg" alt="" />
         </button> */}
         {/* <Splide
            key={width}
            aria-label="My Favorite Images"
            options={{
               arrows: false,
               gap: 30,
               perPage: 5,

               pagination: false,
            }}
            className={styles.content}
            ref={splideRef}
         >
            {categories.map((cat) => {
               return <CatSlide key={cat.id} cat={cat} />;
            })}
         </Splide> */}

         <Slider {...settings}>
            {categories.map((cat) => {
               return <div>{cat.title}</div>;
            })}
         </Slider>
         {/* <button
            className={classNames(styles.arrow, styles.rightArrow)}
            //onClick={() => splideRef.current?.splide?.go('>')}
         >
            <img src="/images/other/icons/white-arr-left.svg" alt="" />
         </button> */}
      </div>
   );
};
