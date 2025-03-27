import React, { useState } from 'react';
import CampaignForm from '../components/CampaignForm';
import CampaignList from '../components/CampaignList';

const Campaigns = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <CampaignForm onCampaignCreated={() => setRefresh(!refresh)} />
      <CampaignList key={refresh} />
    </div>
  );
};

export default Campaigns;
