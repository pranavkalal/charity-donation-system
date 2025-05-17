import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      const { id, name, email, token, isAdmin } = response.data;

      login({ id, name, email, token, isAdmin });

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6FB] flex items-center justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#1C2480] mb-6 text-center">Login</h1>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#F7F6FB] border border-gray-300"
            autoFocus
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#F7F6FB] border border-gray-300"
            required
          />
        </div>

        <div className="text-right mb-4">
          <button type="button" className="text-sm text-[#525252] hover:underline">
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1C2480] text-white p-3 rounded-lg hover:bg-[#161c6b] transition text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
