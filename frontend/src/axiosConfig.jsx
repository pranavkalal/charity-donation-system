import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Only the domain + port
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const token = userData?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
