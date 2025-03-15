import { App } from './App';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage/HomePage';
import { MapPage } from './pages/MapPage';

import { GymList } from './components/GymList';
import { GymDescr } from './components/GymDescr';

import { CategoriesProvider } from './store/CategoriesContext';
import { CitiesProvider } from './store/CitiesContext';

export const Root = () => {
   return (
      <CitiesProvider>
         <CategoriesProvider>
            <Router>
               <Routes>
                  <Route path="/" element={<App />}>
                     <Route index element={<HomePage />} />
                     <Route path="map/" element={<MapPage />}>
                        <Route index element={<GymList />} />
                        <Route path=":gymId/" element={<GymDescr />}/>
                     </Route>
                     <Route path="welcome/" />
                     <Route path="sign-up/" />
                     <Route path="log-in" />
                     <Route path="notif" />
                     <Route path="help" />
                     <Route path="acc" />
                     <Route path="saved" />
                  </Route>
                  <Route path="*" element={<h1>404 - Page Not Found</h1>} />
               </Routes>
            </Router>
         </CategoriesProvider>
      </CitiesProvider>
   );
};
