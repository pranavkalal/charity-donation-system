import React, { useEffect, useState } from "react";
import { getCampaigns, deleteCampaign } from "../api/campaignAPI";

const CampaignList = ({ onSelect }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        if (Array.isArray(data)) {
          setCampaigns(data);
        } else {
          console.error("Expected an array, got:", data);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      await deleteCampaign(id);
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-8 py-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((item) => {
          const percent = Math.min((item.raisedAmount / item.goalAmount) * 100, 100).toFixed(0);

          return (
            <div
              key={item._id}
              className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4"
              onClick={() => onSelect(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-blue-900">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  ${item.raisedAmount} raised of ${item.goalAmount}
                </p>

                <div className="w-full bg-gray-200 h-2 rounded-full mt-1 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mb-2">{percent}% funded</p>

                <div className="flex justify-between items-center mt-2 space-x-2">
                  <button
                    className="bg-blue-900 text-white px-4 py-1 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(item);
                    }}
                  >
                    Donate
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignList;
