import axiosInstance from '../../../services/api/axios';
import { API_ENDPOINTS } from '../../../constants';

export const predictionService = {
  /**
   * Uploads an image for multi-model ensemble classification.
   * Includes automatic retry on transient cold-start network dropouts.
   */
  async predict(imageData, retryCount = 0, retryDelay = 2000) {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.PREDICT, imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000,
      });
      return response;
    } catch (err) {
      const isNetworkDropout =
        !err.response &&
        (err.message === 'Network Error' ||
          err.code === 'ECONNABORTED' ||
          err.code === 'ERR_NETWORK');

      // If dropped during container wake-up, retry up to 2 times after brief pause
      if (isNetworkDropout && retryCount < 2) {
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return predictionService.predict(imageData, retryCount + 1, retryDelay);
      }
      throw err;
    }
  },
};

export default predictionService;
