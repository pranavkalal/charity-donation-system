// CampaignList.jsx
import React, { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Singleton Pattern – App Config
class ConfigSingleton {
  constructor() {
    if (!ConfigSingleton.instance) {
      this.config = {
        defaultImageUrl: 'https://via.placeholder.com/150?text=No+Image',
        errorImageUrl: 'https://via.placeholder.com/150?text=Image+Error',
      };
      ConfigSingleton.instance = this;
    }
    return ConfigSingleton.instance;
  }

  get(key) {
    return this.config[key];
  }
}
const config = new ConfigSingleton();

const CampaignCard = memo(({ item, onNavigate }) => {
  const handleImageError = (e) => {
    e.target.src = config.get('errorImageUrl');
  };

  return (
    <div className="flex bg-white p-6 rounded-xl shadow-md items-center border border-transparent hover:border-blue-400 transition">
      <img
        src={item?.mediaUrl || config.get('defaultImageUrl')}
        alt={item?.title || "Campaign Image"}
        className="w-40 h-40 object-cover rounded-md mr-6"
        onError={handleImageError}
        loading="lazy"
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-blue-900">
          {item?.title || "Untitled Campaign"}
        </h2>
        <p className="text-sm text-gray-600">
          {item?.description || 'No description available'}
        </p>
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

const SkeletonCard = () => (
  <div className="animate-pulse bg-white p-6 rounded-xl shadow-md border border-gray-200">
    <div className="w-40 h-40 bg-gray-200 rounded-md mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = useCallback((id) => {
    navigate(`/campaigns/${id}`);
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : data.campaigns || [];
        const activeCampaigns = list.filter(c => c.status !== 'Inactive');
        setCampaigns(activeCampaigns);
      })
      .catch((err) => {
        if (isMounted) setError('Failed to load campaigns.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const renderedCards = useMemo(() => {
    return campaigns.map((item) => (
      <CampaignCard key={item._id} item={item} onNavigate={handleNavigate} />
    ));
  }, [campaigns, handleNavigate]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="min-h-screen px-6 py-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">Campaigns</h1>
      {campaigns.length === 0 ? (
        <p className="text-gray-500 text-center">No campaigns available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderedCards}
        </div>
      )}
    </div>
  );
};

export default CampaignList;
