import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminSummaryCard from '../components/AdminSummaryCard';
import AdminCampaignTable from '../components/AdminCampaignTable';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axiosInstance.get('/api/campaigns', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setCampaigns(res.data);
      } catch (err) {
        console.error('Failed to fetch campaigns:', err);
        setError('Could not load campaigns.');
      }
    };

    fetchCampaigns();
  }, [user.token]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this campaign?');
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCampaigns(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Failed to delete campaign:', err);
    }
  };

  const handleEdit = (campaign) => {
    navigate('/admin/create-campaign', { state: { campaign } });
  };

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
          <AdminSummaryCard label="Total Campaigns" value={campaigns.length} />
          <AdminSummaryCard label="Total Donations" value={`$${campaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0)}`} />
          <AdminSummaryCard label="Total Donors" value="2" />
        </div>

        <div className="mb-6">
          <label className="block text-[#0d0e1c] font-medium mb-2">Filter Campaigns</label>
          <select className="w-full max-w-xs p-3 border border-[#cacde7] rounded-xl bg-white">
            <option value="">Select filter</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <AdminCampaignTable
          campaigns={campaigns}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;
