import axios from '../axiosConfig';

export const getDonations = () => axios.get('/api/donations');

export const createDonation = (data) => axios.post('/api/donations', data);

export const updateDonation = (id, data) => axios.put(`/api/donations/${id}`, data);

export const deleteDonation = (id) => axios.delete(`/api/donations/${id}`);

export const getDonationSummary = () => axios.get('/api/donations/summary');

export const getDonorLeaderboard = () => axios.get('/api/donations/leaderboard');

export const getUserDonations = () => axios.get('/api/donations/my');