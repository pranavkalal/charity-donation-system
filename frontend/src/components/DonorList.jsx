import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axiosInstance.get('/api/donors');
        setDonors(response.data);
      } catch (err) {
        setError('Failed to load donors');
      }
    };

    fetchDonors();
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Donors</h2>
      {error && <p className="text-red-600">{error}</p>}
      <ul>
        {donors.map((donor) => (
          <li key={donor._id} className="border-b py-2">
            <p className="font-medium">{donor.name}</p>
            <p className="text-sm text-gray-600">{donor.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonorList;
