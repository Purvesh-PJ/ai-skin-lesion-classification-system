import axiosInstance from './axios';
import { API_ENDPOINTS } from '../../constants';

export const healthService = {
  /**
   * Pings the backend health endpoint.
   * Resolves true if online, false if unreachable or waking up.
   */
  async checkHealth() {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.HEALTH, {
        timeout: 10000,
      });
      return response?.data?.status === 'online';
    } catch {
      return false;
    }
  },
};

export default healthService;
