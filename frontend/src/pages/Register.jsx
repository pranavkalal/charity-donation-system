import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6FB] flex items-center justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#1C2480] mb-6 text-center">Sign Up</h1>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#F7F6FB] border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#F7F6FB] border border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="e.g. +61 400 000 000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#F7F6FB] border border-gray-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-[#F7F6FB] border border-gray-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1C2480] text-white p-3 rounded-lg hover:bg-[#161c6b] transition text-lg"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;