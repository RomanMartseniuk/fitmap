import { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import classNames from 'classnames';

import styles from './CatSwiper.module.scss';

import { CatSlide } from '../CatSlide';
import { CategoriesContext } from '../../store/CategoriesContext';

type SampleArrowProps = {
   className?: any;
   onClick?: any;
};

type CatSwiperProps = {
   className?: string;
};

const SampleNextArrow: React.FC<SampleArrowProps> = ({ className, onClick }) => {
   return (
      <button className={classNames(styles.arrow, styles.rightArrow, className)} onClick={onClick}>
         <img src="/images/other/icons/white-arr-left.svg" alt="" />
      </button>
   );
};

const SamplePrevArrow: React.FC<SampleArrowProps> = ({ className, onClick }) => {
   return (
      <button className={classNames(styles.arrow, styles.leftArrow, className)} onClick={onClick}>
         <img src="/images/other/icons/white-arr-left.svg" alt="" />
      </button>
   );
};

export const CatSwiper: React.FC<CatSwiperProps> = ({ className }) => {
   const { categories } = useContext(CategoriesContext);

   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
         { breakpoint: 1224, settings: { slidesToShow: 4 } },
         { breakpoint: 912, settings: { slidesToShow: 3 } },
      ],
   };

   return (
      <div className={classNames(styles.catSwiper, className)}>
         <Slider {...settings} className={styles.slider}>
            {categories.map((cat) => {
               return <CatSlide key={cat.id} cat={cat} />;
            })}
         </Slider>
      </div>
   );
};
