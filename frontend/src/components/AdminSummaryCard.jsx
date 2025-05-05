import React from 'react';

const AdminSummaryCard = ({ label, value }) => (
  <div className="flex flex-col gap-2 p-6 border border-[#cacde7] rounded-xl min-w-[158px] flex-1">
    <p className="text-[#0d0e1c] text-base font-medium leading-normal">{label}</p>
    <p className="text-[#0d0e1c] text-2xl font-bold leading-tight">{value}</p>
  </div>
);

export default AdminSummaryCard;
