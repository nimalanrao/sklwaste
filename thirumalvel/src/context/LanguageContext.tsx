import React, { useState, useEffect } from "react";
import { translations } from "../data/translations";
import type { Language } from "../data/translations";
import { LanguageContext } from "./languageContextDefinition";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("tv_lang") as Language;
      if (saved === "en" || saved === "ms") return saved;
    } catch {
      // ignore
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("tv_lang", lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang === "ms" ? "ms" : "en";
  };

  useEffect(() => {
    document.documentElement.lang = language === "ms" ? "ms" : "en";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};
