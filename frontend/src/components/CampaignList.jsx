import React, { useEffect, useState, useCallback, memo } from 'react';
import { getCampaigns } from '../api/campaignAPI';
import { useNavigate } from 'react-router-dom';

// Memoized campaign card component to prevent unnecessary re-renders
const CampaignCard = memo(({ item, onNavigate }) => {
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150?text=Image+Error";
  };

  return (
    <div 
      className="flex bg-white p-6 rounded-xl shadow-md items-center border border-transparent hover:border-blue-400 transition"
    >
      <img
        src={item?.mediaUrl || "https://via.placeholder.com/150?text=No+Image"}
        alt={item?.title || "Campaign Image"}
        className="w-40 h-40 object-cover rounded-md mr-6"
        onError={handleImageError}
        loading="lazy" // Add lazy loading for images
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-blue-900">{item?.title || "Untitled Campaign"}</h2>
        <p className="text-sm text-gray-600">{item?.description || 'No description available'}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-700">
            Raised: ${item?.raisedAmount ?? 0} / Goal: ${item?.goalAmount ?? 0}
          </span>
          <button
            onClick={() => onNavigate(item._id)}
            className="bg-blue-900 text-white px-4 py-1 rounded-md"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
});

// Main component with optimizations
const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Memoize the navigation handler
  const handleNavigate = useCallback((id) => {
    navigate(`/campaigns/${id}`);
  }, [navigate]);

  // Optimized fetch function with better error handling
  useEffect(() => {
    let isMounted = true;
    
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns();
        
        if (!isMounted) return;
        
        if (Array.isArray(response)) {
          setCampaigns(response);
        } else if (Array.isArray(response?.campaigns)) {
          setCampaigns(response.campaigns);
        } else {
          setCampaigns([]);
          console.warn('Unexpected response format:', response);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Error fetching campaigns:', error);
        setError('Failed to load campaigns. Please try again later.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchCampaigns();
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10 h-64">
        <div className="text-gray-600 text-lg">Loading campaigns...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-10 h-64">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-4">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 mt-2">Campaigns</h1>

      {campaigns.length === 0 ? (
        <p className="text-gray-500 text-center p-10">No campaigns available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {campaigns.map((item) => (
            <CampaignCard 
              key={item._id} 
              item={item} 
              onNavigate={handleNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;