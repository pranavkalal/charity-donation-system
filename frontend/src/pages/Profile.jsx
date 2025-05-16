import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDonationSummary, getUserDonations } from '../api/donationAPI';

// Icons imports
import editIcon from '../icons/edit_icon.png';
import userIcon from '../icons/user_icon.png';
import emailIcon from '../icons/email_icon.png';
import phoneIcon from '../icons/phone_icon.png';
import locationIcon from '../icons/location_icon.png';
import calendarIcon from '../icons/calendar_icon.png';
import donationsIcon from '../icons/donations_icon.png';
import clockIcon from '../icons/clock_icon.png';

/**
 * ProfileServiceFacade - Implements the Facade Design Pattern
 * 
 * This facade provides a simplified interface to interact with various subsystems:
 * - Authentication subsystem
 * - User profile management subsystem  
 * - Donation tracking subsystem
 * 
 * The facade hides the complexity of interacting with these different subsystems
 * and provides a unified, easy-to-use interface for the UI components.
 */
class ProfileServiceFacade {
  constructor() {
    this.token = null;
    this.initializeToken();
  }

  // Initialize authentication token from local storage
  initializeToken() {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      this.token = userData?.token;
    } catch (error) {
      console.error('Failed to initialize token:', error);
      this.token = null;
    }
  }

  // Get authentication headers for API requests
  getAuthConfig() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Fetch user profile from the auth subsystem
  async getUserProfile() {
    if (!this.isAuthenticated()) {
      throw new Error('User not authenticated');
    }

    try {
      const { data } = await axios.get('/api/auth/profile', this.getAuthConfig());
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  // Update user profile in the auth subsystem
  async updateUserProfile(profileData) {
    if (!this.isAuthenticated()) {
      throw new Error('User not authenticated');
    }

    try {
      const { data } = await axios.put(
        '/api/auth/profile',
        profileData,
        this.getAuthConfig()
      );
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}

/**
 * Main Profile component
 * 
 * Uses the ProfileServiceFacade to interact with backend services
 * without needing to know the implementation details
 */
const Profile = () => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  // Create an instance of the facade to use throughout the component
  const profileService = new ProfileServiceFacade();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is authenticated
        if (!profileService.isAuthenticated()) {
          throw new Error('User not authenticated');
        }

        // Use the facade to fetch user profile
        const userProfile = await profileService.getUserProfile();
        setUser(userProfile);

        // Use the facade to fetch donation summary
        const donationData = await getDonationSummary();
        setDonations(donationData);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
        console.error('Error loading profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchDonationHistory = async () => {
    try {
      const history = await getUserDonations();
      setDonationHistory(history);
      setShowHistory(true);
    } catch (err) {
      console.error('Error fetching donation history:', err);
      alert('Failed to fetch donation history');
    }
  };

  if (loading) return <div className="text-center p-6">Loading profile...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Error: {error}</div>;
  if (!user) return <div className="text-center p-6">Please log in to view your profile</div>;

  // If the history is displayed, render the DonationHistory component
  if (showHistory) {
    return (
      <DonationHistory
        donations={donationHistory}
        onBack={() => setShowHistory(false)}
      />
    );
  }

  return (
    <div>
      <PersonalInformation
        user={user}
        setUser={setUser}
        profileService={profileService}
      />
      <DonationSummary donationData={donations} onHistoryClick={fetchDonationHistory} />
    </div>
  );
};

/**
 * PersonalInformation component
 * 
 * Handles the display and editing of user personal information
 * Uses the facade to update profile data without worrying about authentication details
 */
const PersonalInformation = ({ user, setUser, profileService }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
    memberSince: new Date(user.memberSince).toLocaleDateString()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Extract only the data that needs to be updated
      const dataToUpdate = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      };

      // Use the facade to update the profile
      const updatedUser = await profileService.updateUserProfile(dataToUpdate);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile' + (error.response?.data?.message || error.message));
    }
  };

  // Edit mode UI
  if (isEditing) {
    return (
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">
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
                className="px-4 py-2 bg-blue-700 text-white rounded-md text-sm font-medium"
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
        <h2 className="text-xl font-bold text-blue-900">
          Personal Information
        </h2>
        <button
          className="flex items-center gap-1 text-md text-blue-900 font-medium"
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
        <div className="flex items-center text-blue-900">
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

        <div className="flex items-center text-blue-900">
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

        <div className="flex items-center text-blue-900">
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

        <div className="flex items-center text-blue-900">
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

        <div className="flex items-center text-blue-900">
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

/**
 * DonationSummary component
 * 
 * Displays donation-related information
 * Could be expanded to use the facade for additional donation-related operations
 */
const DonationSummary = ({ donationData, onHistoryClick }) => {
  // Provide default data if no donation data is available
  const displayData = donationData || {
    totalDonated: "$0.00",
    donationsCount: 0,
    lastDonationDate: "N/A"
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Flex container for heading + button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-900">
          Donation Summary
        </h2>
        <button
          className="px-4 py-1 bg-blue-900 text-white rounded-md text-md font-medium"
          onClick={onHistoryClick}
        >
          History
        </button>
      </div>

      <div className="border-t border-gray-200 mb-4"></div>

      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-blue-900 mt-6">
          {displayData.totalDonated}
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
          <div className="text-base font-medium">{displayData.donationsCount}</div>
          <div className="text-base font-medium">{displayData.lastDonationDate}</div>
        </div>
      </div>
    </section>
  );
};

const DonationHistory = ({ donations, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(donations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDonations = donations.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary justify-center items-center">Donation History</h2>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
          onClick={onBack}
        >
          Back
        </button>
      </header>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left text-lg font-medium text-primary">Campaign</th>
            <th className="border border-gray-200 px-4 py-2 text-left text-lg font-medium text-primary">Donated</th>
            <th className="border border-gray-200 px-4 py-2 text-left text-lg font-medium text-primary">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentDonations.map((donation) => (
            <tr key={donation._id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2 text-lg text-gray-700">{donation.campaign.title}</td>
              <td className="border border-gray-200 px-4 py-2 font-bold text-lg text-primary">${donation.amount}</td>
              <td className="border border-gray-200 px-4 py-2 text-lg text-gray-700">
                {new Date(donation.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm font-medium disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm font-medium disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Profile;