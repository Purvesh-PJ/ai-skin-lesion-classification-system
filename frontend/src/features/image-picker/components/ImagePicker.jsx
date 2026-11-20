import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import Button from '../../../components/ui/Button';
import Spinner from '../../../components/ui/Spinner';
import DropZone from './DropZone';
import ImagePreview from './ImagePreview';

export const ImagePicker = ({
  selectedImage,
  imageFile,
  activeSample,
  loading,
  coldStartNotice,
  onImageSelected,
  onClear,
  onAnalyze,
}) => {
  const fileInputRef = React.useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type && file.type.startsWith('image/')) {
      onImageSelected(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  const handleTriggerInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-[560px] flex flex-col items-center justify-center gap-3">
      {selectedImage ? (
        <ImagePreview
          selectedImage={selectedImage}
          activeSample={activeSample}
          onClick={handleTriggerInput}
          onDrop={handleDrop}
        />
      ) : (
        <DropZone onClick={handleTriggerInput} onDrop={handleDrop} />
      )}

      <input
        ref={fileInputRef}
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
            onClick={onClear}
            disabled={loading}
            className="flex-1"
          >
            Clear
          </Button>
        )}

        <Button
          variant="brand"
          size="md"
          onClick={onAnalyze}
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

export default ImagePicker;
