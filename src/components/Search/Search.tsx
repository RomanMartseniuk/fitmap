import { useState } from 'react';
import './Search.scss';
import search_icon from '../../assets/search-icon.svg';
import classNames from 'classnames';

const cities = [
   'Kyiv',
   'Lviv',
   'Odessa',
   'Dnipro',
   'Donetsk',
   'Kharkiv',
   'Luhansk',
   'Simferopol',
   'Zaporizhia',
   'Uzhgorod',
   'Chernihiv',
   'Vinnitsa',
   'Ivano-Frankivsk',
   'Ternopil',
   'Rivne',
   'Zhytomyr',
   'Chernivtsi',
   'Kherson',
   'Poltava',
   'Mykolaiv',
   'Sumy',
   'Kropyvnytskyi',
   'Kryvyi Rih',
   'Bila Tserkva',
   'Sevastopol',
   'Melitopol',
   'Nikopol',
   'Kramatorsk',
   'Sloviansk',
   'Brovary',
   'Kamianske',
   'Uman',
   'Kolomyia',
   'Berdyansk',
   'Mukachevo',
   'Drohobych',
   'Kovel',
   'Izmail',
   'Boryspil',
   'Yevpatoria',
   'Horlivka',
   'Yalta',
];

const categories = [
   // Fitness & Gym Activities
   'Fitness',
   'CrossFit',
   'Weightlifting',
   'Bodybuilding',
   'Yoga',
   'Pilates',
   'Aerobics',
   'Zumba',
   'Stretching',
   'HIIT (High-Intensity Interval Training)',
   'Functional Training',

   // Team Sports
   'Football',
   'Basketball',
   'Volleyball',
   'Rugby',
   'Cricket',
   'Handball',
   'Hockey',
   'Ice Hockey',
   'Softball',
   'Baseball',
   'Lacrosse',

   // Individual Sports
   'Boxing',
   'Kickboxing',
   'Martial Arts',
   'Tennis',
   'Table Tennis',
   'Badminton',
   'Archery',
   'Fencing',
   'Golf',
   'Skateboarding',
   'Darts',
   'Billiards',
   'Snooker',
   'Bowling',

   // Water Sports
   'Swimming',
   'Diving',
   'Rowing',
   'Sailing',
   'Surfing',
   'Kitesurfing',
   'Kayaking',
   'Water Polo',

   // Winter Sports
   'Skiing',
   'Snowboarding',
   'Ice Skating',
   'Curling',

   // Extreme & Adventure Sports
   'Rock Climbing',
   'Mountaineering',
   'Paragliding',
   'Skydiving',
   'Parkour',
   'Mountain Biking',
   'Skateboarding',

   // Endurance & Outdoor Activities
   'Running',
   'Cycling',
   'Triathlon',
   'Hiking',
   'Trail Running',
   'Walking',
   'Orienteering',

   // Combat Sports
   'MMA (Mixed Martial Arts)',
   'Judo',
   'Karate',
   'Taekwondo',
   'Wrestling',
   'Muay Thai',
   'Brazilian Jiu-Jitsu (BJJ)',

   // Recreational & Niche Activities
   'Dance',
   'Cheerleading',
   'Esports',
   'Fishing',
   'Horse Riding',

   // Other Fitness & Wellness
   'Meditation',
   'Cardio Workouts',
   'Strength Training',
   'Balance Training',
   'Core Training',
];

type Who = 'all' | 'adult' | 'teen' | 'child';

export const Search = () => {
   const [selectedCity, setSelectedCity] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('');
   const [selectedWho, setSelectedWho] = useState<Who>('all');

   const [isChangingCity, setIsChangingCity] = useState(false);
   const [isChangingCategory, setIsChangingCategory] = useState(false);
   const [isChangingWho, setIsChangingWho] = useState(false);

   const handleChoosingCity = (city: string) => {
      setSelectedCity(city);
      setIsChangingCity(false);
      console.log(city);
   };

   const handleStopChanging = (e: MouseEvent, cb: (arg: boolean) => void, id: number) => {
      const target = e.target as HTMLElement;
      if (
         !target.closest(`.search__block--${id}`) &&
         !target.closest('.search__suggestions') &&
         !target.closest('.search__suggestions__item') &&
         !target.closest(`.search__block_descr--${id}`)
      ) {
         cb(false);
      }
   };

   const handleChoosingCategory = (category: string) => {
      setSelectedCategory(category);
      setIsChangingCategory(false);
      console.log(category);
   };

   const handleChoosingWho = (who: Who) => {
      setSelectedWho(who);
      setIsChangingWho(false);
      console.log(who);
   };

   return (
      <div className="search">
         <div className="search__container">
            <div
               className={classNames('search__block search__block--0', {
                  active: isChangingCity,
               })}
               tabIndex={0}
            >
               {isChangingCity ? (
                  <>
                     <input
                        type="text"
                        placeholder="Enter city..."
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        autoFocus
                     />
                     <div className="search__suggestions">
                        <h3 className="search__suggestions__title">Suggested destination</h3>
                        <ul className="search__suggestions__list">
                           {cities
                              .filter((city) =>
                                 city.toLowerCase().includes(selectedCity.toLowerCase()),
                              )
                              .map((city, index) => (
                                 <li
                                    key={index}
                                    className="search__suggestions__item"
                                    onClick={() => handleChoosingCity(city)}
                                 >
                                    <div className="search__suggestions__item__image">
                                       {/* There should be image */}
                                       <span></span>
                                    </div>
                                    <h4>{city}</h4>
                                 </li>
                              ))}
                        </ul>
                     </div>
                  </>
               ) : (
                  <div
                     className="search__block_descr search__block_descr--0"
                     onClick={() => {
                        setIsChangingCity(true);
                        window.addEventListener('click', (e) => {
                           handleStopChanging(e, setIsChangingCity, 0);
                        });
                     }}
                  >
                     {selectedCity === '' ? (
                        <>
                           <h2>Where</h2>
                           <p>Search destinations</p>
                        </>
                     ) : (
                        <h2>{selectedCity}</h2>
                     )}
                  </div>
               )}
            </div>
            <div
               className={classNames('search__block search__block--1', {
                  active: isChangingCategory,
               })}
               tabIndex={0}
            >
               {isChangingCategory ? (
                  <>
                     <input
                        type="text"
                        placeholder="Enter category..."
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        autoFocus
                     />
                     <div className="search__suggestions">
                        <h3 className="search__suggestions__title">Suggested categories</h3>
                        <ul className="search__suggestions__list">
                           {categories
                              .filter((cat) =>
                                 cat.toLowerCase().includes(selectedCategory.toLowerCase()),
                              )
                              .map((cat, index) => (
                                 <li
                                    key={index}
                                    className="search__suggestions__item"
                                    onClick={() => handleChoosingCategory(cat)}
                                 >
                                    {cat}
                                 </li>
                              ))}
                        </ul>
                     </div>
                  </>
               ) : (
                  <div
                     className="search__block_descr search__block_descr--1"
                     onClick={() => {
                        setIsChangingCategory(true);
                        window.addEventListener('click', (e) => {
                           handleStopChanging(e, setIsChangingCategory, 1);
                        });
                     }}
                  >
                     {selectedCategory === '' ? (
                        <>
                           <h2>What</h2>
                           <p>Choose activity</p>
                        </>
                     ) : (
                        <h2>{selectedCategory}</h2>
                     )}
                  </div>
               )}
            </div>
            <div
               className={classNames('search__block search__block--2 search__block--select-only', {
                  active: isChangingWho,
               })}
               tabIndex={0}
               onBlur={() => setIsChangingWho(false)}
               onClick={() => setIsChangingWho(true)}
            >
               {isChangingWho ? (
                  <>
                     <h2>
                        {selectedWho === 'all'
                           ? 'For Everyone'
                           : selectedWho === 'adult'
                             ? 'For Adults'
                             : selectedWho === 'teen'
                               ? 'For Teenagers'
                               : 'For children'}
                     </h2>

                     <div className="search__suggestions">
                        <ul className="search__suggestions__list">
                           <li
                              className="search__suggestions__item"
                              onClick={() => handleChoosingWho('all')}
                           >
                              All
                           </li>
                           <li
                              className="search__suggestions__item"
                              onClick={() => handleChoosingWho('adult')}
                           >
                              Adults
                           </li>
                           <li
                              className="search__suggestions__item"
                              onClick={() => handleChoosingWho('teen')}
                           >
                              Teenagers
                           </li>
                           <li
                              className="search__suggestions__item"
                              onClick={() => handleChoosingWho('child')}
                           >
                              Children
                           </li>
                        </ul>
                     </div>
                  </>
               ) : (
                  <div className="search__block_descr .search__block_descr--2">
                     {selectedWho === 'all' ? (
                        <>
                           <h2>Who</h2>
                           <p>Who can participate</p>
                        </>
                     ) : (
                        <h2>
                           {selectedWho === 'adult'
                              ? 'For Adults'
                              : selectedWho === 'teen'
                                ? 'For Teenagers'
                                : 'For children'}
                        </h2>
                     )}
                  </div>
               )}
            </div>
            <div className="search__button">
               <img src={search_icon} alt="Search" />
            </div>
         </div>
      </div>
   );
};
