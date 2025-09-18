import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ml';

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.marketplace': 'Marketplace', 
    'nav.ai_assistant': 'AI Assistant',
    'nav.messages': 'Messages',
    'nav.profile': 'Profile',
    'nav.language': 'Language',
    
    // Main Hero Section - Simple for farmers
    'hero.title': 'Plant Doctor',
    'hero.subtitle': 'Is your plant sick? Find out now!',
    'hero.description': 'Take a photo of your plant and get instant help. Know what disease it has and how to cure it.',
    'hero.take_photo': 'Take Photo',
    'hero.upload_photo': 'Upload Photo',
    'hero.how_it_works': 'How it works',
    
    // Disease Detection
    'detect.title': 'Check Plant Health',
    'detect.upload_image': 'Take or Upload Plant Photo',
    'detect.drag_drop': 'Tap here to take photo or choose from gallery',
    'detect.take_camera': 'Take Photo',
    'detect.choose_file': 'Choose Photo',
    'detect.analyze': 'Check Plant',
    'detect.analyzing': 'Checking your plant...',
    'detect.results': 'Plant Health Report',
    'detect.disease_found': 'Disease Found',
    'detect.plant_healthy': 'Plant is Healthy',
    'detect.confidence': 'Accuracy',
    'detect.severity': 'How bad is it?',
    'detect.treatment': 'Treatment',
    'detect.save_result': 'Save Report',
    'detect.share_result': 'Share Report',
    'detect.ask_expert': 'Ask Expert',
    'detect.try_again': 'Check Another Plant',
    
    // Secondary Features
    'features.weather': 'Weather',
    'features.weather_desc': 'Check today\'s weather for farming',
    'features.market_prices': 'Crop Prices',
    'features.market_desc': 'See current market rates',
    'features.sell_crops': 'Sell Crops',
    'features.sell_desc': 'Sell your harvest to buyers',
    'features.chat_expert': 'Talk to Expert',
    'features.chat_desc': 'Get farming advice',
    
    // Common Actions
    'action.back': 'Back',
    'action.next': 'Next',
    'action.continue': 'Continue',
    'action.cancel': 'Cancel',
    'action.save': 'Save',
    'action.share': 'Share',
    'action.contact': 'Contact',
    
    // Status Messages
    'status.healthy': 'Healthy',
    'status.sick': 'Needs Treatment',
    'status.severe': 'Urgent Treatment',
    'status.loading': 'Please wait...',
    'status.success': 'Success!',
    'status.error': 'Something went wrong',
    
    // Help Text
    'help.take_clear_photo': 'Take a clear photo of the sick part of your plant',
    'help.good_lighting': 'Make sure there is good light',
    'help.close_up': 'Take photo close to the problem area',
    'help.multiple_angles': 'You can take photos from different angles',
  },
  ml: {
    // Navigation
    'nav.home': 'ഹോം',
    'nav.marketplace': 'മാർക്കറ്റ്',
    'nav.ai_assistant': 'AI സഹായി',
    'nav.messages': 'സന്ദേശങ്ങൾ',
    'nav.profile': 'പ്രൊഫൈൽ',
    'nav.language': 'ഭാഷ',
    
    // Main Hero Section - Simple for farmers
    'hero.title': 'ചെടിയുടെ ഡോക്ടർ',
    'hero.subtitle': 'നിങ്ങളുടെ ചെടിക്ക് രോഗമുണ്ടോ? ഇപ്പോൾ അറിയാം!',
    'hero.description': 'നിങ്ങളുടെ ചെടിയുടെ ഫോട്ടോ എടുത്ത് ഉടനെ സഹായം നേടൂ. എന്ത് രോഗമാണെന്നും എങ്ങനെ സുഖപ്പെടുത്താമെന്നും അറിയാം.',
    'hero.take_photo': 'ഫോട്ടോ എടുക്കുക',
    'hero.upload_photo': 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    'hero.how_it_works': 'എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    
    // Disease Detection
    'detect.title': 'ചെടിയുടെ ആരോഗ്യം പരിശോധിക്കുക',
    'detect.upload_image': 'ചെടിയുടെ ഫോട്ടോ എടുക്കുകയോ അപ്‌ലോഡ് ചെയ്യുകയോ ചെയ്യുക',
    'detect.drag_drop': 'ഫോട്ടോ എടുക്കാൻ ഇവിടെ ടാപ് ചെയ്യുക അല്ലെങ്കിൽ ഗാലറിയിൽ നിന്ന് തിരഞ്ഞെടുക്കുക',
    'detect.take_camera': 'ഫോട്ടോ എടുക്കുക',
    'detect.choose_file': 'ഫോട്ടോ തിരഞ്ഞെടുക്കുക',
    'detect.analyze': 'ചെടി പരിശോധിക്കുക',
    'detect.analyzing': 'നിങ്ങളുടെ ചെടി പരിശോധിക്കുന്നു...',
    'detect.results': 'ചെടിയുടെ ആരോഗ്യ റിപ്പോർട്ട്',
    'detect.disease_found': 'രോഗം കണ്ടെത്തി',
    'detect.plant_healthy': 'ചെടി ആരോഗ്യകരമാണ്',
    'detect.confidence': 'കൃത്യത',
    'detect.severity': 'എത്രത്തോളം മോശമാണ്?',
    'detect.treatment': 'ചികിത്സ',
    'detect.save_result': 'റിപ്പോർട്ട് സേവ് ചെയ്യുക',
    'detect.share_result': 'റിപ്പോർട്ട് പങ്കിടുക',
    'detect.ask_expert': 'വിദഗ്ധനോട് ചോദിക്കുക',
    'detect.try_again': 'മറ്റൊരു ചെടി പരിശോധിക്കുക',
    
    // Secondary Features
    'features.weather': 'കാലാവസ്ഥ',
    'features.weather_desc': 'കൃഷിക്കുള്ള ഇന്നത്തെ കാലാവസ്ഥ പരിശോധിക്കുക',
    'features.market_prices': 'വിള വില',
    'features.market_desc': 'നിലവിലെ മാർക്കറ്റ് നിരക്കുകൾ കാണുക',
    'features.sell_crops': 'വിളകൾ വിൽക്കുക',
    'features.sell_desc': 'നിങ്ങളുടെ വിളവെടുപ്പ് വാങ്ങുന്നവർക്ക് വിൽക്കുക',
    'features.chat_expert': 'വിദഗ്ധനുമായി സംസാരിക്കുക',
    'features.chat_desc': 'കാർഷിക ഉപദേശം നേടുക',
    
    // Common Actions
    'action.back': 'തിരികെ',
    'action.next': 'അടുത്തത്',
    'action.continue': 'തുടരുക',
    'action.cancel': 'റദ്ദാക്കുക',
    'action.save': 'സേവ് ചെയ്യുക',
    'action.share': 'പങ്കിടുക',
    'action.contact': 'ബന്ധപ്പെടുക',
    
    // Status Messages
    'status.healthy': 'ആരോഗ്യകരം',
    'status.sick': 'ചികിത്സ ആവശ്യം',
    'status.severe': 'അടിയന്തിര ചികിത്സ',
    'status.loading': 'ദയവായി കാത്തിരിക്കുക...',
    'status.success': 'വിജയം!',
    'status.error': 'എന്തോ തെറ്റ് സംഭവിച്ചു',
    
    // Help Text
    'help.take_clear_photo': 'നിങ്ങളുടെ ചെടിയുടെ രോഗമുള്ള ഭാഗത്തിന്റെ വ്യക്തമായ ഫോട്ടോ എടുക്കുക',
    'help.good_lighting': 'നല്ല വെളിച്ചം ഉണ്ടെന്ന് ഉറപ്പാക്കുക',
    'help.close_up': 'പ്രശ്ന മേഖലയ്ക്ക് അടുത്ത് ഫോട്ടോ എടുക്കുക',
    'help.multiple_angles': 'വിവിധ കോണുകളിൽ നിന്ന് ഫോട്ടോകൾ എടുക്കാം',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('krishi-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ml')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('krishi-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}