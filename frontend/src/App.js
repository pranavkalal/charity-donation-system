import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Donors from './pages/users';
import Campaigns from './pages/Campaigns';
import Donations from './pages/Donations';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDesc from "./components/CampaignDesc";
import MockPaymentForm from "./components/MockPaymentForm"
import Footer from './components/Footer';
import DonorLeaderboard from "./pages/DonorLeaderboard";


import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  // ✅ TEMPORARY BYPASS FOR TESTING
  const PrivateRoute = ({ children }) => {
    return children; // Disable login check just for testing
  };

  return (
    <Router>
      <Navbar />
      <div className="w-screen px-8 pt-0 pb-6">
        <Routes>
          {/* Redirect based on login status */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Navigate to={user ? '/users' : '/login'} />} /> */}

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected (but currently bypassed) routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                {user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
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
            path="/leaderboard"
            element={
              <PrivateRoute>
                <DonorLeaderboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/create-campaign"
            element={
              <PrivateRoute>
                {user?.isAdmin ? <CreateCampaign /> : <Navigate to="/" />}
              </PrivateRoute>
            }
          />

          <Route path="/campaigns/:id" element={<CampaignDesc />} />
          <Route path="/campaigns/:id/payment" element={<MockPaymentForm />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;