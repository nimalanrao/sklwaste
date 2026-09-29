import React, { useState } from "react";
import { Maximize2, Image as ImageIcon } from "lucide-react";
import { galleryItems } from "../data/business";
import { GalleryLightbox } from "./GalleryLightbox";

export const Gallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <section id="gallery" className="section section-alt" aria-labelledby="gallery-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">STORE & HARDWARE GALLERY</span>
          <h2 id="gallery-title" className="section-title">
            Supplies & Equipment Visual Showcase
          </h2>
          <p className="section-desc">
            Explore typical workshop tools, plumbing components, and fasteners stocked for local maintenance. Click any photo to enlarge.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-item-card"
              onClick={() => handleOpenLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Enlarge photo: ${item.title}`}
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
                    <span>View Photo</span>
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
            Photographs depict representative hardware categories, tools, and workshop supplies available through store enquiry.
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox 
        items={galleryItems}
        currentIndex={selectedPhotoIndex ?? 0}
        isOpen={selectedPhotoIndex !== null}
        onClose={handleCloseLightbox}
        onSelectIndex={(index) => setSelectedPhotoIndex(index)}
      />
    </section>
  );
};
