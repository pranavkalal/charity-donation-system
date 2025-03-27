import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const DonationForm = ({ onDonationCreated }) => {
  const [formData, setFormData] = useState({
    amount: '',
    donor: '',
    campaign: '',
  });
  const [donors, setDonors] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const donorRes = await axiosInstance.get('/api/donors', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const campaignRes = await axiosInstance.get('/api/campaigns', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setDonors(donorRes.data);
        setCampaigns(campaignRes.data);
      } catch (error) {
        setMessage('⚠️ Error loading donors or campaigns.');
        console.error(error);
      }
    };

    if (user?.token) {
      fetchDropdownData();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await axiosInstance.post('/api/donations', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMessage('✅ Donation added successfully!');
      setFormData({ amount: '', donor: '', campaign: '' });
      if (onDonationCreated) onDonationCreated();
    } catch (err) {
      setMessage('❌ Failed to make donation.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-6">
      <h2 className="text-lg font-bold mb-3">Make a Donation</h2>

      {message && <p className="mb-3 text-sm text-blue-700">{message}</p>}

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      <select
        name="donor"
        value={formData.donor}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        required
      >
        <option value="">Select Donor</option>
        {donors.map((d) => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>

      <select
        name="campaign"
        value={formData.campaign}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        required
      >
        <option value="">Select Campaign</option>
        {campaigns.map((c) => (
          <option key={c._id} value={c._id}>{c.title}</option>
        ))}
      </select>

      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        Donate
      </button>
    </form>
  );
};

export default DonationForm;
