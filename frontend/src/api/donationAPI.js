import axios from '../axiosConfig';

const API_BASE_URL = '/api/donations';

export const getDonations = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
};

export const createDonation = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};

export const updateDonation = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating donation:', error);
    throw error;
  }
};

export const deleteDonation = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting donation:', error);
    throw error;
  }
};

export const getDonationSummary = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching donation summary:', error);
    throw error;
  }
};

export const getDonorLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaderboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching donor leaderboard:', error);
    throw error;
  }
};

export const getUserDonations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user donations:', error);
    throw error;
  }
};