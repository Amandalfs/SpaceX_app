import { Route, Routes } from 'react-router';
import App from '../App';
import { Providers } from '../Providers';

function MainRoutes() {
  return (
    <Routes>
      <Route element={<Providers />}>
        <Route path="/" element={<App />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;