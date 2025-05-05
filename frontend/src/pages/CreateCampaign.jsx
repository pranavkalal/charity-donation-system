import React from 'react';
import CampaignForm from '../components/CampaignForm';
import AdminSidebar from '../components/AdminSidebar';

const CreateCampaign = () => {
  return (
    <div className="flex min-h-screen bg-[#f1f2f9] font-['Plus Jakarta Sans','Noto Sans',sans-serif]">
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium text-[#0d0e1c] mb-6">Create a campaign</h1>
        <CampaignForm />
      </main>
    </div>
  );
};

export default CreateCampaign;
