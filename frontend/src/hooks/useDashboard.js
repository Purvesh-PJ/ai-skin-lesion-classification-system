import { useState, useCallback } from 'react';
import { historyService } from '../services';
import { urlToFile } from '../lib/file.utils';

export const useDashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [activeSample, setActiveSample] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('analysis');
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  const [userUpdateKey, setUserUpdateKey] = useState(0);

  const localRecords = historyService.getLocalRecords();
  const hasScans = Boolean(predictionResult || (localRecords && localRecords.length > 0));

  const handlePredictionSuccess = useCallback((result) => {
    setPredictionResult(result);
    historyService.recordScan(result);
    setActiveTab('analysis');
    setHistoryRefreshKey((prev) => prev + 1);
  }, []);

  const handleUserUpdated = useCallback(() => {
    setUserUpdateKey((prev) => prev + 1);
  }, []);

  const handleSelectSample = useCallback(async (sample) => {
    if (loading) return;
    setActiveSample(sample);
    setSelectedImage(sample.imagePath);
    setError(null);
    setPredictionResult(null);

    try {
      const file = await urlToFile(sample.imagePath, sample.fileName);
      setImageFile(file);
    } catch (err) {
      console.error('Failed to convert sample image:', err);
    }
  }, [loading]);

  return {
    state: {
      selectedImage,
      imageFile,
      activeSample,
      predictionResult,
      loading,
      error,
      activeTab,
      historyRefreshKey,
      userUpdateKey,
      hasScans,
    },
    actions: {
      setSelectedImage,
      setImageFile,
      setActiveSample,
      setLoading,
      setError,
      setActiveTab,
      handlePredictionSuccess,
      handleUserUpdated,
      handleSelectSample,
    },
  };
};

export default useDashboard;
