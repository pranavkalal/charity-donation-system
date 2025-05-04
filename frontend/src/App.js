import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
// import Tasks from './pages/Tasks';
import Donors from './pages/users';
import Campaigns from './pages/Campaigns';
import Donations from './pages/Donations';
import CreateCampaign from './pages/CreateCampaign';


import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  // ✅ Wrapper for protected routes
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          {/* Redirect based on login status */}
          <Route path="/" element={<Navigate to={user ? '/users' : '/login'} />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Donors />
              </PrivateRoute>
            }
          />
          <Route
            path="/campaigns"
            element={
              <PrivateRoute>
                <Campaigns />
              </PrivateRoute>
            }
          />
          <Route
            path="/donations"
            element={
              <PrivateRoute>
                <Donations />
              </PrivateRoute>
            }
          />
          <Route
  path="/admin/create-campaign"
  element={
    <PrivateRoute>
      <CreateCampaign />
    </PrivateRoute>
  }
/>


          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
