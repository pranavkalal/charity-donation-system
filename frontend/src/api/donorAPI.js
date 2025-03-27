import axios from '../axiosConfig';

export const getDonors = () => axios.get('/api/donors');

export const createDonor = (data) => axios.post('/api/donors', data);

export const updateDonor = (id, data) => axios.put(`/api/donors/${id}`, data);

export const deleteDonor = (id) => axios.delete(`/api/donors/${id}`);
