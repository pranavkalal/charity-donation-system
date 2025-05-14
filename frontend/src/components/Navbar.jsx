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
    <div className="w-full px-6 pt-6 pb-4">
      <nav className="flex justify-between items-center px-6 py-3 w-full bg-white rounded-2xl shadow-md">
        <div className="flex items-center gap-8">
          <Link to="/" className="mr-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/51ca0c4924b8bfb92cbbe4a82d80243e7d8ce83d?placeholderIfAbsent=true&apiKey=25764a6927e6464da1bc6d0860af1c32"
              className="object-contain w-10"
              alt="Logo"
            />
          </Link>
          <Link to="/" className="text-gray-800 hover:text-indigo-600 text-base">Home</Link>

          {user && (
            <>
              {/* ✅ Admins only: Dashboard link */}
              {user.isAdmin && (
                <Link to="/admin" className="text-gray-800 hover:text-indigo-600 text-base">Dashboard</Link>
              )}

              <Link to="/campaigns" className="text-gray-800 hover:text-indigo-600 text-base">Campaigns</Link>
              <Link to="/leaderboard" className="text-gray-800 hover:text-indigo-600 text-base">Donor Leaderboard</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          {!user && isAuthPage && (
            <Link to="/register" className="text-gray-800 hover:text-indigo-600 text-base">Register</Link>
          )}
          {user ? (
            <>
              <Link to="/profile" className="text-gray-800 hover:text-indigo-600 text-base">My Profile</Link>
              <button onClick={handleLogout} className="text-gray-800 hover:text-indigo-600 text-base">Logout</button>
            </>
          ) : !isAuthPage && (
            <Link to="/login" className="text-gray-800 hover:text-indigo-600 text-base">Login</Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
