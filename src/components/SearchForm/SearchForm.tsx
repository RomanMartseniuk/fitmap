import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './SearchForm.scss';

import search_icon from '../../assets/search-icon.svg';

import { CitiesContext } from '../../store/CitiesContext';
import { CategoriesContext } from '../../store/CategoriesContext';
import { Category } from '../../types/Category';
import { City } from '../../types/City';

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

type Props2 = {
   type: 'city' | 'category';

   id: number;

   title: string;
   subtitle: string;

   param: string;
   setParam: (arg: string) => void;

   selBlock: number;
   setSelBlock: (arg: number) => void;

   selInp: number;
   setSelInp: (arg: number) => void;

   input: string;
   setInput: (arg: string) => void;

   array: City[] | Category[];
   updateURL: (arg1: string, arg2: string) => void;
};

const SearchFormBlock: React.FC<Props2> = ({
   type,
   id,
   title,
   subtitle,
   param,
   setParam,
   selBlock,
   setSelBlock,
   selInp,
   setSelInp,
   input,
   setInput,
   array,
   updateURL,
}) => {
   return (
      <div className="searchForm__block" id={`${id}`}>
         {param === '' ? (
            <div className="searchForm__title">
               <h3>{title}</h3>
               <p>{subtitle}</p>
            </div>
         ) : (
            <div className="searchForm__title">
               <h3>{param}</h3>
            </div>
         )}

         <div
            className={classNames('searchForm__popup popup_searchForm', {
               active: selBlock === id,
            })}
         >
            <div className="popup_searchForm__content">
               <label
                  className={classNames('popup_searchForm__label', {
                     active: selInp === id,
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
                     onChange={(e) => setInput(e.target.value)}
                     onFocus={() => setSelInp(id)}
                     onBlur={() => {
                        setSelInp(-1);
                     }}
                     value={input}
                     id={`${id}`}
                  />
               </label>
               <ul className="popup_searchForm__list">
                  {array
                     .filter((item: City | Category) =>
                        item.title.toLowerCase().includes(input.toLowerCase()),
                     )
                     .map((item: City | Category) => (
                        <li
                           className={classNames('popup_searchForm__item', {
                              [`popup_searchForm__item-cat`]: type === 'category',
                           })}
                           onClick={() => {
                              setParam(item.title);
                              setInput('');
                              setTimeout(() => setSelBlock(-1), 1);
                              updateURL(`${type}`, item.title);
                           }}
                           key={item.id}
                        >
                           {type === 'city' ? (
                              <img src={item.img_url} alt={item.title} />
                           ) : (
                              <img src={(item as Category).icon_url} alt={item.title} />
                           )}

                           <h3>{item.title}</h3>
                        </li>
                     ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

type Props = {
   className?: string;
};

export const SearchForm: React.FC<Props> = ({ className }) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const [selectedWhere, setSelectedWhere] = useState('');
   const [selectedWhat, setSelectedWhat] = useState('');

   const [selectedBlock, setSelectedBlock] = useState(-1);
   const [selectedInput, setSelectedInput] = useState(-1);

   const [whereInp, setWhereInp] = useState('');
   const [whatInp, setWhatInp] = useState('');

   const { cities } = useContext(CitiesContext);
   const { categories } = useContext(CategoriesContext);

   // Add EventListener For Clicks
   useEffect(() => {
      const handleOnClick = (event: MouseEvent) => {
         const target = event.target as HTMLElement;
         const block = target.closest('.searchForm__block') as HTMLElement | null;

         if (!block) {
            setSelectedBlock(-1);
            return;
         }

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

      if (cities.find((c) => c.title.toLowerCase().includes(city.toLowerCase()))) {
         setSelectedWhere(city);
      }

      if (categories.find((c) => c.title.toLowerCase().includes(category.toLowerCase()))) {
         setSelectedWhat(category);
      }
   }, [cities, categories]);

   // Updates URL Search Params
   const updateURL = useCallback(
      (key: string, val: string) => {
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
      },
      [searchParams],
   );

   return (
      <div className={classNames(className, `searchForm`)}>
         <div className="searchForm__content">
            <SearchFormBlock
               id={0}
               type="city"
               title="Where"
               subtitle="Search destination"
               param={selectedWhere}
               setParam={setSelectedWhere}
               selBlock={selectedBlock}
               setSelBlock={setSelectedBlock}
               selInp={selectedInput}
               setSelInp={setSelectedInput}
               input={whereInp}
               setInput={setWhereInp}
               array={cities}
               updateURL={updateURL}
            />
            <SearchFormBlock
               id={1}
               type="category"
               title="What"
               subtitle="Search category"
               param={selectedWhat}
               setParam={setSelectedWhat}
               selBlock={selectedBlock}
               setSelBlock={setSelectedBlock}
               selInp={selectedInput}
               setSelInp={setSelectedInput}
               input={whatInp}
               setInput={setWhatInp}
               array={categories}
               updateURL={updateURL}
            />
            <Link
               to={{ pathname: '../map/', search: searchParams.toString() }}
               className="searchForm__button"
            >
               <img src={search_icon} alt="Search" />
            </Link>
         </div>
      </div>
   );
};
