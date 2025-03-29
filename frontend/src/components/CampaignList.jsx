import React, { useEffect, useState } from 'react';
import { getCampaigns, deleteCampaign } from '../api/campaignAPI';

const CampaignList = ({ onEdit, onDelete }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        console.log('✅ Fetched campaigns:', data);
        if (Array.isArray(data)) {
          setCampaigns(data);
        } else {
          console.error('Expected an array but got:', typeof data, data);
          setCampaigns([]); // fallback to empty array
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setCampaigns([]); // fallback on error
      }
    };

    fetchCampaigns();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      await deleteCampaign(id);
      onDelete(); // trigger refresh in parent
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Campaigns</h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-500">No campaigns available.</p>
      ) : (
        campaigns.map((campaign) => (
          <div key={campaign._id} className="mb-4 pb-2 border-b">
            <h3 className="font-semibold">{campaign.title}</h3>
            <p className="text-sm text-gray-600">{campaign.description}</p>
            <p className="mt-1">🎯 Goal: ${campaign.goal}</p>
            <div className="mt-2 space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => onEdit(campaign)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(campaign._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CampaignList;
