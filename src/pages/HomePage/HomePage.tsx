import { Search } from '../../components/Search/Search';
import './HomePage.scss';

export const HomePage = () => {
   return (
      <>
         <section className="intro">
            <div className="intro__container">
               <h1 className="intro__title">Your personal Sports and Wellness Map</h1>
               <Search />
            </div>
         </section>
      </>
   );
};
