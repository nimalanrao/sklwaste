import { useContext } from "react";
import { LanguageContext } from "./languageContextDefinition";
import type { LanguageContextType } from "./languageContextDefinition";

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
