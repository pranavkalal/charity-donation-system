import axios from '../axiosConfig';

export const getCampaigns = () => axios.get('/api/campaigns');

export const createCampaign = (data) => axios.post('/api/campaigns', data);

export const updateCampaign = (id, data) => axios.put(`/api/campaigns/${id}`, data);

export const deleteCampaign = (id) => axios.delete(`/api/campaigns/${id}`);
