import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://food-recipe-backend-fug8.onrender.com',
  withCredentials:true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if stored
  },
});

export default axiosInstance;
