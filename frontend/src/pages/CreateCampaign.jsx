import React from 'react';
import CampaignForm from '../components/CampaignForm';

const CreateCampaign = () => {
  const menuItems = ['Dashboard', 'Campaigns', 'Donations', 'Reports', 'Settings', 'Manage Users'];

  return (
    <div className="flex min-h-screen bg-[#f1f2f9] font-['Plus Jakarta Sans','Noto Sans',sans-serif]">
      {/* Sidebar */}
      <aside className="w-80 bg-[#f1f2f9] h-screen p-4 flex flex-col justify-start border-r border-gray-200">
        <div className="mb-6">
          <h1 className="text-base font-medium text-[#0d0e1c]">Charity System</h1>
          <p className="text-sm text-[#464d9b]">Admin</p>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item) => (
            <button
              key={item}
              className="text-left w-full px-4 py-2 rounded-full font-medium text-sm text-[#0d0e1c] hover:bg-[#e2e4f2] transition"
            >
              {item}
            </button>
          ))}

          {/* Logout now styled like text below menu */}
          <button
            className="mt-4 ml-4 text-sm text-red-600 hover:underline"
            onClick={() => {
              // Add logout logic if needed
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium text-[#0d0e1c] mb-6">Create a campaign</h1>
        <CampaignForm />
      </main>
    </div>
  );
};

export default CreateCampaign;
