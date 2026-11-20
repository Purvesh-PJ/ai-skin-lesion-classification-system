import { predictionService } from '../../features/prediction';
import axiosInstance from '../../lib/axios';

jest.mock('../../lib/axios', () => ({
  post: jest.fn(),
}));

describe('predictionService Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls /predict with FormData and multipart header', async () => {
    const mockResponse = {
      data: {
        predicted_disease: 'nv',
        confidence: '91',
        filename: 'test.jpg',
      },
    };
    axiosInstance.post.mockResolvedValueOnce(mockResponse);

    const formData = new FormData();
    formData.append('image', new Blob(['fake image content']), 'test.jpg');

    const result = await predictionService.predict(formData);

    expect(axiosInstance.post).toHaveBeenCalledTimes(1);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      '/predict',
      formData,
      expect.objectContaining({
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000,
      })
    );
    expect(result.data.predicted_disease).toBe('nv');
  });

  test('propagates rejection on API error when retries exhausted', async () => {
    const networkError = new Error('Network Error');
    axiosInstance.post.mockRejectedValue(networkError);

    const formData = new FormData();

    await expect(predictionService.predict(formData, 0, 0)).rejects.toThrow('Network Error');
    expect(axiosInstance.post).toHaveBeenCalledTimes(3); // 1 initial + 2 retries
  });
});

