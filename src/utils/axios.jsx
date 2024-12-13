import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080'|| 'https://food-recipe-backend-fug8.onrender.com',
  withCredentials:true,

});

export default axiosInstance;
// 