import React, { useState } from 'react';
import DonationForm from '../components/DonationForm';
import DonationList from '../components/DonationList';

const Donations = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <DonationForm onDonationCreated={() => setRefresh(!refresh)} />
      <DonationList key={refresh} />
    </div>
  );
};

export default Donations;
