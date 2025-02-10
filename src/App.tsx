import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';

export const App = () => {
  return (
    <>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
    </>
  );
};
