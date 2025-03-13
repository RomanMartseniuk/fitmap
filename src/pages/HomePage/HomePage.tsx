import { CatSwiper } from '../../components/CatSwiper';
import { SearchForm } from '../../components/SearchForm';
import './HomePage.scss';

export const HomePage = () => {
   return (
      <>
         <section className="intro">
            <div className="intro__container">
               <h1 className="intro__title">Your personal Sports and Wellness Map</h1>
               <SearchForm className="searchF" />
               <CatSwiper />
            </div>
         </section>
      </>
   );
};
