import { useRef, useState, useCallback } from "react";

interface UseFileUploadOptions {
  onFileSelected: (imageUrl: string) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function useFileUpload({ 
  onFileSelected, 
  accept = "*", 
  maxSizeMB = 10 
}: UseFileUploadOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onFileSelected(result);
      }
    };
    reader.readAsDataURL(file);
  }, [onFileSelected, maxSizeMB]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);

    let files: FileList | null = null;
    
    if ('dataTransfer' in e) {
      files = e.dataTransfer.files;
    } else if ('target' in e && e.target) {
      files = (e.target as HTMLInputElement).files;
    }

    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  return {
    fileInputRef,
    isDragActive,
    handleFileSelect,
    triggerFileUpload,
    handleDragOver,
    handleDragLeave,
  };
}
