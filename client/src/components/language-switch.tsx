import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export default function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative">
      <motion.div 
        className="flex items-center space-x-2 bg-card border border-border rounded-lg p-1"
        whileHover={{ scale: 1.02 }}
      >
        <Globe className="w-4 h-4 text-muted-foreground ml-2" />
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className="text-sm px-3 py-1 h-8"
          data-testid="language-switch-en"
        >
          EN
        </Button>
        <Button
          variant={language === 'ml' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('ml')}
          className="text-sm px-3 py-1 h-8 font-malayalam"
          data-testid="language-switch-ml"
        >
          മലയാളം
        </Button>
      </motion.div>
    </div>
  );
}