import axios from '../axiosConfig';

export const getCampaigns = async () => {
  const response = await axios.get('/api/campaigns');
  return response.data; // ✅ this is what CampaignList expects
};

export const createCampaign = async (data) => {
  const response = await axios.post('/api/campaigns', data);
  return response.data;
};

export const updateCampaign = async (id, data) => {
  const response = await axios.put(`/api/campaigns/${id}`, data);
  return response.data;
};

export const deleteCampaign = async (id) => {
  const response = await axios.delete(`/api/campaigns/${id}`);
  return response.data;
};
