import axios from '../axiosConfig';

export const registerUser = (data) => axios.post('/api/auth/register', data);

export const loginUser = (data) => axios.post('/api/auth/login', data);

export const getProfile = () => axios.get('/api/auth/profile');

export const updateProfile = (data) => axios.put('/api/auth/profile', data);
