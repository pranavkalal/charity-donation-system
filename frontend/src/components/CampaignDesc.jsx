import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCampaignById } from "../api/campaignAPI";

const CampaignDesc = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaignById(id);
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
        setCampaign(null);
      }
    };
    fetchCampaign();
  }, [id]);

  if (!campaign) {
    return <div className="p-10 text-red-500 text-lg">Campaign not found.</div>;
  }

  const { title, image, about, goalAmount, raisedAmount } = campaign;
  const percent = Math.min((raisedAmount / goalAmount) * 100, 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      
      {/* Banner Image with Title */}
      <div className="w-full max-w-4xl px-4">
        <div className="relative w-full h-72 rounded-xl overflow-hidden shadow">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white text-center">{title}</h1>
          </div>
        </div>
      </div>

      {/* Donate Button */}
      <div className="mt-6">
        <Link
          to={`/campaigns/${id}/payment`}
          className="bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Donate
        </Link>
      </div>

      {/* About Section */}
      <div className="w-full max-w-4xl bg-white px-6 py-4 mt-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">About This Campaign</h2>
        <p className="text-gray-700">{about || "No details provided yet."}</p>
      </div>

      {/* Progress Section */}
      <div className="w-full max-w-4xl bg-white px-6 py-4 mt-6 rounded-lg shadow">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Raised: ${raisedAmount}</span>
          <span>Goal: ${goalAmount}</span>
        </div>
        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-4"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">{percent}% funded</p>
      </div>
    </div>
  );
};

export default CampaignDesc;
