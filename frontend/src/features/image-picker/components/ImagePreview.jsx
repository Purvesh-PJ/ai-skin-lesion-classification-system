import React from 'react';
import { FiCheck } from 'react-icons/fi';

export const ImagePreview = ({ selectedImage, activeSample, onClick, onDrop }) => {
  return (
    <div
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full h-[330px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all relative overflow-hidden select-none border-emerald-500 bg-emerald-500/[0.08] dark:bg-emerald-500/[0.08]"
    >
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
    </div>
  );
};

export default ImagePreview;
