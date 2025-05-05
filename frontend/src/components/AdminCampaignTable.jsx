import React from 'react';

const AdminCampaignTable = ({ campaigns }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-[#cacde7] bg-[#f1f2f9]">
      <table className="w-full">
        <thead>
          <tr className="bg-[#f1f2f9]">
            <th className="px-4 py-3 text-left text-sm font-medium text-[#0d0e1c]">Campaign Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#0d0e1c]">Goal</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#0d0e1c]">Raised</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#0d0e1c]">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[#464d9b]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, i) => (
            <tr key={i} className="border-t border-[#cacde7]">
              <td className="px-4 py-3 text-sm text-[#0d0e1c]">{c.name}</td>
              <td className="px-4 py-3 text-sm text-[#464d9b]">{c.goal}</td>
              <td className="px-4 py-3 text-sm text-[#464d9b]">{c.raised}</td>
              <td className="px-4 py-3">
                <span className="inline-block bg-[#dfe1f1] text-[#0d0e1c] px-4 py-1 rounded-full text-sm">
                  {c.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-bold text-[#464d9b]">Edit, Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCampaignTable;
