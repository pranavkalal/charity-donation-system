import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserById, updateUser } from '../api/userAPI';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    university: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserById(user.id);
        setFormData(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    if (user?.id) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.id, formData);
      alert('Profile updated!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 mt-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="university" placeholder="University" value={formData.university} onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default Profile;
