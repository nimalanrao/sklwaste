import React, { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "../data/business";
import { assetUrl } from "../utils/asset";
import { useDragToDismiss } from "../hooks/useDragToDismiss";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const { sheetRef, handleProps, contentProps, isDragging } = useDragToDismiss({
    isOpen,
    onClose,
    threshold: 80,
  });

  // Store trigger element to restore focus on close
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
      triggerElementRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePrev = React.useCallback(() => {
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  const handleNext = React.useCallback(() => {
    onSelectIndex((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div 
      className="lightbox-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview Gallery"
    >
      <div 
        ref={sheetRef}
        className={`lightbox-container ${isDragging ? "lightbox-dragging" : ""}`}
        onClick={(e) => e.stopPropagation()}
        {...contentProps}
      >
        {/* Apple Tactile Drag-Down Handle Bar */}
        <div 
          className="sheet-drag-handle-zone" 
          {...handleProps}
          title="Tarik ke bawah untuk tutup"
        >
          <div className="sheet-drag-pill" />
        </div>

        {/* Top Control Bar with Glassmorphic styling */}
        <div className="lightbox-top-bar">
          <div className="lightbox-meta">
            <span className="lightbox-tag">{currentItem.category}</span>
            <span className="lightbox-counter tabular-nums">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button 
            ref={closeButtonRef}
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close image lightbox"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Central Stage - Strictly Contained, Never Scroll Horizontally */}
        <div className="lightbox-stage">
          <button 
            className="lightbox-nav-btn lightbox-prev"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>

          <div className="lightbox-image-wrapper">
            <img 
              src={assetUrl(currentItem.imageUrl)} 
              alt={currentItem.alt}
              className="lightbox-active-img"
            />
          </div>

          <button 
            className="lightbox-nav-btn lightbox-next"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Caption Bar */}
        <div className="lightbox-caption-bar">
          <h3 className="lightbox-caption-title">{currentItem.title}</h3>
          <p className="lightbox-caption-desc">{currentItem.alt}</p>
        </div>
      </div>
    </div>
  );
};
