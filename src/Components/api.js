// api.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-ccxzlbq19-anmol-sharmas-projects-0ab94a1a.vercel.app/api/v1/', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
