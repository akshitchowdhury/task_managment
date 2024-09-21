import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './component/Auth/Auth';
import Admin from './component/Admin/Admin';
import UserTrack from './component/Admin/UserTrack';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Define both routes explicitly */}
        <Route path="/" element={<Auth isAuth={isAuth} setIsAuth={setIsAuth} />} />
        <Route path="/admin" element={<Admin isAuth={isAuth} setIsAuth={setIsAuth} />} />
        <Route path="/admin/usertrack" element={<UserTrack />} />

        {/* Redirect based on authentication status */}
        <Route
          path="*"
          element={isAuth ? <Navigate to="/admin" /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
