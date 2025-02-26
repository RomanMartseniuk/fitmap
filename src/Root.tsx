import { App } from './App';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { MapPage } from './pages/MapPage';
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
                     <Route path="map/" element={<MapPage />} />
                  </Route>
                  <Route path="*" element={<h1>404 - Page Not Found</h1>} />
               </Routes>
            </Router>
         </CategoriesProvider>
      </CitiesProvider>
   );
};
