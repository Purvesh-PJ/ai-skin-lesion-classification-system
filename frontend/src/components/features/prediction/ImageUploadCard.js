import React, { useState, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { Spinner, Button } from '../../ui';
import { usePrediction } from '../../../hooks';
import { ImageDropzone } from './components';

export const ImageUploadCard = ({
  selectedImage,
  setSelectedImage,
  imageFile,
  setImageFile,
  setPredictionResult,
  activeSample,
  setActiveSample,
  loading,
  setLoading,
  setError,
}) => {
  const { predict } = usePrediction();
  const [coldStartNotice, setColdStartNotice] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setColdStartNotice(true);
      }, 3500);
    } else {
      setColdStartNotice(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
      if (setActiveSample) setActiveSample(null);
      setPredictionResult(null);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
      if (setActiveSample) setActiveSample(null);
      setPredictionResult(null);
      setError(null);
    }
  };

  const handleUploadClick = async () => {
    if (!imageFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await predict(formData);
      if (response?.data) {
        setPredictionResult(response.data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImageFile(null);
    if (setActiveSample) setActiveSample(null);
    setPredictionResult(null);
    setError(null);
    setColdStartNotice(false);
  };

  return (
    <div className="w-full max-w-[560px] flex flex-col items-center justify-center gap-3">
      <ImageDropzone
        selectedImage={selectedImage}
        activeSample={activeSample}
        onDrop={handleDrop}
      />

      <input
        type="file"
        id="file-input"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {coldStartNotice && (
        <div className="w-full p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 animate-in fade-in">
          <FiAlertCircle size={15} className="shrink-0 animate-pulse text-amber-500" />
          <span>Free-tier cloud backend is waking up from idle (~15-20s). Please wait...</span>
        </div>
      )}

      <div className="flex items-center gap-3 w-full">
        {selectedImage && (
          <Button
            variant="outline"
            size="md"
            onClick={handleClear}
            disabled={loading}
            className="flex-1"
          >
            Clear
          </Button>
        )}

        <Button
          variant="brand"
          size="md"
          onClick={handleUploadClick}
          disabled={!imageFile || loading}
          className="flex-1"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>Analyzing Scan...</span>
            </div>
          ) : (
            'Run Ensemble Analysis'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadCard;
