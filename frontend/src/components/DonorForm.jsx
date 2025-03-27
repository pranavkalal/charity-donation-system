import { useState } from 'react';
import axiosInstance from '../axiosConfig';

const DonorForm = ({ onDonorAdded }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/donors', formData);
      setFormData({ name: '', email: '' });
      setError('');
      if (onDonorAdded) onDonorAdded(response.data); // Optional callback
    } catch (err) {
      setError('Failed to add donor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-2">Add Donor</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default DonorForm;
