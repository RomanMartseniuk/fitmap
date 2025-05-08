import { App } from './App';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage/HomePage';
import { MapPage } from './pages/MapPage';

import { GymList } from './components/GymList';
import { GymDescr } from './components/GymDescr';

import { CategoriesProvider } from './app/store/CategoriesContext';
import { CitiesProvider } from './app/store/CitiesContext';
import { AccPage } from './pages/AccPage/AccPage';
import { UserProvider } from './app/store/UserContext';

export const Root = () => {
   return (
      <UserProvider>
         <CitiesProvider>
            <CategoriesProvider>
               <Router>
                  <Routes>
                     <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />
                        <Route path="map/" element={<MapPage />}>
                           <Route index element={<GymList />} />
                           <Route path=":gymId/" element={<GymDescr />} />
                        </Route>
                        <Route path="sign-up/" element={<HomePage />} />
                        <Route path="login/" element={<HomePage />} />
                        <Route path="notif/" />
                        <Route path="help/" />
                        <Route path="acc/" element={<AccPage />} />
                        <Route path="saved/" />
                     </Route>
                     {/* <Route path="*" element={<h1>404 - Page Not Found</h1>} /> */}
                  </Routes>
               </Router>
            </CategoriesProvider>
         </CitiesProvider>
      </UserProvider>
   );
};
