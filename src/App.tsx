import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import './App.scss';
import { EntryMessage } from './components/common/EntryMessage';
import { useEffect, useState } from 'react';

export const App = () => {
   const [isFirst, setIsFirst] = useState(false);

   useEffect(() => {
      const first = localStorage.getItem('isFirstTime');
      const firstTime = first !== null ? false : true;

      setIsFirst(firstTime);
   }, []);

   return (
      <>
         <Header />
         {isFirst && <EntryMessage setFirstTime={setIsFirst} />}
         <main className="main">
            <Outlet />
         </main>
         <Footer />
      </>
   );
};
