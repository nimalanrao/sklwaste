import React, { useState, useMemo } from "react";
import { 
  Search, 
  Home, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  ArrowLeft,
  X,
  BrickWall,
  Wrench,
  Scissors,
  Droplets,
  Bath,
  Paintbrush,
  LayoutGrid,
  Eye,
  SlidersHorizontal,
  Check,
  Workflow,
  ShoppingBag,
  Plus,
  Minus
} from "lucide-react";
import { masterProducts, SIDEBAR_CATEGORIES } from "../data/catalogue";
import type { MasterProduct } from "../data/catalogue";
import { CatalogueModal } from "./CatalogueModal";
import { useCart } from "../context/CartContext";
import { businessData } from "../data/business";
import { assetUrl } from "../utils/asset";

interface CataloguePageProps {
  onBackToHome: () => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({ onBackToHome }) => {
  const { addToCart, updateQuantity, getItemQuantity, totalCount, openCheckout } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("BUILDING MATERIALS");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MasterProduct | null>(null);
  const [page, setPage] = useState(1);

  // STRICT REQUIREMENT: Maximum 20 cards per page (4 cols x 5 rows)
  const itemsPerPage = 20;

  // Compute category counts for the 6 allowed categories
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of masterProducts) {
      counts[p.mainCategory] = (counts[p.mainCategory] || 0) + 1;
    }
    return counts;
  }, []);

  // Compute available brands for the active category
  const availableBrands = useMemo(() => {
    const brands: Record<string, number> = {};
    const relevantProducts = selectedCategory === "ALL" 
      ? masterProducts 
      : masterProducts.filter(p => p.mainCategory === selectedCategory);
      
    for (const p of relevantProducts) {
      if (p.brand && p.brand !== "SKL Hardware") {
        brands[p.brand] = (brands[p.brand] || 0) + 1;
      }
    }
    return Object.entries(brands)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);
  }, [selectedCategory]);

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
    setPage(1);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return masterProducts.filter(p => {
      const matchesCat = selectedCategory === "ALL" || p.mainCategory === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        p.subCategory.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q));
      
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);

      return matchesCat && matchesSearch && matchesBrand;
    });
  }, [selectedCategory, searchQuery, selectedBrands]);

  // Compute matches across other categories when search returns 0 in active category
  const crossCategoryMatches = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q || selectedCategory === "ALL") return [];
    return masterProducts.filter(p => {
      if (p.mainCategory === selectedCategory) return false;
      return (
        p.title.toLowerCase().includes(q) || 
        p.subCategory.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  const crossCategoryNames = useMemo(() => {
    const names = new Set<string>();
    for (const p of crossCategoryMatches) {
      names.add(p.mainCategory);
    }
    return Array.from(names);
  }, [crossCategoryMatches]);

  // Paginated Slice - STRICTLY 20 PER PAGE
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page, itemsPerPage]);

  // Generate numbered pagination items with smart sliding window
  const paginationRange = useMemo(() => {
    const delta = 2;
    const range: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  }, [page, totalPages]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const contentEl = document.querySelector(".portal-content");
    if (contentEl) {
      contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getCategoryDetails = (category: string) => {
    switch (category) {
      case "BUILDING MATERIALS":
        return {
          icon: <BrickWall size={16} strokeWidth={2} />,
          badgeClass: "badge-brick",
          shortLabel: "Bahan Binaan"
        };
      case "PIPING & PLUMBING":
        return {
          icon: <Workflow size={16} strokeWidth={2} />,
          badgeClass: "badge-piping",
          shortLabel: "Paip & Paiping"
        };
      case "TOOLS":
        return {
          icon: <Wrench size={16} strokeWidth={2} />,
          badgeClass: "badge-tools",
          shortLabel: "Peralatan"
        };
      case "CUTTING TOOLS":
        return {
          icon: <Scissors size={16} strokeWidth={2} />,
          badgeClass: "badge-cutting",
          shortLabel: "Mata Pemotong"
        };
      case "WATERPROOFING & SEALANT":
        return {
          icon: <Droplets size={16} strokeWidth={2} />,
          badgeClass: "badge-waterproof",
          shortLabel: "Kalis Air"
        };
      case "KITCHEN & BATH":
        return {
          icon: <Bath size={16} strokeWidth={2} />,
          badgeClass: "badge-bath",
          shortLabel: "Dapur & Bilik Air"
        };
      case "PAINT":
        return {
          icon: <Paintbrush size={16} strokeWidth={2} />,
          badgeClass: "badge-paint",
          shortLabel: "Cat & Kemasan"
        };
      default:
        return {
          icon: <LayoutGrid size={16} strokeWidth={2} />,
          badgeClass: "badge-all",
          shortLabel: "Semua Produk"
        };
    }
  };

  return (
    <div className="product-portal-layout main-view-transition">
      {/* Top Banner Bar - Apple Translucent Frosted Header */}
      <header className="portal-top-bar">
        <div className="portal-container portal-top-content">
          <button 
            type="button" 
            onClick={onBackToHome}
            className="portal-back-home-btn"
          >
            <ArrowLeft size={16} strokeWidth={2.4} />
            <span>Kembali</span>
          </button>

          <div className="portal-direct-contact">
            <button 
              type="button" 
              onClick={openCheckout}
              className="portal-top-cart-btn"
              aria-label="Buka Senarai Tempahan"
            >
              <ShoppingBag size={15} strokeWidth={2.2} />
              <span>Senarai</span>
              {totalCount > 0 && <span className="portal-top-cart-badge tabular-nums">{totalCount}</span>}
            </button>

            <a 
              href={`https://wa.me/${businessData.phone.whatsapp}?text=${encodeURIComponent("Hello SKL Waste, saya nak buat pertanyaan tentang produk / bahan binaan.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="portal-top-wa-link"
              title="WhatsApp Kami"
            >
              <MessageCircle size={15} strokeWidth={2.2} />
              <span className="portal-top-wa-text">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Horizontal Apple Segmented Pill Bar for Mobile & Tablet */}
      <div className="portal-mobile-pills-bar" aria-label="Kategori Mudah Alih">
        <div className="portal-container portal-mobile-pills-scroll">
          <button
            type="button"
            onClick={() => { setSelectedCategory("ALL"); setSelectedBrands([]); setPage(1); }}
            className={`apple-pill-item ${selectedCategory === "ALL" ? "apple-pill-active" : ""}`}
          >
            <LayoutGrid size={14} />
            <span>Semua Produk</span>
            <span className="apple-pill-count">{masterProducts.length}</span>
          </button>

          {SIDEBAR_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            const details = getCategoryDetails(cat);

            return (
              <button
                key={`mobile-${cat}`}
                type="button"
                onClick={() => { setSelectedCategory(cat); setSelectedBrands([]); setPage(1); }}
                className={`apple-pill-item ${isActive ? "apple-pill-active" : ""}`}
              >
                {details.icon}
                <span>{cat}</span>
                <span className="apple-pill-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="portal-container portal-main-body">
        {/* Left Sidebar Menu - Ultra Clean Apple Sidebar Design */}
        <aside className="portal-sidebar">
          {/* Apple-styled Search Box */}
          <div className="portal-search-box">
            <Search size={16} className="portal-search-icon" />
            <input 
              type="text" 
              placeholder="Cari produk / bahan binaan..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="portal-search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => { setSearchQuery(""); setPage(1); }}
                className="portal-search-clear-btn"
                aria-label="Padam carian"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Navigation Menu Container */}
          <div className="portal-menu-card">
            <div className="portal-menu-header">
              <span className="portal-menu-title">Kategori Produk</span>
              <span className="portal-menu-subtitle">{SIDEBAR_CATEGORIES.length} Kategori Rasmi</span>
            </div>

            <nav className="portal-category-list" aria-label="Kategori Produk">
              {SIDEBAR_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                const details = getCategoryDetails(cat);

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setSelectedCategory(cat); setSelectedBrands([]); setPage(1); }}
                    className={`portal-cat-item ${isActive ? "portal-cat-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className="portal-cat-left">
                      <div className={`portal-cat-squircle ${details.badgeClass}`}>
                        {details.icon}
                      </div>
                      <span className="portal-cat-name">{cat}</span>
                    </div>
                    <span className="portal-cat-subcount">{count}</span>
                  </button>
                );
              })}

              {/* All Products Item */}
              <button
                type="button"
                onClick={() => { setSelectedCategory("ALL"); setSelectedBrands([]); setPage(1); }}
                className={`portal-cat-item ${selectedCategory === "ALL" ? "portal-cat-active" : ""}`}
                aria-current={selectedCategory === "ALL" ? "page" : undefined}
              >
                <div className="portal-cat-left">
                  <div className="portal-cat-squircle badge-all">
                    <LayoutGrid size={16} strokeWidth={2} />
                  </div>
                  <span className="portal-cat-name">SEMUA PRODUK</span>
                </div>
                <span className="portal-cat-subcount">{masterProducts.length}</span>
              </button>
            </nav>
          </div>

          {/* Brand Filter Menu */}
          {availableBrands.length > 0 && (
            <div className="portal-menu-card portal-brand-card">
              <div className="portal-menu-header">
                <div className="portal-menu-title-with-icon">
                  <SlidersHorizontal size={14} />
                  <span className="portal-menu-title">Jenama / Pengeluar</span>
                </div>
                {selectedBrands.length > 0 && (
                  <button 
                    type="button" 
                    onClick={() => { setSelectedBrands([]); setPage(1); }}
                    className="portal-brand-reset-btn"
                  >
                    Set Semula
                  </button>
                )}
              </div>

              <div className="portal-brand-checklist">
                {availableBrands.map(([brand, count]) => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label key={brand} className={`portal-brand-row ${isChecked ? "portal-brand-row-selected" : ""}`}>
                      <div className="portal-brand-checkbox-wrap">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleBrandToggle(brand)}
                          className="portal-brand-native-checkbox"
                        />
                        <div className={`portal-brand-custom-checkbox ${isChecked ? "checked" : ""}`}>
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="portal-brand-text">{brand}</span>
                      <span className="portal-brand-count">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Content Area */}
        <main className="portal-content">
          {/* Breadcrumb Row */}
          <div className="portal-breadcrumb-row">
            <button type="button" onClick={onBackToHome} className="portal-home-icon-btn" title="Home">
              <Home size={14} />
            </button>
            <ChevronRight size={13} className="portal-crumb-sep" />
            <span 
              onClick={() => { setSelectedCategory("ALL"); setPage(1); }} 
              className="portal-crumb-link"
            >
              Katalog Produk
            </span>
            {selectedCategory !== "ALL" && (
              <>
                <ChevronRight size={13} className="portal-crumb-sep" />
                <span className="portal-crumb-current">{selectedCategory}</span>
              </>
            )}
            <span className="portal-crumb-total">
              (Memaparkan {paginatedProducts.length} daripada {filteredProducts.length} produk • Maksimum 20 per halaman)
            </span>
          </div>

          {/* Active Filters Clear Button & Search Scope */}
          {(selectedBrands.length > 0 || searchQuery || selectedCategory !== "ALL") && (
            <div className="portal-active-filters-bar">
              <div className="portal-active-filters-content">
                <span className="portal-filter-tag-label">Penapis Aktif:</span>
                {selectedCategory !== "ALL" && (
                  <span className="portal-filter-pill portal-filter-cat">
                    Kategori: {selectedCategory}
                    {searchQuery && (
                      <button 
                        type="button" 
                        onClick={() => { setSelectedCategory("ALL"); setPage(1); }}
                        className="portal-filter-scope-btn"
                        title="Tukar carian ke Semua Kategori"
                      >
                        (Cari dalam Semua)
                      </button>
                    )}
                  </span>
                )}
                {searchQuery && (
                  <span className="portal-filter-pill">
                    Carian: "{searchQuery}"
                    <button type="button" onClick={() => { setSearchQuery(""); setPage(1); }} aria-label="Padam carian">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedBrands.map(b => (
                  <span key={b} className="portal-filter-pill">
                    {b}
                    <button type="button" onClick={() => handleBrandToggle(b)} aria-label={`Padam ${b}`}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <button 
                type="button" 
                onClick={() => { setSearchQuery(""); setSelectedBrands([]); setSelectedCategory("ALL"); setPage(1); }}
                className="portal-clear-filters-btn"
              >
                Padam Semua
              </button>
            </div>
          )}

          {/* 4 Columns x Max 5 Rows Grid (20 items max per page) */}
          {paginatedProducts.length === 0 ? (
            <div className="portal-empty-results">
              {crossCategoryMatches.length > 0 ? (
                <div className="portal-cross-category-notice">
                  <h3>Tiada padanan "{searchQuery}" dalam kategori {selectedCategory}</h3>
                  <p>
                    Namun, terdapat <strong>{crossCategoryMatches.length} produk sepadan</strong> dalam kategori lain ({crossCategoryNames.join(", ")}).
                  </p>
                  <button 
                    type="button"
                    onClick={() => { setSelectedCategory("ALL"); setPage(1); }}
                    className="portal-empty-btn"
                  >
                    Lihat {crossCategoryMatches.length} Produk dalam Semua Kategori
                  </button>
                </div>
              ) : (
                <>
                  <h3>Tiada produk ditemui</h3>
                  <p>Sila padam carian atau pilih kategori lain dari menu di sebelah kiri.</p>
                  <button 
                    type="button"
                    onClick={() => { setSelectedCategory("BUILDING MATERIALS"); setSearchQuery(""); setSelectedBrands([]); setPage(1); }}
                    className="portal-empty-btn"
                  >
                    Kembali ke Bahan Binaan
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="portal-product-grid">
              {paginatedProducts.map((p, index) => {
                return (
                  <article 
                    key={`product-card-${p.id}-${index}`} 
                    className="portal-card portal-card-animated"
                    style={{ animationDelay: `${(index % 10) * 35}ms` }}
                  >
                    {/* Clean Framed Image with Hover Quick View Popup */}
                    <div 
                      className="portal-card-media"
                      onClick={() => setSelectedProduct(p)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat maklumat ${p.title}`}
                    >
                      <img 
                        src={assetUrl(p.localImage)} 
                        alt={p.title} 
                        className="portal-card-img"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const fb = assetUrl(p.fallbackImage);
                          if (target.src !== fb) {
                            target.src = fb;
                          }
                        }}
                      />

                      {/* Apple Quick-View Pill Overlay on Hover */}
                      <div className="portal-card-hover-overlay">
                        <span className="portal-card-quick-pill">
                          <Eye size={13} strokeWidth={2.2} />
                          <span>Lihat Butiran</span>
                        </span>
                      </div>
                    </div>

                    {/* Product Meta */}
                    <div className="portal-card-body">
                      <div className="portal-card-meta-top">
                        <span className="portal-card-cat-badge">{p.subCategory || p.mainCategory}</span>
                        {p.brand && p.brand !== "SKL Hardware" && (
                          <span className="portal-card-brand-tag">{p.brand}</span>
                        )}
                      </div>

                      <h3 
                        className="portal-card-title"
                        title={p.title}
                        onClick={() => setSelectedProduct(p)}
                      >
                        {p.title}
                      </h3>

                      {p.spec && (
                        <p className="portal-card-spec" title={p.spec}>{p.spec}</p>
                      )}

                      {/* Dynamic Cart & Action Buttons — Full Width, Zero Line-Break */}
                      <div className="portal-card-action">
                        {getItemQuantity(p.id) === 0 ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(p, 1);
                            }}
                            className="portal-card-add-btn portal-card-add-full"
                            title="Tambah ke Senarai Tempahan"
                          >
                            <Plus size={14} strokeWidth={2.5} />
                            <span>+ Tambah</span>
                          </button>
                        ) : (
                          <div className="portal-card-stepper-full">
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(p.id, getItemQuantity(p.id) - 1);
                              }}
                              className="portal-card-step-btn"
                              aria-label="Kurangkan kuantiti"
                            >
                              <Minus size={13} strokeWidth={2.5} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openCheckout();
                              }}
                              className="portal-card-stepper-center-btn"
                              title="Buka Senarai Tempahan"
                            >
                              <span className="portal-card-step-val tabular-nums">{getItemQuantity(p.id)}</span>
                              <span className="portal-card-step-lbl">dipilih</span>
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(p.id, getItemQuantity(p.id) + 1);
                              }}
                              className="portal-card-step-btn"
                              aria-label="Tambah kuantiti"
                            >
                              <Plus size={13} strokeWidth={2.5} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Numbered Pagination Bar on Bottom for Performance & Optimization */}
          {totalPages > 1 && (
            <div className="portal-pagination-bar">
              <button 
                type="button"
                disabled={page === 1}
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                className="portal-page-nav-btn"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>

              <div className="portal-page-numbers">
                {paginationRange.map((item, index) => {
                  if (item === "...") {
                    return (
                      <span key={`dots-${index}`} className="portal-page-dots">
                        ...
                      </span>
                    );
                  }
                  const pageNum = item as number;
                  const isCurrent = pageNum === page;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`portal-page-num-btn ${isCurrent ? "portal-page-num-active" : ""}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button 
                type="button"
                disabled={page === totalPages}
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                className="portal-page-nav-btn"
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Floating Order / Checkout Dock on Catalogue View */}
      {totalCount > 0 && (
        <aside className="portal-floating-cart-dock" aria-label="Akses Pantas Senarai Tempahan">
          <button
            type="button"
            onClick={openCheckout}
            className="portal-cart-dock-btn"
          >
            <div className="dock-left-content">
              <div className="dock-cart-badge-icon">
                <ShoppingBag size={18} strokeWidth={2.2} />
                <span className="dock-pill-number tabular-nums">{totalCount}</span>
              </div>
              <div className="dock-label-group">
                <span className="dock-label-main">Senarai Tempahan</span>
                <span className="dock-label-sub tabular-nums">
                  {totalCount} dipilih • Siang & Malam
                </span>
              </div>
            </div>
            <div className="dock-right-action">
              <span>Checkout</span>
              <ChevronRight size={16} strokeWidth={2.4} />
            </div>
          </button>
        </aside>
      )}

      {/* Lightbox / Full Spec & Description Modal */}
      <CatalogueModal 
        product={selectedProduct as any}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
