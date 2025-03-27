import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchDonations = async () => {
    try {
      const res = await axiosInstance.get('/api/donations', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setDonations(res.data);
    } catch (err) {
      setError('Failed to fetch donations.');
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchDonations();
    }
  }, [user]);

  return (
    <div className="bg-white p-4 shadow-md rounded mt-6">
      <h2 className="text-xl font-bold mb-3">Recent Donations</h2>
      {error && <p className="text-red-600">{error}</p>}

      <ul className="divide-y">
        {donations.length === 0 ? (
          <li className="py-2 text-gray-500">No donations found.</li>
        ) : (
          donations.map((donation) => (
            <li key={donation._id} className="py-2">
              <p>
                💰 <strong>${donation.amount}</strong>{' '}
                by <em>{donation?.donor?.name || 'Unknown Donor'}</em>{' '}
                to <strong>{donation?.campaign?.title || 'Untitled Campaign'}</strong>
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DonationList;
