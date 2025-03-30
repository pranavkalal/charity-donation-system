import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.206.62.117:5002', // Only the domain + port
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
