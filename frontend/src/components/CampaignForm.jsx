import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const CampaignForm = ({ onCampaignCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axiosInstance.post('/api/campaigns', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSuccess(' Campaign created successfully!');
      setFormData({ title: '', description: '', goalAmount: '' });
      if (onCampaignCreated) onCampaignCreated();
    } catch (err) {
      console.error(err);
      setError(' Failed to create campaign.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-6">
      <h2 className="text-lg font-bold mb-3">Create New Campaign</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <input
        type="text"
        name="title"
        placeholder="Campaign Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />

      <input
        type="number"
        name="goalAmount"
        placeholder="Goal Amount"
        value={formData.goalAmount}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Create Campaign
      </button>
    </form>
  );
};

export default CampaignForm;
