import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">CharityApp</Link>
      
      {!user && isAuthPage && (
        <div>
          <Link
            to="/register"
            className="bg-green-500 px-3 py-1 rounded hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      )}

      {user && (
        <div className="flex items-center space-x-4">
          <Link to="/users">Profile</Link>
          <Link to="/campaigns">Campaigns</Link>
          <Link to="/donations">Donations</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
