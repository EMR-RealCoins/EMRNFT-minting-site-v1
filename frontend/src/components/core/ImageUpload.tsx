'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
}

export default function ImageUpload({ onImageSelect, selectedImage }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    onImageSelect(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onImageSelect(null as unknown as File);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Coin Image *
      </label>
      
      {previewUrl ? (
        <Card className="border-2 border-dashed border-green-400 bg-green-50">
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-64 object-contain rounded-lg shadow-md"
                />
              </div>
              <div>
                <p className="text-sm text-green-800 font-semibold">
                  {selectedImage?.name}
                </p>
                <p className="text-xs text-green-700">
                  ({selectedImage && (selectedImage.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
              <Button
                onClick={removeImage}
                variant="destructive"
                size="sm"
                className="mt-2"
              >
                Remove Image
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed transition-all duration-300 cursor-pointer group ${
            dragActive
              ? 'border-[#D4AF37] bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]'
              : 'border-gray-300 hover:border-[#0A1F44]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto transition-all duration-300">
                <svg className="w-8 h-8 text-gray-400 group-hover:text-[#0A1F44] transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold text-[#0A1F44]">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, JPEG, WebP (max 10MB)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}
