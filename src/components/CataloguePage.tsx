import React, { useState, useMemo } from "react";
import { 
  Search, 
  ArrowLeft, 
  CheckCircle2, 
  MessageCircle, 
  Layers, 
  Truck, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { catalogueProducts } from "../data/catalogue";
import type { CatalogueProduct } from "../data/catalogue";
import { CatalogueModal } from "./CatalogueModal";
import { useLanguage } from "../context/useLanguage";
import { businessData } from "../data/business";

interface CataloguePageProps {
  onBackToHome: () => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({ onBackToHome }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<"all" | "brick" | "block" | "paver" | "ventilation">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<CatalogueProduct | null>(null);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return catalogueProducts.filter((product) => {
      const matchesFilter = activeFilter === "all" || product.subCategory === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.spec.toLowerCase().includes(q) ||
        product.application.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q);
      
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="catalogue-page">
      {/* 1. Top Breadcrumb & Return Bar */}
      <div className="catalogue-top-bar">
        <div className="container catalogue-breadcrumb-wrap">
          <button 
            type="button" 
            onClick={onBackToHome}
            className="catalogue-back-btn"
          >
            <ArrowLeft size={16} />
            <span>{t.catalogue.backToHome}</span>
          </button>
          <div className="catalogue-breadcrumb">
            <span onClick={onBackToHome} className="breadcrumb-link">{t.nav.home}</span>
            <ChevronRight size={13} className="breadcrumb-sep" />
            <span className="breadcrumb-current">{t.nav.catalogue}</span>
            <ChevronRight size={13} className="breadcrumb-sep" />
            <span className="breadcrumb-current">Brick, Block & Paver</span>
          </div>
        </div>
      </div>

      {/* 2. Catalogue Header */}
      <section className="catalogue-header-section">
        <div className="container">
          <div className="catalogue-header-content">
            <span className="badge badge-brand">
              <ShieldCheck size={13} />
              <span>{t.catalogue.badge}</span>
            </span>
            <h1 className="catalogue-page-title">{t.catalogue.title}</h1>
            <p className="catalogue-page-lead">{t.catalogue.subtitle}</p>

            {/* Value Highlights */}
            <div className="catalogue-stats-row">
              <div className="catalogue-stat-item">
                <span className="catalogue-stat-value">15+</span>
                <span className="catalogue-stat-label">Verified Products</span>
              </div>
              <div className="catalogue-stat-divider" />
              <div className="catalogue-stat-item">
                <span className="catalogue-stat-value">Pcs / Pallet</span>
                <span className="catalogue-stat-label">Retail & Contractor Supply</span>
              </div>
              <div className="catalogue-stat-divider" />
              <div className="catalogue-stat-item">
                <span className="catalogue-stat-value">Site Delivery</span>
                <span className="catalogue-stat-label">Bandar Seri Coalfields & Selangor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Controls: Filters & Live Search */}
      <section className="catalogue-controls-section">
        <div className="container">
          <div className="catalogue-controls-bar">
            {/* Search Input */}
            <div className="catalogue-search-wrap">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.catalogue.searchPlaceholder}
                className="catalogue-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="catalogue-filter-pills" role="tablist">
              <button 
                className={`filter-pill ${activeFilter === "all" ? "filter-pill-active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                {t.catalogue.allFilter} (15)
              </button>
              <button 
                className={`filter-pill ${activeFilter === "brick" ? "filter-pill-active" : ""}`}
                onClick={() => setActiveFilter("brick")}
              >
                {t.catalogue.bricksFilter} (3)
              </button>
              <button 
                className={`filter-pill ${activeFilter === "block" ? "filter-pill-active" : ""}`}
                onClick={() => setActiveFilter("block")}
              >
                {t.catalogue.blocksFilter} (5)
              </button>
              <button 
                className={`filter-pill ${activeFilter === "paver" ? "filter-pill-active" : ""}`}
                onClick={() => setActiveFilter("paver")}
              >
                {t.catalogue.paversFilter} (5)
              </button>
              <button 
                className={`filter-pill ${activeFilter === "ventilation" ? "filter-pill-active" : ""}`}
                onClick={() => setActiveFilter("ventilation")}
              >
                {t.catalogue.ventFilter} (2)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Grid */}
      <section className="catalogue-grid-section">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="catalogue-empty-state">
              <Layers size={40} className="empty-icon" />
              <h3>{t.catalogue.noResults}</h3>
              <p>Direct enquiries: Call {businessData.phone.display} or WhatsApp us.</p>
              <button 
                onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
                className="btn btn-secondary btn-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="catalogue-grid">
              {filteredProducts.map((product) => {
                const whatsappMsg = encodeURIComponent(
                  `Hello SKL Waste, saya nak semak sebut harga dan stok untuk: ${product.title}`
                );
                const waUrl = `https://wa.me/${businessData.phone.whatsapp}?text=${whatsappMsg}`;

                return (
                  <article key={product.id} className="product-card">
                    {/* Product Image */}
                    <div 
                      className="product-card-media"
                      onClick={() => setSelectedProduct(product)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setSelectedProduct(product)}
                    >
                      <img 
                        src={product.localImage} 
                        alt={product.title} 
                        className="product-card-img"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== product.fallbackImage) {
                            target.src = product.fallbackImage;
                          }
                        }}
                      />
                      <span className="product-brand-tag">{product.brand}</span>
                    </div>

                    {/* Product Content */}
                    <div className="product-card-body">
                      <div className="product-card-meta">
                        <span className="product-category-label">{product.category}</span>
                        <span className="product-stock-tag">
                          <CheckCircle2 size={12} />
                          <span>In Stock</span>
                        </span>
                      </div>

                      <h3 
                        className="product-card-title" 
                        title={product.title}
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.title}
                      </h3>

                      <p className="product-card-spec">{product.spec}</p>
                      <p className="product-card-app">{product.application}</p>

                      {/* Card Footer Actions */}
                      <div className="product-card-actions">
                        <a 
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm product-wa-btn"
                          title={`WhatsApp enquiry for ${product.title}`}
                        >
                          <MessageCircle size={14} />
                          <span>WhatsApp</span>
                        </a>

                        <button 
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="btn btn-secondary btn-sm product-details-btn"
                        >
                          <span>{t.catalogue.viewSpecs}</span>
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 5. Site Delivery & Contractor Notice */}
      <section className="catalogue-delivery-banner">
        <div className="container">
          <div className="delivery-banner-card">
            <div className="delivery-banner-info">
              <div className="delivery-icon-wrap">
                <Truck size={28} />
              </div>
              <div className="delivery-text-wrap">
                <h3 className="delivery-banner-title">Need Bulk Pallets or Site Delivery?</h3>
                <p className="delivery-banner-desc">
                  {t.catalogue.siteDeliveryNotice}
                </p>
              </div>
            </div>

            <div className="delivery-banner-actions">
              <a 
                href={`https://wa.me/${businessData.phone.whatsapp}?text=${encodeURIComponent("Hello SKL Waste, saya perlukan sebut harga pukal / penghantaran lori untuk barangan bata dan paver.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary delivery-action-btn"
              >
                <MessageCircle size={16} />
                <span>{t.catalogue.bulkQuoteAction}</span>
              </a>

              <a 
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-secondary delivery-phone-btn phone-number"
              >
                <span>Call {businessData.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Product Detail Lightbox Modal */}
      <CatalogueModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
