import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://online-learning-backend-683d.onrender.com',
  withCredentials:true
});

export default axiosInstance;
