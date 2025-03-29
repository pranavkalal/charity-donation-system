import React, { useState } from 'react';
import CampaignForm from '../components/CampaignForm';
import CampaignList from '../components/CampaignList';

const Campaigns = () => {
  const [refresh, setRefresh] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  const handleCampaignCreatedOrUpdated = () => {
    setEditingCampaign(null);      // Reset editing state
    setRefresh(!refresh);          // Trigger re-render
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <CampaignForm
        onSuccess={handleCampaignCreatedOrUpdated}
        editingCampaign={editingCampaign}
      />
      <CampaignList
        key={refresh}
        onEdit={(campaign) => setEditingCampaign(campaign)}
        onDelete={handleCampaignCreatedOrUpdated}
      />
    </div>
  );
};

export default Campaigns;
