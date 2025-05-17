import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CampaignForm = ({ initialData = null, onCampaignCreated }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    currency: 'USD',
    startDate: '',
    endDate: '',
    status: 'Active',
    mediaUrl: ''
  });

  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        goalAmount: initialData.goalAmount || '',
        currency: initialData.currency || 'USD',
        startDate: initialData.startDate?.slice(0, 10) || '',
        endDate: initialData.endDate?.slice(0, 10) || '',
        status: initialData.status || 'Active',
        mediaUrl: initialData.mediaUrl || ''
      });
      setImagePreview(initialData.mediaUrl || '');
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, mediaUrl: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isEdit) {
        await axiosInstance.put(`/api/campaigns/${initialData._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setSuccess('Campaign updated successfully!');
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        await axiosInstance.post('/api/campaigns', formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setSuccess('Campaign created successfully!');
        setFormData({
          title: '',
          description: '',
          goalAmount: '',
          currency: 'USD',
          startDate: '',
          endDate: '',
          status: 'Active',
          mediaUrl: ''
        });
        setImagePreview('');
        onCampaignCreated?.();
      }
    } catch {
      setError(`Failed to ${isEdit ? 'update' : 'create'} campaign.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#f1f2f9] rounded-xl p-6">
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[#0d0e1c]">Campaign name</label>
        <input
          type="text"
          name="title"
          placeholder="E.g. Help us fight climate change"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-4 border border-[#cacde7] rounded-lg bg-white placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#1c2480]"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[#0d0e1c]">Description</label>
        <textarea
          name="description"
          placeholder="Briefly describe your campaign..."
          value={formData.description}
          onChange={handleChange}
          className="w-full p-4 border border-[#cacde7] rounded-lg bg-white placeholder:text-[#6b7280] min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-[#1c2480]"
          required
        />
      </div>

      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label className="block font-semibold mb-2 text-[#0d0e1c]">Goal amount</label>
          <input
            type="number"
            name="goalAmount"
            placeholder="1000"
            value={formData.goalAmount}
            onChange={handleChange}
            className="w-full p-4 border border-[#cacde7] rounded-lg bg-white placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#1c2480]"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block font-semibold mb-2 text-[#0d0e1c]">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-4 border border-[#cacde7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1c2480]"
          >
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label className="block font-semibold mb-2 text-[#0d0e1c]">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-4 border border-[#cacde7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1c2480]"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block font-semibold mb-2 text-[#0d0e1c]">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-4 border border-[#cacde7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1c2480]"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[#0d0e1c]">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-4 border border-[#cacde7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1c2480]"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="mb-6 border-2 border-dashed border-[#cacde7] rounded-xl px-6 py-10 text-center bg-white">
        <p className="text-lg font-bold text-[#0d0e1c] mb-2">Add media</p>
        <p className="text-sm text-[#6b7280] mb-4">Max file size 10MB</p>
        <label className="cursor-pointer inline-block bg-[#f1f2f9] px-6 py-2 rounded-full font-semibold hover:bg-[#e2e4f2] transition">
          Upload
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-4 h-40 object-cover rounded mx-auto" />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#1c2480] text-white py-3 rounded-xl font-bold hover:bg-[#1a1f70] transition"
      >
        {isEdit ? 'Update Campaign' : 'Create Campaign'}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
      {success && <p className="text-green-600 mt-3">{success}</p>}
    </form>
  );
};

export default CampaignForm;
