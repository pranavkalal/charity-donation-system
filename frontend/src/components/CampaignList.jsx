import React, { useEffect, useState } from 'react';
import { getCampaigns } from '../api/campaignAPI';
import { useNavigate } from 'react-router-dom';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await getCampaigns();
        console.log("Fetched campaigns response:", response);

        if (Array.isArray(response)) {
          setCampaigns(response);
        } else if (Array.isArray(response?.campaigns)) {
          setCampaigns(response.campaigns);
        } else {
          setCampaigns([]);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="p-10 text-gray-600 text-lg">Loading campaigns...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f5fa] px-12 py-4">
      <h1 className="text-4xl font-bold text-[#242067] mb-8 mt-2">Campaigns</h1>

      {campaigns.length === 0 ? (
        <p className="text-gray-500 text-center">No campaigns available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {campaigns.map((item) => (
            <div
              key={item._id}
              className="flex bg-white p-6 rounded-xl shadow-md items-center border border-transparent hover:border-blue-400 transition"
            >
              <img
                src={item?.mediaUrl || "https://via.placeholder.com/150?text=No+Image"}
                alt={item?.title || "Campaign Image"}
                className="w-40 h-40 object-cover rounded-md mr-6"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=Image+Error";
                }}
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-blue-900">{item?.title || "Untitled Campaign"}</h2>
                <p className="text-sm text-gray-600">{item?.description || 'No description available'}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-700">
                    Raised: ${item?.raisedAmount ?? 0} / Goal: ${item?.goalAmount ?? 0}
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
      )}
    </div>
  );
};

export default CampaignList;
