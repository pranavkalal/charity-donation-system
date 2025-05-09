import React, { useEffect, useState } from 'react';
import { getCampaigns } from '../api/campaignAPI';
import { useNavigate } from 'react-router-dom';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setCampaigns([]);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5fa] px-12 py-4"> {/* reduced py */}
      <h1 className="text-4xl font-bold text-[#242067] mb-8 mt-2">Campaigns</h1> {/* optional mt-2 added */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {campaigns.map((item) => (
          <div
            key={item._id}
            className="flex bg-white p-6 rounded-xl shadow-md items-center border border-transparent hover:border-blue-400 transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-40 h-40 object-cover rounded-md mr-6"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-900">{item.title}</h2>
              <p className="text-sm text-gray-600">
                {item.description || 'write your text here write your text here write'}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">
                  ${item.amount || 20}
                </span>
                <button
                  onClick={() => navigate(`/campaigns/${item._id}`)}
                  className="bg-blue-900 text-white px-4 py-1 rounded-md"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
