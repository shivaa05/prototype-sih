import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ImageUpload from "@/components/ai-mode/image-upload";
import ImagePreview from "@/components/ai-mode/image-preview";
import ProcessingState from "@/components/ai-mode/processing-state";
import ResultsPanel from "@/components/ai-mode/results-panel";
import type { DiseaseDetectionResponse } from "@shared/schema";

type AIStage = 'upload' | 'preview' | 'processing' | 'results';

export default function AIMode() {
  const [stage, setStage] = useState<AIStage>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [results, setResults] = useState<DiseaseDetectionResponse | null>(null);

  const handleImageSelected = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setStage('preview');
  };

  const handleAnalyze = () => {
    setStage('processing');
  };

  const handleResultsReady = (detectionResults: DiseaseDetectionResponse) => {
    setResults(detectionResults);
    setStage('results');
  };

  const handleReset = () => {
    setStage('upload');
    setSelectedImage(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              AI-Powered Disease Detection
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload a photo of your plant and get instant disease diagnosis with treatment recommendations
            </p>
          </motion.div>
          
          <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
            {stage === 'upload' && (
              <ImageUpload 
                onImageSelected={handleImageSelected}
                data-testid="image-upload-section"
              />
            )}
            
            {stage === 'preview' && selectedImage && (
              <ImagePreview 
                imageUrl={selectedImage}
                onAnalyze={handleAnalyze}
                onBack={() => setStage('upload')}
                data-testid="image-preview-section"
              />
            )}
            
            {stage === 'processing' && (
              <ProcessingState 
                onComplete={handleResultsReady}
                data-testid="processing-section"
              />
            )}
            
            {stage === 'results' && results && selectedImage && (
              <ResultsPanel 
                results={results}
                imageUrl={selectedImage}
                onReset={handleReset}
                data-testid="results-section"
              />
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
