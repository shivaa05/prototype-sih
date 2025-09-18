import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sprout, Menu, X, Store, MessageSquare, User, Camera, Bell, Cloud, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LanguageSwitch from "@/components/language-switch";
import { useLanguage } from "@/context/language-context";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t, language } = useLanguage();

  const navItems = [
    { href: "/", label: t('nav.home'), icon: Sprout },
    { href: "/marketplace", label: t('nav.marketplace'), icon: Store },
    { href: "/messages", label: t('nav.messages'), icon: MessageSquare },
    { href: "/weather", label: t('features.weather'), icon: Cloud },
    { href: "/profile", label: t('nav.profile'), icon: User },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Sprout className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className={`text-xl font-bold text-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>Krishi Sahayi</span>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`flex items-center space-x-2 transition-colors cursor-pointer px-3 py-2 rounded-lg ${
                    location === item.href 
                      ? "text-primary font-medium bg-primary/10" 
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                  whileHover={{ y: -1 }}
                  data-testid={`nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className={language === 'ml' ? 'font-malayalam' : ''}>{item.label}</span>
                </motion.div>
              </Link>
            ))}
            
            {/* Notifications */}
            <Link href="/notifications">
              <motion.div
                className="relative cursor-pointer p-2 rounded-lg hover:bg-primary/5 transition-colors"
                whileHover={{ y: -1 }}
                data-testid="notifications-button"
              >
                <Bell className="w-5 h-5 text-foreground hover:text-primary" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0">
                  3
                </Badge>
              </motion.div>
            </Link>

            {/* Call Feature */}
            <Link href="/calls">
              <motion.div
                className="cursor-pointer p-2 rounded-lg hover:bg-primary/5 transition-colors"
                whileHover={{ y: -1 }}
                data-testid="calls-button"
              >
                <Phone className="w-5 h-5 text-foreground hover:text-primary" />
              </motion.div>
            </Link>

            {/* Language Switch in Top Right */}
            <div className="ml-4">
              <LanguageSwitch />
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center space-x-3 px-3 py-2 text-base font-medium cursor-pointer ${
                      location === item.href 
                        ? "text-primary bg-muted rounded-md" 
                        : "text-foreground hover:text-primary hover:bg-muted rounded-md"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className={language === 'ml' ? 'font-malayalam' : ''}>{item.label}</span>
                  </div>
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageSwitch />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
