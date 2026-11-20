import { useState, useCallback } from 'react';
import predictionService from '../api/prediction.service';

export const usePrediction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictionService.predict(formData);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { predict, loading, error };
};

export default usePrediction;
