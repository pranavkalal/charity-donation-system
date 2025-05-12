import React, { useState } from 'react';
import searchIcon from '../icons/search_icon.png';
import arrowIcon from '../icons/arrow_down_icon.png';

export default function DonorLeaderboard() {
  const [campaignFilter, setCampaignFilter] = useState('All Campaigns');
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for the leaderboard
  const donors = [
    { rank: 1, name: 'Alice Johnson', campaign: 'Medical Aid', totalDonated: 1000, lastDonation: '4/15/2025' },
    { rank: 2, name: 'Bob Smith', campaign: 'Direct Help', totalDonated: 800, lastDonation: '4/10/2025' },
    { rank: 3, name: 'Charlie Brown', campaign: 'Organizations', totalDonated: 700, lastDonation: '4/05/2025' },
  ];

  return (
    <div className="">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-indigo-800 mb-6">Top Donors</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500 mb-2">Total Donors</h2>
            <p className="text-xl font-bold text-indigo-800">3</p>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500 mb-2">Top Donor Amount</h2>
            <p className="text-xl font-bold text-indigo-800">$ 1000</p>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500 mb-2">Total Donations</h2>
            <p className="text-xl font-bold text-indigo-800">$ 2500</p>
          </div>
        </div>
        
        {/* Filters */}
        <h2 className="text-lg font-semibold text-indigo-800 mb-3">Filter Leaderboard</h2>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-indigo-500"
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
            >
              <option>All Campaigns</option>
              <option>Medical Aid</option>
              <option>Direct Help</option>
              <option>Organizations</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <img
                src={arrowIcon}
                alt="Arrow"
                className="w-6 h-6"
              />
            </div>
          </div>
          
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-indigo-500"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <img
                src={arrowIcon}
                alt="Arrow"
                className="w-6 h-6"
              />
            </div>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search Donors"
              className="bg-white border border-gray-300 rounded py-2 px-4 pl-10 focus:outline-none focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img
                src={searchIcon}
                alt="Search"
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>
        
        {/* Leaderboard Table */}
        <h2 className="text-lg font-semibold text-indigo-800 mb-3">Donor Leaderboard</h2>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Rank</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Donor Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Campaign</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Total Donated</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Last Donation</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.rank} className="border-b">
                  <td className="py-3 px-4">{donor.rank}</td>
                  <td className="py-3 px-4 text-gray-600">{donor.name}</td>
                  <td className="py-3 px-4 text-gray-600">{donor.campaign}</td>
                  <td className="py-3 px-4 text-indigo-700 font-medium">$ {donor.totalDonated}</td>
                  <td className="py-3 px-4 text-gray-600">{donor.lastDonation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}