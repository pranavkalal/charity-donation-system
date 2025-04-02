import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Only the domain + port
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
