import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchCampaigns = async () => {
    try {
      const res = await axiosInstance.get('/api/campaigns', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCampaigns(res.data);
    } catch (err) {
      setError('Failed to fetch campaigns');
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchCampaigns();
    }
  }, [user]);

  return (
    <div className="bg-white p-4 shadow-md rounded mt-6">
      <h2 className="text-xl font-bold mb-3">Campaigns</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <ul className="divide-y">
        {campaigns.length === 0 ? (
          <li className="py-2 text-gray-500">No campaigns found.</li>
        ) : (
          campaigns.map((campaign) => (
            <li key={campaign._id} className="py-3">
              <h3 className="font-semibold">{campaign.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{campaign.description}</p>
              <p className="text-sm font-medium">🎯 Goal: ${campaign.goalAmount}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CampaignList;
