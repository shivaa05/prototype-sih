import { useCallback } from "react";
import { motion } from "framer-motion";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";

interface ImageUploadProps {
  onImageSelected: (imageUrl: string) => void;
}

export default function ImageUpload({ onImageSelected }: ImageUploadProps) {
  const { handleFileSelect, triggerFileUpload, isDragActive, fileInputRef } = useFileUpload({
    onFileSelected: onImageSelected,
    accept: "image/*"
  });

  const handleCameraCapture = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  return (
    <motion.div 
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div 
        className={`upload-area border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary hover:bg-primary/5'
        }`}
        onClick={triggerFileUpload}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDrop={handleFileSelect}
        data-testid="upload-drop-zone"
      >
        <motion.div 
          className="mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Camera className="w-16 h-16 text-muted-foreground mx-auto" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Upload Plant Image</h3>
        <p className="text-muted-foreground mb-6">
          Drag and drop an image or click to browse
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 font-semibold"
              data-testid="button-choose-file"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose File
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="secondary"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                handleCameraCapture();
              }}
              data-testid="button-take-photo"
            >
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </Button>
          </motion.div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          data-testid="file-input"
        />
      </div>
    </motion.div>
  );
}
