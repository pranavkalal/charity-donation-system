import React from 'react';
import { useLocation } from 'react-router-dom';
import CampaignForm from '../components/CampaignForm';
import AdminSidebar from '../components/AdminSidebar';

const CreateCampaign = () => {
  const location = useLocation();
  const editingCampaign = location.state?.campaign || null;

  return (
    <div className="flex min-h-screen bg-[#f1f2f9] font-['Plus Jakarta Sans','Noto Sans',sans-serif]">
      <AdminSidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium text-[#0d0e1c] mb-6">
          {editingCampaign ? 'Edit Campaign' : 'Create a campaign'}
        </h1>
        <CampaignForm initialData={editingCampaign} />
      </main>
    </div>
  );
};

export default CreateCampaign;
