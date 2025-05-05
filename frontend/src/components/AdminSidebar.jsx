import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleNav = (route) => {
    navigate(route);
  };

  return (
    <aside className="w-80 bg-[#f1f2f9] h-screen p-4 border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <h1 className="text-base font-medium text-[#0d0e1c]">Charity System</h1>
          <p className="text-sm text-[#464d9b]">Admin Panel</p>
        </div>
        <nav className="flex flex-col gap-1">
          <button onClick={() => handleNav('/admin')} className="text-left w-full px-4 py-2 rounded-full text-sm font-medium text-[#0d0e1c] hover:bg-[#e2e4f2] transition">Dashboard</button>
          <button onClick={() => handleNav('/admin/create-campaign')} className="text-left w-full px-4 py-2 rounded-full text-sm font-medium text-[#0d0e1c] hover:bg-[#e2e4f2] transition">Campaigns</button>
          <button className="text-left w-full px-4 py-2 rounded-full text-sm font-medium text-[#0d0e1c] hover:bg-[#e2e4f2] transition">Beneficiary</button>
          <button className="text-left w-full px-4 py-2 rounded-full text-sm font-medium text-[#0d0e1c] hover:bg-[#e2e4f2] transition">Reports</button>
          <button className="text-left w-full px-4 py-2 rounded-full text-sm font-medium text-[#0d0e1c] hover:bg-[#e2e4f2] transition">Settings</button>
          <button className="text-left w-full px-4 py-2 rounded-full text-sm font-medium text-[#0d0e1c] hover:bg-[#e2e4f2] transition">Leaderboard</button>
        </nav>
      </div>
      <button className="text-sm text-red-600 ml-4 mb-4 hover:underline">Logout</button>
    </aside>
  );
};

export default AdminSidebar;
