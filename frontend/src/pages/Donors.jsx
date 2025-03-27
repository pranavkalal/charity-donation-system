import React, { useState } from 'react';
import DonorForm from '../components/DonorForm';
import DonorList from '../components/DonorList';

const Donors = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <DonorForm onDonorAdded={() => setRefresh(!refresh)} />
      <DonorList key={refresh} />
    </div>
  );
};

export default Donors;
