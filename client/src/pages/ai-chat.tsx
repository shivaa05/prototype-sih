import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Upload, Camera, Loader2, Leaf, Bot, User } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useFileUpload } from "@/hooks/use-file-upload";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type: "text" | "image" | "analysis";
  metadata?: {
    diseaseName?: string;
    confidence?: number;
    severity?: string;
    recommendations?: string[];
    imageUrl?: string;
  };
}

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hello! I'm your AI farming assistant. I can help you with:\n\n🌱 **Plant Disease Detection** - Upload photos of your crops\n🌾 **Crop Advisory** - Get planting and care recommendations\n🌤️ **Weather Insights** - Farming tips based on weather\n📊 **Market Guidance** - Best times to sell your produce\n\nHow can I help you today?",
  timestamp: new Date(),
  type: "text"
};

const mockDiseaseResponses = [
  {
    diseaseName: "Early Blight",
    confidence: 87,
    severity: "Medium",
    recommendations: [
      "Apply copper-based fungicide spray every 7-10 days",
      "Improve air circulation around plants", 
      "Remove affected leaves and destroy them",
      "Avoid overhead watering to reduce humidity"
    ]
  },
  {
    diseaseName: "Healthy Plant",
    confidence: 95,
    severity: "Good",
    recommendations: [
      "Continue current care routine",
      "Maintain proper watering schedule",
      "Apply balanced fertilizer monthly",
      "Monitor for any early signs of stress"
    ]
  },
  {
    diseaseName: "Leaf Spot Disease",
    confidence: 92,
    severity: "High", 
    recommendations: [
      "Immediate application of systemic fungicide",
      "Remove all infected plant parts immediately",
      "Increase spacing between plants for better airflow",
      "Monitor daily for further spread"
    ]
  }
];

export default function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleFileSelect, triggerFileUpload } = useFileUpload({
    onFileSelected: handleImageUpload,
    accept: "image/*"
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleImageUpload(imageUrl: string) {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: "I've uploaded an image of my plant. Can you analyze it for diseases?",
      timestamp: new Date(),
      type: "image",
      metadata: { imageUrl }
    };

    setMessages(prev => [...prev, userMessage]);
    processImageAnalysis(imageUrl);
  }

  async function processImageAnalysis(imageUrl: string) {
    setIsTyping(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const randomResponse = mockDiseaseResponses[Math.floor(Math.random() * mockDiseaseResponses.length)];
    
    const analysisMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant", 
      content: `I've analyzed your plant image. Here's what I found:`,
      timestamp: new Date(),
      type: "analysis",
      metadata: {
        ...randomResponse,
        imageUrl
      }
    };

    const followUpMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `Would you like me to:\n\n🔍 **Provide more details** about this condition\n🛒 **Find treatments** available nearby\n📞 **Connect you** with agricultural experts\n📱 **Send reminders** for treatment schedule\n\nJust let me know how else I can help!`,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, analysisMessage, followUpMessage]);
    setIsTyping(false);
  }

  async function handleSendMessage() {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = [
      "That's a great question! Based on your location and current season, I'd recommend checking soil moisture levels first. Most crops need consistent but not waterlogged conditions.",
      "For that specific crop, you should consider the local climate conditions. I can provide more detailed guidance if you share your location or upload a photo.",
      "Excellent choice! That variety grows well in Indian conditions. Make sure to plant after the monsoon season for best results.",
      "I'd be happy to help with that! For better assistance, could you share more details about your farm size, soil type, or specific challenges you're facing?",
      "That sounds like a common issue many farmers face. The key is timing and proper application. Would you like me to create a detailed action plan for you?"
    ];

    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  }

  function handleCameraCapture() {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  }

  function getSeverityBadgeColor(severity: string) {
    switch (severity?.toLowerCase()) {
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
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="py-6 text-center border-b border-border"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            AI Farming Assistant
          </h1>
          <p className="text-muted-foreground">
            Get instant help with plant diseases, crop care, and farming guidance
          </p>
        </motion.div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                  {/* Avatar */}
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className={message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}>
                      {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl p-4 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border border-border'
                  }`}>
                    {/* Image Display */}
                    {message.metadata?.imageUrl && (
                      <div className="mb-3">
                        <img 
                          src={message.metadata.imageUrl}
                          alt="Uploaded plant"
                          className="rounded-lg max-w-sm w-full h-48 object-cover"
                        />
                      </div>
                    )}

                    {/* Analysis Results */}
                    {message.type === 'analysis' && message.metadata && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-lg">{message.metadata.diseaseName}</h4>
                          <Badge className={getSeverityBadgeColor(message.metadata.severity || '')}>
                            {message.metadata.severity}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-sm text-muted-foreground">Confidence:</span>
                          <span className="font-semibold">{message.metadata.confidence}%</span>
                        </div>

                        {message.metadata.recommendations && (
                          <div>
                            <h5 className="font-medium mb-2 flex items-center">
                              <Leaf className="w-4 h-4 text-green-600 mr-2" />
                              Treatment Recommendations:
                            </h5>
                            <ul className="space-y-1">
                              {message.metadata.recommendations.map((rec, index) => (
                                <li key={index} className="text-sm flex items-start">
                                  <span className="text-green-600 mr-2">•</span>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message Content */}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>

                    {/* Timestamp */}
                    <div className={`text-xs mt-2 ${
                      message.role === 'user' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3 max-w-[80%]">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <motion.div 
          className="border-t border-border p-4 bg-card/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-end space-x-3">
            {/* File Upload Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={triggerFileUpload}
                className="p-2"
                data-testid="button-upload-image"
              >
                <Upload className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCameraCapture}
                className="p-2"
                data-testid="button-camera"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* Text Input */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Ask about plant diseases, crop care, weather, or farming tips..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="min-h-[44px] resize-none"
                disabled={isTyping}
                data-testid="chat-input"
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3"
              data-testid="button-send"
            >
              {isTyping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            data-testid="file-input"
          />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}