import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import styles from './SearchForm.module.scss';

import { CitiesContext } from '../../store/CitiesContext';
import { CategoriesContext } from '../../store/CategoriesContext';
import { SearchFormBlock } from '../SearchFormBlock';

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
         const block = target.closest('.sfb_popup') as HTMLElement | null;
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

   const handleSearchClick = async () => {
    const queryParams = new URLSearchParams({
        city: selectedWhere,
        category: selectedWhat,
        who: selectedWho,
    }).toString();

    try {
        const response = await fetch(`/api/gyms-by-city/?${queryParams}`, {
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
      <div className={classNames(className, styles.searchForm)}>
         <div className={styles.content}>
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
               className={styles.button}
            >
               <img src="/images/other/icons/black-search-icon.svg" alt="Search" />
            </Link>
         </div>
      </div>
   );
};
