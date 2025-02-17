import { useEffect, useState } from 'react';
import './SearchForm.scss';
import search_icon from '../../assets/search-icon.svg';
import plus_icon from '../../assets/plus-icon.svg';

import getCities from '../../api/citiesApi';
import getCategories from '../../api/categoriesApi';

type City = {
   id: number;
   title: string;
   img_url: string;
};

type Category = {
   id: number;
   title: string;
   img_url: string;
};

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

export const SearchForm = () => {
   const [wherePopupSelected, setWherePopupSelected] = useState(false);
   const [whatPopupSelected, setWhatPopupSelected] = useState(false);
   const [whenPopupSelected, setWhenPopupSelected] = useState(false);

   const [selectedWhere, setSelectedWhere] = useState('');
   const [selectedWhat, setSelectedWhat] = useState('');
   const [selectedWhen, setSelectedWhen] = useState('');

   const [cities, setCities] = useState<City[]>([]);
   console.log(cities);

   const [categories, setCategories] = useState<Category[]>([]);

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
   }, []);

   return (
      <div className="searchForm">
         <div className="searchForm__content">
            <div className="searchForm__block">
               <div className="searchForm__title">
                  <h3>Where</h3>
                  <p>Search destinations</p>
               </div>
               <div className="searchForm__popup popup_searchForm">
                  <div className="popup_searchForm__content">
                     <label className="popup_searchForm__label">
                        <span>
                           <img src={search_icon} alt="Search" />
                        </span>
                        <input
                           type="text"
                           name="city"
                           placeholder="Start writing the city"
                           autoComplete="off"
                        />
                     </label>
                     <ul className="popup_searchForm__list">
                        {cities.map((city) => (
                           <li className="popup_searchForm__item" key={city.id}>
                              <img src={city.img_url} alt={city.title} />
                              <h3>{city.title}</h3>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
            <div className="searchForm__block">
               <div className="searchForm__title">
                  <h3>What</h3>
                  <p>Choose activity</p>
               </div>
               <div className="searchForm__popup popup_searchForm">
                  <div className="popup_searchForm__content">
                     <label className="popup_searchForm__label">
                        <span>
                           <img src={search_icon} alt="Search" />
                        </span>
                        <input
                           type="text"
                           name="city"
                           placeholder="Start writing the city"
                           autoComplete="off"
                        />
                     </label>
                     <ul className="popup_searchForm__list">
                        {categories.map((cat) => (
                           <li
                              className="popup_searchForm__item popup_searchForm__item-cat"
                              key={cat.id}
                           >
                              <img src={cat.img_url} alt={cat.title} />
                              <h3>{cat.title}</h3>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
            <div className="searchForm__block">
               <div className="searchForm__title">
                  <h3>Who</h3>
                  <p>Choose</p>
               </div>
               <div className="searchForm__popup popup_searchForm active">
                  <div className="popup_searchForm__content">
                     <div className="popup_searchForm__option">
                        <div className="">
                           <h3>Adults</h3>
                           <p>Ages 18 or above</p>
                        </div>
                        <span>
                           <img src={plus_icon} alt="Choose" />
                        </span>
                     </div>
                     <div className="popup_searchForm__option">
                        <div className="">
                           <h3>Teenagers</h3>
                           <p>Ages 12 - 17</p>
                        </div>
                        <span>
                           <img src={plus_icon} alt="Choose" />
                        </span>
                     </div>
                     <div className="popup_searchForm__option">
                        <div className="">
                           <h3>Chiildren</h3>
                           <p>Ages 2 - 12</p>
                        </div>
                        <span>
                           <img src={plus_icon} alt="Choose" />
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="searchForm__button">
               <img src={search_icon} alt="Search" />
            </div>
         </div>
      </div>
   );
};
