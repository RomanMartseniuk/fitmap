import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import './App.scss';
import { EntryMessage } from './components/common/EntryMessage';
import { useContext, useEffect, useState } from 'react';
import { MessagesContext } from './app/store/MessageContext';
import { MessagesWrapper } from './components/common/Message';

export const App = () => {
   const [isFirst, setIsFirst] = useState(false);

   const { messages } = useContext(MessagesContext);

   useEffect(() => {
      const first = localStorage.getItem('isFirstTime');
      const firstTime = first !== null ? false : true;

      setIsFirst(firstTime);
   }, []);

   return (
      <>
         <MessagesWrapper messages={messages} />
         <Header />
         {isFirst && <EntryMessage setFirstTime={setIsFirst} />}
         <main className="main">
            <Outlet />
         </main>
         <Footer />
      </>
   );
};
