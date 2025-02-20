import React from 'react';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';

// @ts-ignore
import '@splidejs/react-splide/css/core';


export const CatSwiper = () => {
   return (
      <Splide aria-label="My Favorite Images" options={{perPage: 3}} >
         <SplideSlide>
            Slide1
         </SplideSlide>
         <SplideSlide>
            Slide2
         </SplideSlide>
         <SplideSlide>
            Slide3
         </SplideSlide>
         <SplideSlide>
            Slide4
         </SplideSlide>
      </Splide>
   );
};
