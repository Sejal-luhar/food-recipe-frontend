import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://food-recipe-backend-fug8.onrender.com',
  withCredentials:true,

});

export default axiosInstance;
