import { motion } from "framer-motion";
import { RotateCw, Crop, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  imageUrl: string;
  onAnalyze: () => void;
  onBack: () => void;
}

export default function ImagePreview({ imageUrl, onAnalyze, onBack }: ImagePreviewProps) {
  const handleRotate = () => {
    // TODO: Implement image rotation functionality
    console.log('Rotating image...');
  };

  const handleCrop = () => {
    // TODO: Implement image cropping functionality
    console.log('Cropping image...');
  };

  return (
    <motion.div 
      className="p-8 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mr-4"
          data-testid="button-back-to-upload"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h3 className="text-xl font-semibold text-foreground">Review Your Image</h3>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-foreground mb-4">Image Preview</h4>
          <div className="bg-muted rounded-2xl p-4">
            <img 
              src={imageUrl} 
              className="w-full h-64 object-contain rounded-xl" 
              alt="Uploaded plant image"
              data-testid="preview-image"
            />
          </div>
        </div>
        
        <div className="flex-shrink-0 lg:w-64">
          <h4 className="text-lg font-semibold text-foreground mb-4">Adjust Image</h4>
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline"
                className="w-full justify-start"
                onClick={handleRotate}
                data-testid="button-rotate-image"
              >
                <RotateCw className="w-5 h-5 mr-2" />
                Rotate
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline"
                className="w-full justify-start"
                onClick={handleCrop}
                data-testid="button-crop-image"
              >
                <Crop className="w-5 h-5 mr-2" />
                Crop
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={onAnalyze}
                data-testid="button-analyze-image"
              >
                <Zap className="w-5 h-5 mr-2" />
                Analyze
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
