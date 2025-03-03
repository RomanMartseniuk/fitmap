import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { City } from '../../types/City';
import { Category } from '../../types/Category';
import { Who } from '../../types/Who';

import './SearchForm.scss';
import search_icon from '../../assets/search-icon.svg';
import plus_icon from '../../assets/plus-icon.svg';

// const categories = [
//    // Fitness & Gym Activities
//    'Fitness',
//    'CrossFit',
//    'Weightlifting',
//    'Bodybuilding',
//    'Yoga',
//    'Pilates',
//    'Aerobics',
//    'Zumba',
//    'Stretching',
//    'HIIT (High-Intensity Interval Training)',
//    'Functional Training',

//    // Team Sports
//    'Football',
//    'Basketball',
//    'Volleyball',
//    'Rugby',
//    'Cricket',
//    'Handball',
//    'Hockey',
//    'Ice Hockey',
//    'Softball',
//    'Baseball',
//    'Lacrosse',

//    // Individual Sports
//    'Boxing',
//    'Kickboxing',
//    'Martial Arts',
//    'Tennis',
//    'Table Tennis',
//    'Badminton',
//    'Archery',
//    'Fencing',
//    'Golf',
//    'Skateboarding',
//    'Darts',
//    'Billiards',
//    'Snooker',
//    'Bowling',

//    // Water Sports
//    'Swimming',
//    'Diving',
//    'Rowing',
//    'Sailing',
//    'Surfing',
//    'Kitesurfing',
//    'Kayaking',
//    'Water Polo',

//    // Winter Sports
//    'Skiing',
//    'Snowboarding',
//    'Ice Skating',
//    'Curling',

//    // Extreme & Adventure Sports
//    'Rock Climbing',
//    'Mountaineering',
//    'Paragliding',
//    'Skydiving',
//    'Parkour',
//    'Mountain Biking',
//    'Skateboarding',

//    // Endurance & Outdoor Activities
//    'Running',
//    'Cycling',
//    'Triathlon',
//    'Hiking',
//    'Trail Running',
//    'Walking',
//    'Orienteering',

//    // Combat Sports
//    'MMA (Mixed Martial Arts)',
//    'Judo',
//    'Karate',
//    'Taekwondo',
//    'Wrestling',
//    'Muay Thai',
//    'Brazilian Jiu-Jitsu (BJJ)',

//    // Recreational & Niche Activities
//    'Dance',
//    'Cheerleading',
//    'Esports',
//    'Fishing',
//    'Horse Riding',

//    // Other Fitness & Wellness
//    'Meditation',
//    'Cardio Workouts',
//    'Strength Training',
//    'Balance Training',
//    'Core Training',
// ];


const getCities = () => fetch('/api/gyms-in-city/');
const getCategories = () => fetch('/api/categories/');

export const SearchForm = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   const [selectedWhere, setSelectedWhere] = useState('');
   const [selectedWhat, setSelectedWhat] = useState('');
   const [selectedWho, setSelectedWho] = useState<Who>(Who.all);

   const [selectedBlock, setSelectedBlock] = useState(-1);
   const [selectedInput, setSelectedInput] = useState(-1);

   const [whereInp, setWhereInp] = useState('');
   const [whatInp, setWhatInp] = useState('');

   const [cities, setCities] = useState<City[]>([]);

   const [categories, setCategories] = useState<Category[]>([]);

   // Geting Cities And Categories Lists AND add EventListener For Clicks
   useEffect(() => {
      getCities()
         .then((res) => res.json())
         .then((data) => setCities(data as City[]))
         .catch()
         .finally();

      getCategories()
         .then((res) => res.json())
         .then((data) => setCategories(data as Category[]))
         .catch()
         .finally();

      const handleOnClick = (event: MouseEvent) => {
         const target = event.target as HTMLElement;
         const block = target.closest('.searchForm__block') as HTMLElement | null;

         if (!block) {
            setSelectedBlock(-1);
            return;
         }

         console.log(block.id);
         setSelectedBlock(Number(block.id)); // Convert ID to number
      };

      document.addEventListener('click', handleOnClick);

      return () => {
         document.removeEventListener('click', handleOnClick);
      };
   }, []);

   // Getting Serch Params From URL
   useEffect(() => {
      let city = searchParams.get('city') || '';
      let category = searchParams.get('category') || '';
      let who = searchParams.get('who') as Who || Who.all;

      if (cities.some(c => c.city.toLowerCase().includes(city))) {
         setSelectedWhere(city);
      } else {
         updateURL('city', '');
      }

      if (categories.some(c => c.name.toLowerCase().includes(category))) {
         setSelectedWhat(category);
      } else {
         updateURL('category', '');
      }

      if (Object.values(Who).includes(who)) {
         setSelectedWho(who);
      } else {
         updateURL('who', '');
      }

   }, []);

   // Updates URL Search Params
   const updateURL = useCallback((key: string, val: string) => {
      setSearchParams((prevParams) => {
         const newParams = new URLSearchParams(prevParams);
         if (newParams.has(key)) {
            newParams.delete(key);
         }
         newParams.append(key, val);

         if (newParams.get(key) === '') {
            newParams.delete(key);
         }
         return newParams;
      });
   }, [searchParams]);

   const handleSearchClick = async () => {
    const queryParams = new URLSearchParams({
        city: selectedWhere,
        category: selectedWhat,
        who: selectedWho,
    }).toString();

    try {
        const response = await fetch(`/api/gyms-in-city/?${queryParams}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const result = await response.json();
        console.log('Результаты поиска:', result);
        //
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
};


   return (
      <div className="searchForm">
         <div className="searchForm__content">
            <div className="searchForm__block" id="0">
               {selectedWhere === '' ? (
                  <div className="searchForm__title">
                     <h3>Where</h3>
                     <p>Search destinations</p>
                  </div>
               ) : (
                  <div className="searchForm__title">
                     <h3>{selectedWhere}</h3>
                  </div>
               )}

               <div
                  className={classNames('searchForm__popup popup_searchForm', {
                     active: selectedBlock === 0,
                  })}
               >
                  <div className="popup_searchForm__content">
                     <label
                        className={classNames('popup_searchForm__label', {
                           active: selectedInput === 0,
                        })}
                     >
                        <span>
                           <img src={search_icon} alt="Search" />
                        </span>
                        <input
                           type="text"
                           name="city"
                           placeholder="Start writing the city"
                           autoComplete="off"
                           onChange={(e) => setWhereInp(e.target.value)}
                           onFocus={() => setSelectedInput(0)}
                           onBlur={() => {
                              setSelectedInput(-1);
                           }}
                           value={whereInp}
                           id="0"
                        />
                     </label>
                     <ul className="popup_searchForm__list">
                        {cities
                           .filter((city) =>
                              city.city.toLowerCase().includes(whereInp.toLowerCase()),
                           )
                           .map((city) => (
                              <li
                                 className="popup_searchForm__item"
                                 onClick={() => {
                                    setSelectedWhere(city.city);
                                    setWhereInp('');
                                    setTimeout(() => setSelectedBlock(-1), 1);
                                    updateURL('city', city.city);
                                 }}
                                 key={city.id}
                              >
                                 <img alt={city.city} />
                                 <h3>{city.city}</h3>
                              </li>
                           ))}
                     </ul>
                  </div>
               </div>
            </div>
            <div className="searchForm__block" id="1">
               {selectedWhat === '' ? (
                  <div className="searchForm__title">
                     <h3>Where</h3>
                     <p>Search destinations</p>
                  </div>
               ) : (
                  <div className="searchForm__title">
                     <h3>{selectedWhat}</h3>
                  </div>
               )}
               <div
                  className={classNames('searchForm__popup popup_searchForm', {
                     active: selectedBlock === 1,
                  })}
               >
                  <div className="popup_searchForm__content">
                     <label
                        className={classNames('popup_searchForm__label', {
                           active: selectedInput === 1,
                        })}
                     >
                        <span>
                           <img src={search_icon} alt="Search" />
                        </span>
                        <input
                           type="text"
                           name="city"
                           placeholder="Start writing the city"
                           autoComplete="off"
                           onChange={(e) => setWhatInp(e.target.value)}
                           onFocus={() => setSelectedInput(1)}
                           onBlur={() => setSelectedInput(-1)}
                           value={whatInp}
                        />
                     </label>
                     <ul className="popup_searchForm__list">
                        {categories
                           .filter((cat) => cat.name.toLowerCase().includes(whatInp.toLowerCase()))
                           .map((cat) => (
                              <li
                                 className="popup_searchForm__item popup_searchForm__item-cat"
                                 onClick={() => {
                                    setSelectedWhat(cat.name);
                                    setWhatInp('');
                                    setTimeout(() => setSelectedBlock(-1), 1);
                                    updateURL('category', cat.name);
                                 }}
                                 key={cat.id}
                              >
                                 <img alt={cat.name} />
                                 <h3>{cat.name}</h3>
                              </li>
                           ))}
                     </ul>
                  </div>
               </div>
            </div>
            <div className="searchForm__block" id="2">
               {selectedWho === Who.all ? (
                  <div className="searchForm__title">
                     <h3>Who</h3>
                     <p>Select your age</p>
                  </div>
               ) : (
                  <div className="searchForm__title">
                     <h3>{selectedWho}</h3>
                  </div>
               )}
               <div
                  className={classNames('searchForm__popup popup_searchForm', {
                     active: selectedBlock === 2,
                  })}
               >
                  <div className="popup_searchForm__content">
                     <div
                        className={classNames('popup_searchForm__option', {
                           popup_searchForm__option_chosen: selectedWho === Who.adult,
                        })}
                     >
                        <div className="">
                           <h3>Adults</h3>
                           <p>Ages 18 or above</p>
                        </div>
                        <span
                           onClick={() => {
                              if (selectedWho !== Who.adult) {
                                 updateURL('who', Who.adult);
                                 setSelectedWho(Who.adult);
                              } else {
                                 updateURL('who', Who.all);
                                 setSelectedWho(Who.all);
                              }
                           }}
                        >
                           <img src={plus_icon} alt="Add/Remove" />
                        </span>
                     </div>
                     <div
                        className={classNames('popup_searchForm__option', {
                           popup_searchForm__option_chosen: selectedWho === Who.teen,
                        })}
                     >
                        <div className="">
                           <h3>Teenagers</h3>
                           <p>Ages 12 - 17</p>
                        </div>
                        <span
                           onClick={() => {
                              if (selectedWho !== Who.teen) {
                                 updateURL('who', Who.teen);
                                 setSelectedWho(Who.teen);
                              } else {
                                 updateURL('who', Who.all);
                                 setSelectedWho(Who.all);
                              }
                           }}
                        >
                           <img src={plus_icon} alt="Choose" />
                        </span>
                     </div>
                     <div
                        className={classNames('popup_searchForm__option', {
                           popup_searchForm__option_chosen: selectedWho === Who.children,
                        })}
                     >
                        <div className="">
                           <h3>Children</h3>
                           <p>Ages 2 - 12</p>
                        </div>
                        <span
                           onClick={() => {
                              if (selectedWho !== Who.children) {
                                 updateURL('who', Who.children);
                                 setSelectedWho(Who.children);
                              } else {
                                 updateURL('who', Who.all);
                                 setSelectedWho(Who.all);
                              }
                           }}
                        >
                           <img src={plus_icon} alt="Choose" />
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="searchForm__button" onClick={handleSearchClick}>
               <img src={search_icon} alt="Search" />
            </div>
         </div>
      </div>
   );
};
