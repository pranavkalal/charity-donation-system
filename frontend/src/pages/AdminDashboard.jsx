import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminSummaryCard from '../components/AdminSummaryCard';
import AdminCampaignTable from '../components/AdminCampaignTable';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

// Strategy Design Pattern
import FilterByStatus from '../strategies/campaignFilters/FilterByStatus';
import FilterByGoalAmount from '../strategies/campaignFilters/FilterByGoalAmount';

// 📦 Donor API (assumes you have this file/method)
import { getDonorLeaderboard } from '../api/donationAPI';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [campaigns, setCampaigns] = useState([]);
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [minGoal, setMinGoal] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignRes, donorRes] = await Promise.all([
          axiosInstance.get('/api/campaigns', {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          getDonorLeaderboard(), // assumed to work without token
        ]);

        setCampaigns(campaignRes.data);
        setDonors(donorRes.data || donorRes); // fallback in case `.data` not used
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Could not load dashboard data.');
      }
    };

    fetchData();
  }, [user.token]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this campaign?');
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error('Failed to delete campaign:', err);
    }
  };

  const handleEdit = (campaign) => {
    navigate('/admin/create-campaign', { state: { campaign } });
  };

  // 🧠 Apply Filters
  let filtered = campaigns;

  if (filter) {
    const statusStrategy = new FilterByStatus(filter);
    filtered = statusStrategy.apply(filtered);
  }

  if (minGoal) {
    const goalStrategy = new FilterByGoalAmount(parseFloat(minGoal));
    filtered = goalStrategy.apply(filtered);
  }

  const totalRaised = campaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0);

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
          <AdminSummaryCard label="Total Donations" value={`$${totalRaised}`} />
          <AdminSummaryCard label="Total Donors" value={donors.length} />
        </div>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#0d0e1c] font-medium mb-2">Filter by Status</label>
            <select
              className="w-full max-w-xs p-3 border border-[#cacde7] rounded-xl bg-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-[#0d0e1c] font-medium mb-2">Min Goal Amount</label>
            <input
              type="number"
              className="w-full max-w-xs p-3 border border-[#cacde7] rounded-xl bg-white"
              placeholder="e.g. 1000"
              value={minGoal}
              onChange={(e) => setMinGoal(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <AdminCampaignTable
          campaigns={filtered}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;
