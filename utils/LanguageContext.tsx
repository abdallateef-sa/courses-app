import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import Storage from './storage';
import { Language, getTranslation } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('ar'); // Default to Arabic

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load Language
      const savedLanguage = await Storage.getItem('language');
      if (savedLanguage === 'ar' || savedLanguage === 'en') {
        setLanguageState(savedLanguage);
      }

      // Load Theme
      const savedTheme = await Storage.getItem('theme');
      const savedUseSystem = await Storage.getItem('useSystemTheme');

      if (savedUseSystem === 'true') {
        Appearance.setColorScheme(null); // Use system
      } else if (savedTheme === 'dark') {
        Appearance.setColorScheme('dark');
      } else {
        // Default to LIGHT if nothing saved, or explicitly saved as light
        Appearance.setColorScheme('light');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // Fallback to light on error
      Appearance.setColorScheme('light');
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await Storage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
