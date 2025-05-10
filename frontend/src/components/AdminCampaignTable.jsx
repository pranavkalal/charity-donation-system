import React from 'react';

const AdminCampaignTable = ({ campaigns, onDelete, onEdit }) => {
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
          {campaigns.map((c) => (
            <tr key={c._id} className="border-t border-[#cacde7]">
              <td className="px-4 py-3 text-sm text-[#0d0e1c]">{c.title}</td>
              <td className="px-4 py-3 text-sm text-[#464d9b]">{c.goalAmount}</td>
              <td className="px-4 py-3 text-sm text-[#464d9b]">{c.raisedAmount}</td>
              <td className="px-4 py-3">
                <span className="inline-block bg-[#dfe1f1] text-[#0d0e1c] px-4 py-1 rounded-full text-sm">
                  {c.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-[#1c2480] font-bold space-x-2">
                <button onClick={() => onEdit && onEdit(c)} className="hover:underline">
                  Edit
                </button>
                <button onClick={() => onDelete && onDelete(c._id)} className="hover:underline text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCampaignTable;
