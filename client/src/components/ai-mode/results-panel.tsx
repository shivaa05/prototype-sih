import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Save, Share2, MessageCircle, Eye, Lightbulb, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { DiseaseDetectionResponse } from "@shared/schema";

interface ResultsPanelProps {
  results: DiseaseDetectionResponse;
  imageUrl: string;
  onReset: () => void;
}

export default function ResultsPanel({ results, imageUrl, onReset }: ResultsPanelProps) {
  const [heatmapVisible, setHeatmapVisible] = useState(false);
  const { toast } = useToast();

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      case 'good':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 80) return 'confidence-high';
    if (confidence > 60) return 'confidence-medium';
    return 'confidence-low';
  };

  const handleSave = () => {
    toast({
      title: "Result Saved",
      description: "Your plant analysis has been saved successfully.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Plant Disease Detection Result',
          text: `My plant was analyzed and diagnosed with ${results.diseaseName} (${results.confidence}% confidence)`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      toast({
        title: "Share Feature",
        description: "Share functionality will be implemented here.",
      });
    }
  };

  const handleAskExpert = () => {
    toast({
      title: "Expert Consultation",
      description: "Connecting you with an agricultural expert...",
    });
  };

  const toggleHeatmap = () => {
    setHeatmapVisible(!heatmapVisible);
  };

  return (
    <motion.div 
      className="animate-slide-in-right"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8 border-t border-border">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Disease Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Detection Results</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                title="Start Over"
                data-testid="button-reset-analysis"
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="bg-muted rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2" data-testid="disease-name">
                    {results.diseaseName}
                  </h4>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <span 
                      className={`font-semibold ${getConfidenceColor(results.confidence)}`}
                      data-testid="confidence-score"
                    >
                      {results.confidence}%
                    </span>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(results.severity)}`}
                      data-testid="severity-tag"
                    >
                      {results.severity}
                    </span>
                  </div>
                </div>
                {results.heatmapUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleHeatmap}
                    data-testid="button-toggle-heatmap"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Heatmap
                  </Button>
                )}
              </div>
              
              <div className="relative" data-testid="image-container">
                <img 
                  src={imageUrl}
                  className="w-full h-48 object-contain rounded-xl bg-background"
                  alt="Analyzed plant image"
                  data-testid="result-image"
                />
                {results.heatmapUrl && (
                  <motion.img
                    src={results.heatmapUrl}
                    className="absolute inset-0 w-full h-48 object-contain rounded-xl"
                    alt="Disease heatmap overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: heatmapVisible ? 0.7 : 0 }}
                    transition={{ duration: 0.5 }}
                    data-testid="heatmap-overlay"
                  />
                )}
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h5 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 text-accent mr-2" />
                Treatment Recommendations
              </h5>
              <ul className="space-y-3" data-testid="recommendations-list">
                {results.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex-shrink-0 lg:w-64">
            <div className="sticky top-8 space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleSave}
                  data-testid="button-save-result"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Result
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="secondary"
                  className="w-full"
                  onClick={handleShare}
                  data-testid="button-share-result"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-accent"
                  onClick={handleAskExpert}
                  data-testid="button-ask-expert"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask Expert
                </Button>
              </motion.div>
              
              {results.confidence < 70 && (
                <div className="pt-4 border-t border-border">
                  <div 
                    className="bg-destructive/10 text-destructive p-4 rounded-xl"
                    data-testid="confidence-warning"
                  >
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium mb-1">Low Confidence</p>
                        <p className="text-xs">Consider taking a clearer photo or consulting an expert.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
