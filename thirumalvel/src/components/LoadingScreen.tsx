import React, { useState, useEffect } from "react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return true;
  });
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isVisible) {
      onComplete?.();
      return;
    }

    // Step-wise smooth progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly
        const step = Math.random() * 15 + 10;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  useEffect(() => {
    if (!isVisible) return;

    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 400); // 400ms fade transition
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [progress, isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`loading-screen ${isFadingOut ? "loading-fade-out" : ""}`}
      aria-label="Loading Thirumal Vel Enterprise website"
      role="status"
    >
      <div className="loading-content">
        {/* Brand Logo with Apple-inspired Subtle Scale */}
        <div className="loading-logo-wrapper">
          <img 
            src="/logo.png" 
            alt="Thirumal Vel Enterprise Logo" 
            className="loading-logo-img"
          />
        </div>

        {/* Brand Name & Tagline */}
        <div className="loading-brand-text">
          <h2 className="loading-brand-title">{businessData.fullName}</h2>
          <span className="loading-brand-badge">{businessData.subtitle}</span>
          <p className="loading-brand-location">{t.loading.subtitle}</p>
        </div>

        {/* Dual Brand Color Progress Track (Green & Blue) */}
        <div className="loading-progress-container">
          <div 
            className="loading-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="loading-percentage tabular-nums">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};
