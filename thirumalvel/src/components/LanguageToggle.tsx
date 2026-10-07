import React from "react";
import { useLanguage } from "../context/useLanguage";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
  compact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === "en" ? "ms" : "en");
  };

  const currentLabel = language === "en" ? "EN" : "BM";
  const nextLanguageName = language === "en" ? "Bahasa Melayu" : "English";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`lang-btn-simple ${className}`}
      aria-label={`Language: ${currentLabel}. Click to switch to ${nextLanguageName}`}
      title={`Switch to ${nextLanguageName}`}
    >
      <Globe size={14} className="lang-globe-icon" aria-hidden="true" />
      <span className="lang-code-text">{currentLabel}</span>
    </button>
  );
};
