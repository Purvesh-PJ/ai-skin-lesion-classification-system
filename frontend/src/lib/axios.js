import axios from 'axios';
import { config } from '../config';

// Create base axios instance with default config
const axiosInstance = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
