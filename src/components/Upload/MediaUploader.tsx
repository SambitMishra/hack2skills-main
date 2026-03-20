import { useState, useRef } from 'react';

interface Props {
  onFileChange: (file: File) => void;
}

export function MediaUploader({ onFileChange }: Props) {
  const [error, setError] = useState<string>('');
  const [previewName, setPreviewName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'video/mp4', 'image/webp'];

  const handleFile = (file?: File | null) => {
    if (!file) return;
    
    if (!SUPPORTED_TYPES.includes(file.type)) {
      setError('Unsupported file format. Please upload JPG, PNG, WEBP, or MP4.');
      setPreviewName('');
      return;
    }

    setError('');
    setPreviewName(file.name);
    onFileChange(file);
  };

  return (
    <div 
      className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
      aria-label="Upload area"
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFile(e.target.files?.[0])}
        accept="image/jpeg,image/png,image/webp,video/mp4"
        aria-label="Upload file"
      />
      
      {previewName ? (
        <p className="text-lg font-medium text-green-600 truncate">{previewName}</p>
      ) : (
        <div>
          <p className="text-lg text-gray-700">Drag and drop your media here</p>
          <p className="text-sm text-gray-500 mt-2">or click to browse</p>
        </div>
      )}
      
      {error && (
        <div role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
