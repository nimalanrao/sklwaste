import React from "react";
import { useLanguage } from "../context/useLanguage";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
  compact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = "", compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`lang-toggle-wrap ${className}`} role="group" aria-label="Language Selector">
      <Globe size={14} className="lang-globe-icon" aria-hidden="true" />
      <div className="lang-segmented-control">
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`lang-btn ${language === "en" ? "lang-btn-active" : ""}`}
          aria-pressed={language === "en"}
          title="Switch to English"
        >
          {compact ? "EN" : "English"}
        </button>
        <span className="lang-divider" aria-hidden="true">|</span>
        <button
          type="button"
          onClick={() => setLanguage("ms")}
          className={`lang-btn ${language === "ms" ? "lang-btn-active" : ""}`}
          aria-pressed={language === "ms"}
          title="Tukar ke Bahasa Melayu"
        >
          {compact ? "BM" : "Bahasa Melayu"}
        </button>
      </div>
    </div>
  );
};
