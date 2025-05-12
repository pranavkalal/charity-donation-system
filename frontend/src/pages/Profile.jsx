import { useState, useEffect } from 'react';

import editIcon from '../icons/edit_icon.png';
import userIcon from '../icons/user_icon.png';
import emailIcon from '../icons/email_icon.png';
import phoneIcon from '../icons/phone_icon.png';
import locationIcon from '../icons/location_icon.png';
import calendarIcon from '../icons/calendar_icon.png';
import donationsIcon from '../icons/donations_icon.png';
import clockIcon from '../icons/clock_icon.png';

// Main Profile component
const Profile = () => {
  // User state (currently mocked for demo purposes)
  const [user, setUser] = useState({ token: 'demo-token' });

  return (
    <div>
      <PersonalInformation />
      <DonationSummary />
    </div>
  );
};

// Component to show and edit personal information
const PersonalInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alice Johnson',
    email: 'alice@gmail.com',
    phone: '(555) 123-4567',
    address: '123,Fake Street, Brisbane, QLD 4000',
    memberSince: '6/15/2023'
  });

  // Handles form submission (e.g., save changes)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // This would normally call an API
  };

  // Edit mode UI
  if (isEditing) {
    return (
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-indigo-900">
            Edit Personal Information
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-2 border rounded-md text-base"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="p-2 border border-gray-300 rounded-md text-gray-600 bg-gray-50 cursor-not-allowed"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="p-2 border rounded-md text-base"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="p-2 border rounded-md text-base"
              />
            </div>
            
            <div className="flex gap-3 mt-4">
              <button 
                type="submit" 
                className="px-4 py-2 bg-indigo-700 text-white rounded-md text-sm font-medium"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }

  // View mode UI
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-900">
          Personal Information
        </h2>
        <button 
          className="flex items-center gap-1 text-md text-indigo-800 font-medium"
          onClick={() => setIsEditing(true)}
        >
          <img
            src={editIcon}
            alt="Edit"
            className="w-6 h-6"
          />
          <span>Edit Profile</span>
        </button>
      </header>
      <div className="border-t border-gray-200 mt-6"></div>
      <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-3 mt-4">
        <div className="flex items-center text-indigo-700">
        <img 
            src={userIcon} 
            alt="User" 
            className="w-6 h-6" 
        />
        </div>
        <div>
          <div className="text-base font-medium">{formData.name}</div>
          <div className="text-sm text-gray-600">Full Name</div>
        </div>

        <div className="flex items-center text-indigo-700">
        <img 
            src={emailIcon} 
            alt="Email" 
            className="w-6 h-6" 
        />
        </div>
        <div>
          <div className="text-base font-medium">{formData.email}</div>
          <div className="text-sm text-gray-600">Email Address</div>
        </div>

        <div className="flex items-center text-indigo-700">
        <img 
            src={phoneIcon} 
            alt="Phone" 
            className="w-6 h-6" 
        />
        </div>
        <div>
          <div className="text-base font-medium">{formData.phone}</div>
          <div className="text-sm text-gray-600">Phone Number</div>
        </div>

        <div className="flex items-center text-indigo-700">
        <img 
            src={locationIcon} 
            alt="Location" 
            className="w-6 h-6" 
        />
        </div>
        <div>
          <div className="text-base font-medium">{formData.address}</div>
          <div className="text-sm text-gray-600">Address</div>
        </div>

        <div className="flex items-center text-indigo-700">
        <img 
            src={calendarIcon} 
            alt="Calendar" 
            className="w-6 h-6" 
        />
        </div>
        <div>
          <div className="text-base font-medium">{formData.memberSince}</div>
          <div className="text-sm text-gray-600">Member Since</div>
        </div>
      </div>
    </section>
  );
};

// Component to display donation-related information
const DonationSummary = () => {
  const [donationData, setDonationData] = useState({
    totalDonated: "$1000.00",
    donationsCount: 1,
    lastDonationDate: "4/15/2025"
  });

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
    {/* Flex container for heading + button */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-indigo-900">
        Donation Summary
      </h2>
      <button
        className="px-4 py-1 bg-indigo-700 text-white rounded-md text-md font-medium"
        onClick={() => alert('View donation history')}
      >
        History
      </button>
    </div>

    <div className="border-t border-gray-200 mb-4"></div>

      
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-indigo-900 mt-6">
          {donationData.totalDonated}
        </div>
        <div className="text-sm text-gray-600">
          Total Donated
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
          <img 
              src={donationsIcon} 
              alt="Donations" 
              className="w-6 h-6" 
            />
            <span className="text-sm text-gray-600">Donations</span>
          </div>
          <div className="flex items-center gap-2">
          <img 
              src={clockIcon} 
              alt="Clock" 
              className="w-6 h-6" 
            />
            <span className="text-sm text-gray-600">Last Donation</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-right">
          <div className="text-base font-medium">{donationData.donationsCount}</div>
          <div className="text-base font-medium">{donationData.lastDonationDate}</div>
        </div>
      </div>
    </section>
  );
};

export default Profile;