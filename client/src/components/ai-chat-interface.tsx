import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image, Camera, Loader2, User, Bot, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";
import { useFileUpload } from "@/hooks/use-file-upload";
import type { DiseaseDetectionResponse } from "@shared/schema";
import { IoMicOutline } from "react-icons/io5";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content?: string;
  image?: string;
  diseaseResult?: DiseaseDetectionResponse;
  timestamp: Date;
  isTyping?: boolean;
}

const welcomeMessages = {
  en: {
    title: "🌱 Your AI Farming Assistant",
    subtitle: "I can help you with plant diseases, farming advice, and more!",
    examples: [
      "📸 Upload a plant photo to check for diseases",
      "🌾 Ask about crop care and farming tips",
      "🌤️ Get weather-based farming advice",
      "💰 Learn about market prices and selling"
    ]
  },
  ml: {
    title: "🌱 നിങ്ങളുടെ AI കാർഷിക സഹായി",
    subtitle: "ചെടിയുടെ രോഗങ്ങൾ, കാർഷിക ഉപദേശം എന്നിവയിൽ ഞാൻ സഹായിക്കും!",
    examples: [
      "📸 രോഗങ്ങൾ പരിശോധിക്കാൻ ചെടിയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക",
      "🌾 വിള സംരക്ഷണവും കാർഷിക നുറുങ്ങുകളും ചോദിക്കുക",
      "🌤️ കാലാവസ്ഥ അടിസ്ഥാനമാക്കിയുള്ള കാർഷിക ഉപദേശം നേടുക",
      "💰 വിപണി വിലകളെയും വിൽപ്പനയെയും കുറിച്ച് അറിയുക"
    ]
  }
};

// Mock responses for demonstration
const mockTextResponses = {
  en: [
    "That's a great question! For healthy plant growth, make sure you provide adequate water, sunlight, and nutrients. What specific crop are you working with?",
    "Based on current weather conditions, I'd recommend adjusting your irrigation schedule. Would you like specific tips for your region?",
    "Market prices for crops vary by season and location. I can help you find the best time to sell your harvest for maximum profit.",
    "For organic farming, focus on soil health, natural pest control, and crop rotation. What aspects interest you most?"
  ],
  ml: [
    "അത് വളരെ നല്ല ചോദ്യമാണ്! ആരോഗ്യകരമായ സസ്യവളർച്ചയ്ക്ക്, മതിയായ വെള്ളം, സൂര്യപ്രകാശം, പോഷകങ്ങൾ എന്നിവ നൽകുന്നത് ഉറപ്പാക്കുക. നിങ്ങൾ ഏത് വിളയാണ് കൃഷി ചെയ്യുന്നത്?",
    "നിലവിലെ കാലാവസ്ഥയെ അടിസ്ഥാനമാക്കി, നിങ്ങളുടെ ജലസേചന ഷെഡ്യൂൾ ക്രമീകരിക്കാൻ ഞാൻ ശുപാർശ ചെയ്യുന്നു. നിങ്ങളുടെ പ്രദേശത്തിന് പ്രത്യേക നുറുങ്ങുകൾ വേണോ?",
    "വിളകളുടെ വിപണി വില സീസണും സ്ഥലവും അനുസരിച്ച് വ്യത്യാസപ്പെടുന്നു. പരമാവധി ലാഭത്തിനായി വിളവെടുപ്പ് എപ്പോൾ വിൽക്കണമെന്ന് കണ്ടെത്താൻ എനിക്ക് സഹായിക്കാം.",
    "ജൈവകൃഷിക്ക്, മണ്ണിന്റെ ആരോഗ്യം, പ്രകൃതിദത്ത കീടനിയന്ത്രണം, വിള പ്രാവർത്തനം എന്നിവയിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുക. ഏതെല്ലാം വശങ്ങളാണ് നിങ്ങൾക്ക് കൂടുതൽ താൽപ്പര്യമുള്ളത്?"
  ]
};

export default function AiChatInterface() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
      type: 'user',
      image: imageUrl,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsAnalyzing(true);

    // Simulate AI disease detection
    setTimeout(async () => {
      try {
        const mockResult: DiseaseDetectionResponse = {
          diseaseName: Math.random() > 0.5 ? "Early Blight" : "Healthy Plant",
          confidence: Math.floor(Math.random() * 20 + 80),
          severity: Math.random() > 0.5 ? "Medium" : "Low",
          recommendations: [
            language === 'ml' 
              ? "കോപ്പർ അടിസ്ഥാനമാക്കിയുള്ള ഫംഗിസൈഡ് സ്പ്രേ ചെയ്യുക"
              : "Apply copper-based fungicide spray",
            language === 'ml'
              ? "ബാധിച്ച ഇലകൾ നീക്കം ചെയ്യുക"
              : "Remove affected leaves",
            language === 'ml'
              ? "ചെടികൾക്കിടയിൽ വായു സഞ്ചാരം മെച്ചപ്പെടുത്തുക"
              : "Improve air circulation"
          ]
        };

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          diseaseResult: mockResult,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Disease detection failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    }, 2000);
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = mockTextResponses[language];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const welcomeContent = welcomeMessages[language];

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className={`text-xl font-bold text-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {welcomeContent.title}
            </h1>
            <p className={`text-sm text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {welcomeContent.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="chat-messages">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 mt-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {welcomeContent.examples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-muted/50 rounded-xl border border-border cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => {
                    if (example.includes('📸')) {
                      triggerFileUpload();
                    } else {
                      setInputMessage(example.replace('🌾 ', '').replace('🌤️ ', '').replace('💰 ', ''));
                    }
                  }}
                  data-testid={`example-${index}`}
                >
                  <p className={`text-sm text-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {example}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {message.type === 'assistant' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">AI Assistant</span>
                  </div>
                )}
                
                {message.type === 'user' && (
                  <div className="flex items-center space-x-2 mb-2 justify-end">
                    <span className="text-xs text-muted-foreground">You</span>
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  </div>
                )}

                <Card className={`${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card'
                }`}>
                  <CardContent className="p-4">
                    {message.image && (
                      <img 
                        src={message.image} 
                        alt="Uploaded plant" 
                        className="w-full h-48 object-cover rounded-lg mb-3"
                        data-testid="uploaded-image"
                      />
                    )}
                    
                    {message.content && (
                      <p className={`${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {message.content}
                      </p>
                    )}

                    {message.diseaseResult && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(message.diseaseResult.severity)}>
                            {message.diseaseResult.diseaseName}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {message.diseaseResult.confidence}% {t('detect.confidence')}
                          </span>
                        </div>
                        
                        <div>
                          <h4 className={`font-semibold mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                            {t('detect.treatment')}:
                          </h4>
                          <ul className="space-y-1">
                            {message.diseaseResult.recommendations.map((rec, index) => (
                              <li key={index} className={`text-sm flex items-start space-x-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                                <span className="text-primary mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {(isTyping || isAnalyzing) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">AI Assistant</span>
            </div>
            <Card className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {isAnalyzing ? t('detect.analyzing') : t('status.loading')}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-muted/30">
        <div className="flex items-center space-x-2">
          <span
            className="border-[1px] p-2 rounded-full hover:bg-green-400"
            onClick={triggerFileUpload}
          >
            <Camera className="w-5 h-5" />
          </span>
          <span className="border-[1px] p-2 rounded-full hover:bg-green-400">
            <IoMicOutline className="w-5 h-5" />
          </span>
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'ml' 
                ? "നിങ്ങളുടെ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക..." 
                : "Type your farming question here..."}
              className="pr-12"
              data-testid="chat-input"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
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
    </div>
  );
}