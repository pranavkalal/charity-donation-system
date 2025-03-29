// frontend/src/api/userAPI.js
import axios from 'axios';

const BASE_URL = '/api/users';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getUserById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data, getAuthHeaders());
  return response.data;
};
