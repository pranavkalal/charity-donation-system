import React, { useState } from 'react';
import CampaignList from '../components/CampaignList';

const Campaigns = () => {
  const [refresh, setRefresh] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  const handleCampaignCreatedOrUpdated = () => {
    setEditingCampaign(null);
    setRefresh(!refresh);
  };

  return (
    <div className="w-full px-8 py-8">
      <CampaignList
        key={refresh}
        onEdit={(campaign) => setEditingCampaign(campaign)}
        onDelete={handleCampaignCreatedOrUpdated}
      />
    </div>
  );
};

export default Campaigns;
