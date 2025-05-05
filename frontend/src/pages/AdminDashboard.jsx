import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminSummaryCard from '../components/AdminSummaryCard';
import AdminCampaignTable from '../components/AdminCampaignTable';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const campaigns = [
    { name: 'Campaign 1', goal: '-', raised: '500', status: 'Active' },
    { name: 'Campaign 2', goal: '-', raised: '1000', status: 'Inactive' },
    { name: 'Campaign 3', goal: '-', raised: '-', status: 'Active' }
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f2f9] font-['Plus Jakarta Sans','Noto Sans',sans-serif]">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#0d0e1c]">Welcome, Admin</h1>
          <button
            onClick={() => navigate('/admin/create-campaign')}
            className="bg-[#dfe1f1] text-[#0d0e1c] px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#e2e4f2]"
          >
            + Create Campaign
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <AdminSummaryCard label="Total Campaigns" value="3" />
          <AdminSummaryCard label="Total Donations" value="$1500" />
          <AdminSummaryCard label="Total Donors" value="2" />
        </div>

        <div className="mb-6">
          <label className="block text-[#0d0e1c] font-medium mb-2">Filter Campaigns</label>
          <select className="w-full max-w-xs p-3 border border-[#cacde7] rounded-xl bg-white">
            <option value="">Select filter</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <AdminCampaignTable campaigns={campaigns} />
      </main>
    </div>
  );
};

export default AdminDashboard;
