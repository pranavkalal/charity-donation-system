import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // NGINX will forward /api to http://localhost:5002
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

