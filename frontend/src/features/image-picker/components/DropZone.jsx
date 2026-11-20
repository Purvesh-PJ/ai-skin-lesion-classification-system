import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';

export const DropZone = ({ onDrop, onClick }) => {
  return (
    <div
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full h-[330px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all relative overflow-hidden select-none border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0a0a0a] hover:border-emerald-500 hover:bg-emerald-500/[0.04]"
    >
      <div className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400 text-center">
        <FiUploadCloud size={40} className="text-emerald-500" />
        <p className="text-[0.95rem] font-semibold text-neutral-900 dark:text-neutral-100 m-0">
          <span className="text-emerald-600 dark:text-emerald-400">Click to upload</span> or drag lesion image
        </p>
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          PNG, JPG, or JPEG (Max 10MB)
        </span>
      </div>
    </div>
  );
};

export default DropZone;
