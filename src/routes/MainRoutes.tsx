import { Route, Routes } from 'react-router';
import App from '../App';

function MainRoutes() {
  return (
    <Routes>
        <Route path="/" element={<App />} />
    </Routes>
  );
}

export default MainRoutes;