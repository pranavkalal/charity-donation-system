import React, { useState, useEffect } from 'react';
import { getDonorLeaderboard } from '../api/donationAPI';

export default function DonorLeaderboard() {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [searchQuery, setSearchQuery] = useState('');
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await getDonorLeaderboard();
        
        const leaderboardData = response.data || response;
        console.log('API Response:', leaderboardData); 
        
        setDonors(leaderboardData);
        setFilteredDonors(leaderboardData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load donor data');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (!donors.length) return;
    
    const lowerSearch = searchQuery.toLowerCase();

    const filtered = donors.filter((donor) => {
      const matchesSearch = donor.name.toLowerCase().includes(lowerSearch);
      return matchesSearch;
    });

    setFilteredDonors(filtered);
  }, [searchQuery, donors]);

  const totalDonations = donors.reduce((sum, d) => sum + d.totalDonated, 0);
  const topDonation = donors.length > 0 ? Math.max(...donors.map(d => d.totalDonated)) : 0;

  const formatDate = (dateStr) => {
    try {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
    } catch (e) {
      return 'N/A';
    }
  };

  if (loading) return <div className="text-center py-10">Loading donor data...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Top Donors</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500 mb-2">Total Donors</h2>
            <p className="text-xl font-bold text-blue-900">{donors.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500 mb-2">Top Donor Amount</h2>
            <p className="text-xl font-bold text-blue-900">$ {topDonation.toLocaleString()}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-gray-500 mb-2">Total Donations</h2>
            <p className="text-xl font-bold text-blue-900">$ {totalDonations.toLocaleString()}</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-blue-900 mb-3">Filter Leaderboard</h2>
        <div className="flex flex-wrap items-center gap-4 mb-6">
         
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search Donors"
              className="bg-white border border-gray-300 rounded py-2 px-4 pl-10 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-blue-900 mb-3">Donor Leaderboard</h2>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Rank</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Donor Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Campaign</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Total Donated</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Last Donation</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map((donor, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-700">{donor.name}</td>
                  <td className="py-3 px-4 text-gray-700">{donor.campaign || 'N/A'}</td>
                  <td className="py-3 px-4 text-blue-900 font-medium">$ {donor.totalDonated.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-700">{formatDate(donor.lastDonation)}</td>
                </tr>
              ))}
              {filteredDonors.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 px-4 text-center text-gray-500">No matching donors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}