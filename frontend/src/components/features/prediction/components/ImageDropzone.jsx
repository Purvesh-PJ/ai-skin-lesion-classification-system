import React from 'react';
import { FiUploadCloud, FiCheck } from 'react-icons/fi';

export const ImageDropzone = ({
  selectedImage,
  activeSample,
  onFileSelect,
  onDrop,
}) => {
  return (
    <div
      onClick={() => document.getElementById('file-input').click()}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`w-full h-[330px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all relative overflow-hidden select-none ${
        selectedImage
          ? 'border-emerald-500 bg-emerald-500/[0.08] dark:bg-emerald-500/[0.08]'
          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0a0a0a] hover:border-emerald-500 hover:bg-emerald-500/[0.04]'
      }`}
    >
      {selectedImage ? (
        <>
          {activeSample && (
            <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 z-10 border border-white/15">
              <FiCheck size={12} className="text-emerald-400" />
              <span>{activeSample.name} ({activeSample.code})</span>
            </div>
          )}
          <img
            src={selectedImage}
            alt="Lesion Preview"
            className="w-full h-full object-contain rounded-xl"
          />
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400 text-center">
          <FiUploadCloud size={40} className="text-emerald-500" />
          <p className="text-[0.95rem] font-semibold text-neutral-900 dark:text-neutral-100 m-0">
            <span className="text-emerald-600 dark:text-emerald-400">Click to upload</span> or drag lesion image
          </p>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            PNG, JPG, or JPEG (Max 10MB)
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
