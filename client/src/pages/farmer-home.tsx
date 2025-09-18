import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Cloud, TrendingUp, Store, Thermometer, Droplets, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AiChatInterface from "@/components/ai-chat-interface";
import { useLanguage } from "@/context/language-context";

// Simple weather mock data
const mockWeather = {
  temperature: 28,
  condition: "Sunny",
  humidity: 65,
  rainfall: "Light showers expected"
};

export default function FarmerHome() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Enhanced Hero Section with ChatGPT-like Interface */}
      <section className="hero-gradient py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className={`text-3xl lg:text-5xl font-bold text-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {language === 'ml' ? 'സ്മാർട്ട് കാർഷിക സഹായി' : 'Smart Farming Assistant'}
              </h1>
            </div>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' 
                ? 'ചെടിയുടെ രോഗങ്ങൾ കണ്ടെത്താനും കാർഷിക ഉപദേശം നേടാനും AI സഹായത്തോടെ സംസാരിക്കുക'
                : 'Chat with AI to detect plant diseases and get farming advice all in one place'
              }
            </p>
          </motion.div>

          {/* Main Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AiChatInterface />
          </motion.div>
        </div>
      </section>

      {/* Quick Tools & Features */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Weather Info */}
          <motion.div 
            className="bg-card rounded-2xl p-6 mb-8 border border-border shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">28°C</span>
                  <span className="text-muted-foreground">Sunny</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="text-muted-foreground">Light showers expected</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <span className={language === 'ml' ? 'font-malayalam' : ''}>
                  {t('features.weather')}
                </span>
              </Badge>
            </div>
          </motion.div>

          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-xl lg:text-2xl font-bold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' ? 'കൂടുതൽ സേവനങ്ങൾ' : 'Additional Tools'}
            </h2>
            <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' ? 'നിങ്ങളുടെ കാർഷികത്തെ സഹായിക്കുന്ന മറ്റ് ഉപകരണങ്ങൾ' : 'More tools to help with your farming'}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Market Prices */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {t('features.market_prices')}
                  </h3>
                  <p className={`text-sm text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {t('features.market_desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Marketplace */}
            <Link href="/marketplace">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Store className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                      {t('features.sell_crops')}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                      {t('features.sell_desc')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            {/* Weather Info */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Cloud className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {t('features.weather')}
                  </h3>
                  <p className={`text-sm text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {t('features.weather_desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}