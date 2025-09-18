import { motion } from "framer-motion";
import { Link } from "wouter";
import { PlayCircle, Camera, Sun, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="hero-gradient py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Krishi Sahayi
              <span className="block text-primary">Your Digital Farming Companion</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Empowering farmers with data-driven insights for better yield & income. 
              Get real-time weather forecasts, crop advisory, market prices, and AI-powered disease detection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-semibold"
                  data-testid="button-get-started"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/ai-mode">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 font-semibold"
                    data-testid="button-detect-disease"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Detect Disease
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=600" 
                alt="Beautiful green farm landscape with rolling hills" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <motion.div 
                className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm rounded-full p-3"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sun className="w-8 h-8 text-secondary-foreground" />
              </motion.div>
              <motion.div 
                className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm rounded-xl p-4"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center space-x-2 text-primary-foreground">
                  <Thermometer className="w-5 h-5" />
                  <span className="font-semibold">28°C</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
