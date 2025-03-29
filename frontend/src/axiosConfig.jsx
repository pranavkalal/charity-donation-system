import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.206.62.117:5002', // local
  //baseURL: 'http://54.206.62.117:5002', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
