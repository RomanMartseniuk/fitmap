import { App } from './App';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="map/" element={<h1>Map</h1>}/>
        </Route>
        <Route path='*' element={<h1>404 - Page Not Found</h1>}/>
      </Routes>
    </Router>
  );
};
