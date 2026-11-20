import axiosInstance from '../../../lib/axios';
import { API_ENDPOINTS } from '../../../constants';

export const healthService = {
  checkHealth: async () => {
    return axiosInstance.get(API_ENDPOINTS.HEALTH, {
      timeout: 10000,
    });
  },
};

export default healthService;
