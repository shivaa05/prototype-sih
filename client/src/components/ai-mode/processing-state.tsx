import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { mockDetectDisease } from "@/lib/mock-api";
import type { DiseaseDetectionResponse } from "@shared/schema";

interface ProcessingStateProps {
  onComplete: (results: DiseaseDetectionResponse) => void;
}

export default function ProcessingState({ onComplete }: ProcessingStateProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Analyzing image");

  useEffect(() => {
    const statusMessages = [
      "Analyzing image structure",
      "Detecting plant features",
      "Identifying potential diseases",
      "Calculating confidence scores",
      "Generating recommendations"
    ];

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15 + 5; // Random increment between 5-20
        const newProgress = Math.min(prev + increment, 100);
        
        // Update status message based on progress
        const messageIndex = Math.floor((newProgress / 100) * (statusMessages.length - 1));
        setStatusText(statusMessages[messageIndex] || statusMessages[0]);
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(async () => {
            const results = await mockDetectDisease();
            onComplete(results);
          }, 1000);
        }
        
        return newProgress;
      });
    }, 300);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <motion.div 
      className="p-8 border-t border-border text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      data-testid="processing-state"
    >
      <motion.div 
        className="mb-6"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Leaf className="w-16 h-16 text-primary mx-auto" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">Analyzing Your Plant</h3>
      <div className="flex items-center justify-center mb-6">
        <p className="text-muted-foreground">{statusText}</p>
        <motion.span
          className="ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ...
        </motion.span>
      </div>
      
      <div className="max-w-md mx-auto">
        <div className="bg-muted rounded-full h-2 mb-2">
          <motion.div 
            className="bg-primary h-2 rounded-full"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            transition={{ duration: 0.5 }}
            data-testid="progress-bar"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          <span data-testid="progress-text">{Math.round(progress)}%</span> Complete
        </p>
      </div>
    </motion.div>
  );
}
