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
      <Globe size={13} className="lang-globe-icon" aria-hidden="true" />
      <div className="lang-segmented-control">
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`lang-btn ${language === "en" ? "lang-btn-active" : ""}`}
          aria-pressed={language === "en"}
          title="Switch to English"
        >
          {compact ? (
            "EN"
          ) : (
            <>
              <span className="lang-text-desktop">English</span>
              <span className="lang-text-mobile">EN</span>
            </>
          )}
        </button>
        <span className="lang-divider" aria-hidden="true">/</span>
        <button
          type="button"
          onClick={() => setLanguage("ms")}
          className={`lang-btn ${language === "ms" ? "lang-btn-active" : ""}`}
          aria-pressed={language === "ms"}
          title="Tukar ke Bahasa Melayu"
        >
          {compact ? (
            "BM"
          ) : (
            <>
              <span className="lang-text-desktop">Bahasa Melayu</span>
              <span className="lang-text-mobile">BM</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
