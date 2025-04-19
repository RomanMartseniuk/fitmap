import React, { createContext, ReactNode } from 'react';
import { Category } from '../types/Category';

interface BasicInfoContextProps {
   categories: Category[];
   cities: string[];
}

export const BasicInfoContext = createContext<BasicInfoContextProps>({ categories: [], cities: [] });

export const BasicInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

   return (
      <BasicInfoContext.Provider value={{ categories, cities }}>
         {children}
      </BasicInfoContext.Provider>
   );
};
