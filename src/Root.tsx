import { App } from './App';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="map/" element={<h1>Map</h1>}/>
        </Route>
        <Route path='*' element={<h1>404 - Page Not Found</h1>}/>
      </Routes>
    </Router>
  );
};
