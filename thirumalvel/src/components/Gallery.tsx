import React, { useState } from "react";
import { Maximize2, Image as ImageIcon } from "lucide-react";
import { galleryItems } from "../data/business";
import { GalleryLightbox } from "./GalleryLightbox";
import { useLanguage } from "../context/useLanguage";

export const Gallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  // Merge localized titles and categories with image URLs
  const localizedItems = galleryItems.map((item, idx) => {
    const loc = t.gallery.items[idx];
    return {
      ...item,
      title: loc ? loc.title : item.title,
      category: loc ? loc.category : item.category,
      alt: loc ? loc.alt : item.alt,
    };
  });

  return (
    <section id="gallery" className="section section-alt" aria-labelledby="gallery-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header scroll-reveal">
          <span className="eyebrow">{t.gallery.eyebrow}</span>
          <h2 id="gallery-title" className="section-title">
            {t.gallery.title}
          </h2>
          <p className="section-desc">
            {t.gallery.desc}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {localizedItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`gallery-item-card scroll-reveal reveal-delay-${(index % 3) + 1}`}
              onClick={() => handleOpenLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${t.gallery.viewPhoto}: ${item.title}`}
            >
              <div className="gallery-thumbnail-wrap">
                <img 
                  src={item.imageUrl} 
                  alt={item.alt}
                  className="gallery-img img-contained"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div className="gallery-zoom-badge">
                    <Maximize2 size={16} strokeWidth={2} />
                    <span>{t.gallery.viewPhoto}</span>
                  </div>
                </div>
              </div>

              <div className="gallery-card-info">
                <span className="gallery-card-category">{item.category}</span>
                <h3 className="gallery-card-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Disclosure */}
        <div className="gallery-disclosure">
          <ImageIcon size={16} className="disclosure-icon" />
          <span>
            {t.gallery.disclosure}
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox 
        items={localizedItems}
        currentIndex={selectedPhotoIndex ?? 0}
        isOpen={selectedPhotoIndex !== null}
        onClose={handleCloseLightbox}
        onSelectIndex={(index) => setSelectedPhotoIndex(index)}
      />
    </section>
  );
};
