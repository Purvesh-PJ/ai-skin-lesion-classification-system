/**
 * Utilities for image ingestion, blob conversion, and canvas fallback
 */

export const urlToFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      if (blob.type && blob.type.startsWith('image/')) {
        return new File([blob], filename, { type: blob.type });
      }
    }
  } catch (e) {
    console.warn('Canvas fallback triggered for sample image');
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 400;
      canvas.height = img.naturalHeight || 300;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(new File([blob], filename, { type: 'image/jpeg' }));
        } else {
          reject(new Error('Canvas conversion error'));
        }
      }, 'image/jpeg', 0.9);
    };
    img.onerror = () => reject(new Error('Sample image failed to load'));
    img.src = url;
  });
};

export const isValidImageFile = (file) => {
  if (!file) return false;
  return file.type && file.type.startsWith('image/');
};
