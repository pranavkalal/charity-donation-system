import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCampaignById } from "../api/campaignAPI"; // ✅ correct API function

const CampaignDesc = () => {
  const { id } = useParams(); // ✅ using ID from URL
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaignById(id); // ✅ correct API call
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
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 pb-12">
      {/* Top Bar */}
      
      <h1 className="text-4xl font-bold text-[#242067] mb-10">Campaigns</h1>

      {/* Image Section */}
      <div className="w-full max-w-4xl px-6 mt-6">
        <div className="relative w-full h-72 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full rounded-xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white text-center">{title}</h2>
          </div>
        </div>

        {/* Progress Info */}
        <div className="mt-5 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between text-sm mb-1 text-gray-600">
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

      {/* Donate Button */}
      <div className="mt-6">
        <Link
          to={`/campaigns/${id}/payment`} // ✅ correct link to payment
          className="bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Donate
        </Link>
      </div>

      {/* About Section */}
      <div className="w-full max-w-4xl px-6 mt-10">
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p className="text-gray-700 leading-relaxed">{about}</p>
        <button className="mt-4 bg-gray-100 text-sm px-4 py-2 rounded-lg hover:bg-gray-200">
          Read more
        </button>
      </div>
    </div>
  );
};

export default CampaignDesc;
