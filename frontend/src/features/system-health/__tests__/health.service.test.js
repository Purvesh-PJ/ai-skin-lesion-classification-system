import { vi } from 'vitest';
import { healthService } from '../index';
import axiosInstance from '../../../lib/axios';

vi.mock('../../../lib/axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('healthService Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls /health endpoint with 10s timeout', async () => {
    const mockResponse = { data: { status: 'healthy', database: 'connected' } };
    axiosInstance.get.mockResolvedValueOnce(mockResponse);

    const result = await healthService.checkHealth();

    expect(axiosInstance.get).toHaveBeenCalledWith('/health', { timeout: 10000 });
    expect(result.data.status).toBe('healthy');
  });

  test('handles health check error', async () => {
    axiosInstance.get.mockRejectedValueOnce(new Error('Backend offline'));

    await expect(healthService.checkHealth()).rejects.toThrow('Backend offline');
  });
});
