import { useState, useCallback } from 'react';
import { urlToFile, isValidImageFile } from '../utils/file.utils';

export const useImagePicker = ({ onImageChange } = {}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [activeSample, setActiveSample] = useState(null);

  const selectFile = useCallback((file) => {
    if (!isValidImageFile(file)) return;
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);
    setImageFile(file);
    setActiveSample(null);
    if (onImageChange) onImageChange(file);
  }, [onImageChange]);

  const selectSample = useCallback(async (sample) => {
    setActiveSample(sample);
    setSelectedImage(sample.imagePath);

    try {
      const file = await urlToFile(sample.imagePath, sample.fileName);
      setImageFile(file);
      if (onImageChange) onImageChange(file);
    } catch (err) {
      console.error('Failed to convert sample image to file:', err);
    }
  }, [onImageChange]);

  const clear = useCallback(() => {
    setSelectedImage(null);
    setImageFile(null);
    setActiveSample(null);
  }, []);

  return {
    selectedImage,
    setSelectedImage,
    imageFile,
    setImageFile,
    activeSample,
    setActiveSample,
    selectFile,
    selectSample,
    clear,
  };
};

export default useImagePicker;
