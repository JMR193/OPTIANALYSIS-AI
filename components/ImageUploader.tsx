import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imageUrl: string | null;
  imageFile: File | null;
  analysisType: 'image' | 'report';
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imageUrl, imageFile, analysisType }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex justify-center items-center w-full h-64 px-4 transition bg-white border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} border-dashed rounded-xl cursor-pointer hover:border-blue-400`}
      >
        {imageUrl ? (
          <div className="relative w-full h-full p-2">
             <img src={imageUrl} alt="Uploaded content" className="object-contain w-full h-full rounded-lg" />
          </div>
        ) : imageFile ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
             <p className="mt-2 font-semibold">{imageFile.name}</p>
             <p className="text-sm text-gray-500">{((imageFile.size || 0) / 1024).toFixed(2)} KB</p>
             <p className="text-xs text-gray-500 mt-4">Click to select a different file</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2 text-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">Drag & Drop file</h2>
            <p className="text-sm text-gray-500">
              {analysisType === 'image' ? 'Upload a clear photo of an eye' : 'Upload a PDF or image of a report'}
            </p>
          </div>
        )}
        <input type="file" id="file-upload" className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default ImageUploader;
