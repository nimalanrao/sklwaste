import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  ArrowLeft,
  X,
  Barcode,
  Layers,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Check,
  Copy,
  Package,
  MessageSquare,
  Phone,
  LayoutGrid,
  List,
  ArrowUpDown,
  Tag,
  Truck,
  CheckCircle2
} from "lucide-react";
import { allDatabaseItems, DATABASE_CATEGORIES } from "../data/catalogue";
import type { DatabaseItem, ProductVariant } from "../data/catalogue";
import { useLanguage } from "../context/useLanguage";

interface CataloguePageProps {
  onBackToHome: () => void;
  initialCategory?: string;
  initialSearchQuery?: string;
}

// Escape special regex characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Safe resolution for public assets considering Vite's base path
export function getProductImageUrl(img?: string): string {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = img.startsWith("/") ? img : `/${img}`;
  return `${cleanBase}${cleanPath}`;
}

// Helper to highlight matched words in yellow
function HighlightedText({ text, queryTokens }: { text: string; queryTokens: string[] }) {
  if (!queryTokens.length || !text) {
    return <>{text}</>;
  }

  const sortedTokens = [...queryTokens].sort((a, b) => b.length - a.length);
  const regexPattern = `(${sortedTokens.map(escapeRegExp).join("|")})`;
  const parts = text.split(new RegExp(regexPattern, "gi"));

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = sortedTokens.some((t) => t.toLowerCase() === part.toLowerCase());
        return isMatch ? (
          <mark key={index} className="db-highlight">
            {part}
          </mark>
        ) : (
          part
        );
      })}
    </>
  );
}

export const CataloguePage: React.FC<CataloguePageProps> = ({
  onBackToHome,
  initialCategory = "ALL",
  initialSearchQuery = ""
}) => {
  const { language } = useLanguage();
  const isMalay = language === "ms";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [viewMode, setViewMode] = useState<"store" | "table">("store");
  const [filterPhotosOnly, setFilterPhotosOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"relevance" | "name" | "sku">("relevance");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<DatabaseItem | null>(null);
  const [cardVariants, setCardVariants] = useState<Record<string, ProductVariant>>({});
  const [modalVariant, setModalVariant] = useState<ProductVariant | null>(null);
  const [copiedBarcode, setCopiedBarcode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const itemsPerPage = viewMode === "store" ? 36 : 50;

  // Split query into individual search tokens
  const queryTokens = useMemo(() => {
    return searchQuery
      .trim()
      .split(/\s+/)
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);
  }, [searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of allDatabaseItems) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filter items: every token must match somewhere in the item (description, code, or barcode)
  const filteredItems = useMemo(() => {
    let result = allDatabaseItems.filter((item) => {
      const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
      if (!matchesCat) return false;
      if (filterPhotosOnly && !item.image) return false;
      if (!queryTokens.length) return true;

      const descLower = item.description.toLowerCase();
      const codeLower = item.itemCode.toLowerCase();
      const barcodeLower = item.barcode.toLowerCase();
      const fullText = `${descLower} ${codeLower} ${barcodeLower}`;

      return queryTokens.every((token) => fullText.includes(token));
    });

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === "sku") {
      result = [...result].sort((a, b) => a.itemCode.localeCompare(b.itemCode));
    }

    return result;
  }, [selectedCategory, filterPhotosOnly, queryTokens, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, page, itemsPerPage]);

  const startIndex = filteredItems.length === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, filteredItems.length);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Selected item index in current filtered view
  const selectedIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return filteredItems.findIndex(
      (it) => it.itemCode === selectedItem.itemCode && it.barcode === selectedItem.barcode
    );
  }, [selectedItem, filteredItems]);

  const openItemModal = (item: DatabaseItem) => {
    setSelectedItem(item);
    const chosen = cardVariants[item.itemCode] || (item.variants && item.variants.length > 0 ? item.variants[0] : null);
    setModalVariant(chosen);
    setCopiedBarcode(false);
  };

  const handlePrevItem = () => {
    if (selectedIndex > 0) {
      const it = filteredItems[selectedIndex - 1];
      setSelectedItem(it);
      setModalVariant(cardVariants[it.itemCode] || (it.variants && it.variants.length > 0 ? it.variants[0] : null));
      setCopiedBarcode(false);
    }
  };

  const handleNextItem = () => {
    if (selectedIndex >= 0 && selectedIndex < filteredItems.length - 1) {
      const it = filteredItems[selectedIndex + 1];
      setSelectedItem(it);
      setModalVariant(cardVariants[it.itemCode] || (it.variants && it.variants.length > 0 ? it.variants[0] : null));
      setCopiedBarcode(false);
    }
  };

  // Keyboard controls for modal
  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevItem();
      } else if (e.key === "ArrowRight") {
        handleNextItem();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, selectedIndex, filteredItems]);

  // Prevent background scrolling when pop-up modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2200);
  };

  const handleCopyBarcode = (barcode: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(barcode);
      setCopiedBarcode(true);
      showToast(`Copied barcode ${barcode}`);
      setTimeout(() => setCopiedBarcode(false), 2000);
    }
  };

  return (
    <div className="db-page store-mode">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="store-toast-banner" role="status">
          <CheckCircle2 size={16} className="text-emerald" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Search & Store Controls Bar */}
      <header className="store-header-bar">
        <div className="store-container store-header-inner">
          <div className="store-header-left">
            <button type="button" onClick={onBackToHome} className="store-home-btn" style={{ minHeight: 44 }}>
              <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
              <span>{isMalay ? "Laman Utama" : "Home"}</span>
            </button>
            <div className="store-brand-pill">
              <span className="store-brand-badge">SKL STORE</span>
              <span className="store-brand-sub">Bandar Seri Coalfields</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="store-search-wrap">
            <Search size={18} className="store-search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder={
                isMalay
                  ? "Cari barang binaan, paip, cat, perkakasan (cth: Y12 CQ, simen, sarung tangan)..."
                  : "Search hardware, pipes, cement, tools (e.g. Y12 CQ, gloves, safety)..."
              }
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="store-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setPage(1);
                }}
                className="store-search-clear"
                style={{ minWidth: 44, minHeight: 44, right: 0 }}
                aria-label="Clear search"
              >
                <X size={15} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Quick Actions / Mobile Filter Toggle */}
          <div className="store-header-actions">
            <button
              type="button"
              className="store-mobile-filter-btn"
              style={{ minHeight: 44 }}
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            >
              <Filter size={15} aria-hidden="true" />
              <span>{isMalay ? "Kategori" : "Categories"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Store Layout */}
      <div className="store-container store-layout">
        {/* Left Category Sidebar */}
        <aside className={`store-sidebar ${mobileFilterOpen ? "is-open" : ""}`}>
          <div className="store-sidebar-header">
            <div className="store-sidebar-title-row">
              <Layers size={16} className="text-blue" aria-hidden="true" />
              <h3>{isMalay ? "Kategori Kedai" : "Store Departments"}</h3>
            </div>
            {mobileFilterOpen && (
              <button
                type="button"
                className="store-sidebar-close"
                style={{ minWidth: 44, minHeight: 44, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => setMobileFilterOpen(false)}
                aria-label={isMalay ? "Tutup kategori" : "Close categories"}
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>

          <ul className="store-dept-list">
            <li>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("ALL");
                  setPage(1);
                  setMobileFilterOpen(false);
                }}
                className={`store-dept-link ${selectedCategory === "ALL" ? "is-active" : ""}`}
                style={{ minHeight: 44 }}
              >
                <span>{isMalay ? "Semua Barangan" : "All Products"}</span>
                <span className="store-dept-count tabular-nums">
                  {allDatabaseItems.length.toLocaleString()}
                </span>
              </button>
            </li>
            {DATABASE_CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setPage(1);
                    setMobileFilterOpen(false);
                  }}
                  className={`store-dept-link ${selectedCategory === cat ? "is-active" : ""}`}
                  style={{ minHeight: 44 }}
                >
                  <span className="store-dept-title">{cat}</span>
                  <span className="store-dept-count tabular-nums">
                    {(categoryCounts[cat] || 0).toLocaleString()}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Contact Direct Info Box */}
          <div className="store-sidebar-help">
            <div className="store-sidebar-help-header">
              <Truck size={16} className="text-blue" aria-hidden="true" />
              <h4>{isMalay ? "Bekalan Tapak Pukal" : "Contractor Bulk Supply"}</h4>
            </div>
            <p>
              {isMalay
                ? "Hubungi kami melalui WhatsApp untuk harga pukal atau bekalan lori tapak binaan."
                : "Direct tipper lorry dispatch & contractor wholesale quotation available daily."}
            </p>
            <a
              href="https://wa.me/60199144743?text=Hello%20SKL%20Hardware%2C%20I%20would%20like%20to%20inquire%20about%20bulk%20materials%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              className="store-sidebar-wa-btn"
              style={{ minHeight: 44 }}
            >
              <MessageSquare size={14} aria-hidden="true" />
              <span>WhatsApp SKL Direct</span>
            </a>
          </div>
        </aside>

        {/* Right Content Area: Store Toolbar + Products */}
        <main className="store-main">
          {/* Active Search & Filter Banner */}
          {searchQuery && (
            <div className="store-active-query-bar">
              <span>
                Found <strong className="tabular-nums">{filteredItems.length.toLocaleString()}</strong> products for "
                <strong>{searchQuery}</strong>" in{" "}
                <strong>{selectedCategory === "ALL" ? "All Departments" : selectedCategory}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setPage(1);
                }}
                className="store-clear-search-btn"
                style={{ minHeight: 44, padding: "0 8px" }}
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Store Toolbar: Counts, Sorting & View Toggle */}
          <div className="store-toolbar">
            <div className="store-toolbar-count tabular-nums">
              Showing <strong>{startIndex.toLocaleString()}-{endIndex.toLocaleString()}</strong> of{" "}
              <strong>{filteredItems.length.toLocaleString()}</strong> products
            </div>

            <div className="store-toolbar-controls">
              {/* Sort Selector */}
              <div className="store-sort-wrap">
                <ArrowUpDown size={14} className="store-sort-icon" aria-hidden="true" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "relevance" | "name" | "sku")}
                  className="store-sort-select"
                  style={{ minHeight: 44 }}
                  aria-label="Sort products"
                >
                  <option value="relevance">Default Order</option>
                  <option value="name">Product Name (A-Z)</option>
                  <option value="sku">SKU Code</option>
                </select>
              </div>

              {/* View Switcher: Store Grid vs Table View */}
              <div className="store-view-toggle">
                <button
                  type="button"
                  className={`store-view-btn ${viewMode === "store" ? "is-active" : ""}`}
                  style={{ minHeight: 44 }}
                  onClick={() => setViewMode("store")}
                  title="Shopping Store Grid View"
                  aria-label="Grid view"
                >
                  <LayoutGrid size={15} aria-hidden="true" />
                  <span>Store Grid</span>
                </button>
                <button
                  type="button"
                  className={`store-view-btn ${viewMode === "table" ? "is-active" : ""}`}
                  style={{ minHeight: 44 }}
                  onClick={() => setViewMode("table")}
                  title="List Table View"
                  aria-label="List table view"
                >
                  <List size={15} aria-hidden="true" />
                  <span>Data Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 ? (
            <div className="store-empty-box">
              <Package size={44} strokeWidth={1.5} className="store-empty-icon" />
              <h3>{isMalay ? "Tiada produk ditemui" : "No matching products found"}</h3>
              <p>
                {isMalay
                  ? "Cuba kata carian berbeza atau pilih jabatan lain dari senarai."
                  : "Try checking your spelling, removing keywords, or switching departments."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                  setFilterPhotosOnly(false);
                  setPage(1);
                }}
                className="btn btn-primary"
              >
                Browse All Products
              </button>
            </div>
          ) : viewMode === "store" ? (
            /* =========================================================================
               NICE SHOPPING STORE PRODUCT GRID (STAGGERED ANIMATIONS, ZERO CURVES)
               ========================================================================= */
            <div className="store-grid" key={`page-${page}-${selectedCategory}`}>
              {paginatedItems.map((item, idx) => {
                const resolvedImg = getProductImageUrl(item.image);
                const activeVar = cardVariants[item.itemCode] || (item.variants && item.variants.length > 0 ? item.variants[0] : null);
                const displayCode = activeVar ? activeVar.itemCode : item.itemCode;
                const displayBarcode = activeVar ? activeVar.barcode : item.barcode;
                const displaySpec = activeVar ? activeVar.spec : item.spec;

                return (
                  <article
                    key={`${item.itemCode}-${idx}`}
                    className="store-card store-card-animated"
                    style={{ "--card-index": idx } as React.CSSProperties}
                    onClick={() => openItemModal(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openItemModal(item);
                      }
                    }}
                  >
                    {/* Product Photo Showcase */}
                    <div className="store-card-media">
                      {resolvedImg ? (
                        <img
                          src={resolvedImg}
                          alt={item.description}
                          loading="lazy"
                          className="store-card-img"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector(".store-card-no-img")) {
                              const fallback = document.createElement("div");
                              fallback.className = "store-card-no-img";
                              fallback.innerHTML = "<span>Verified Hardware Spec</span>";
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      ) : (
                        <div className="store-card-no-img">
                          <Package size={36} strokeWidth={1.4} />
                          <span>Standard Hardware Spec</span>
                        </div>
                      )}

                      {/* Multi-Size Count Badge (No In-Stock or OUM slop) */}
                      {item.variants && item.variants.length > 1 && (
                        <div className="store-card-badge-row">
                          <span className="store-sizes-badge">
                            {item.variants.length} Sizes Available
                          </span>
                        </div>
                      )}

                      {/* Quick Hover Overlay */}
                      <div className="store-card-hover-overlay">
                        <span className="store-quick-view-text">
                          <Eye size={13} /> Quick Specs
                        </span>
                      </div>
                    </div>

                      {/* Product Card Content */}
                    <div className="store-card-body">
                      <div className="store-card-meta-top">
                        <span className="store-card-dept">{item.category}</span>
                        {item.brand && item.brand !== "Standard Trade" && (
                          <span className="store-card-brand-pill">{item.brand}</span>
                        )}
                      </div>

                      <h3 className="store-card-title" title={item.description}>
                        <HighlightedText text={item.description} queryTokens={queryTokens} />
                      </h3>

                      {/* Interactive Size Variant Dropdown right on Card */}
                      {item.variants && item.variants.length > 1 ? (
                        <div className="store-card-variant-box" onClick={(e) => e.stopPropagation()}>
                          <label className="store-card-variant-label" htmlFor={`variant-select-${item.itemCode}`}>
                            Size:
                          </label>
                          <select
                            id={`variant-select-${item.itemCode}`}
                            className="store-card-variant-dropdown"
                            style={{ minHeight: 44 }}
                            value={activeVar?.itemCode || item.itemCode}
                            onChange={(e) => {
                              const chosen = item.variants?.find((v) => v.itemCode === e.target.value);
                              if (chosen) {
                                setCardVariants((prev) => ({
                                  ...prev,
                                  [item.itemCode]: chosen
                                }));
                              }
                            }}
                          >
                            {item.variants.map((v) => (
                              <option key={v.itemCode} value={v.itemCode}>
                                {v.spec}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        displaySpec && displaySpec !== "Standard Jobsite Grade" && (
                          <div className="store-card-spec-row">
                            <Tag size={11} className="store-spec-icon" aria-hidden="true" />
                            <span className="store-card-spec-val">{displaySpec}</span>
                          </div>
                        )
                      )}

                      <div className="store-card-meta">
                        <div className="store-card-barcode">
                          <Barcode size={13} aria-hidden="true" />
                          <code className="tabular-nums">
                            <HighlightedText text={displayBarcode} queryTokens={queryTokens} />
                          </code>
                        </div>
                        <span className="store-card-sku tabular-nums">SKU: {displayCode}</span>
                      </div>

                      {/* Store Card Footer: Inquire / View Button */}
                      <div className="store-card-footer">
                        <button
                          type="button"
                          className="store-card-action-btn"
                          style={{ minHeight: 44 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openItemModal(item);
                          }}
                        >
                          <Eye size={14} aria-hidden="true" />
                          <span>View Product</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* =========================================================================
               DATA TABLE VIEW (FOR QUICK AUDIT)
               ========================================================================= */
            <div className="db-table-container">
              <table className="db-table">
                <thead>
                  <tr>
                    <th style={{ width: "50px" }}>#</th>
                    <th style={{ width: "64px" }}>Photo</th>
                    <th style={{ width: "170px" }}>
                      <span className="db-th-flex">
                        <Barcode size={14} />
                        Barcode / Code
                      </span>
                    </th>
                    <th>Description</th>
                    <th style={{ width: "140px" }}>Brand / Spec</th>
                    <th style={{ width: "190px" }}>
                      <span className="db-th-flex">
                        <Layers size={14} />
                        Category
                      </span>
                    </th>
                    <th style={{ width: "80px", textAlign: "right" }}>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item, idx) => {
                    const rowNumber = (page - 1) * itemsPerPage + idx + 1;
                    const resolvedImg = getProductImageUrl(item.image);
                    return (
                      <tr
                        key={`${item.itemCode}-${idx}`}
                        className="db-row db-row-clickable"
                        onClick={() => setSelectedItem(item)}
                      >
                        <td className="db-cell-num tabular-nums">{rowNumber}</td>
                        <td className="db-cell-thumb">
                          {resolvedImg ? (
                            <img
                              src={resolvedImg}
                              alt={item.description}
                              loading="lazy"
                              className="db-thumb-img"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLElement;
                                target.style.display = "none";
                                const parent = target.parentElement;
                                if (parent && !parent.querySelector(".db-thumb-empty")) {
                                  const fallback = document.createElement("div");
                                  fallback.className = "db-thumb-empty";
                                  fallback.innerText = "Spec";
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          ) : (
                            <div className="db-thumb-empty" title="Standard Specification Item">
                              Spec
                            </div>
                          )}
                        </td>
                        <td className="db-cell-code">
                          <code className="db-barcode-pill tabular-nums">
                            <HighlightedText text={item.barcode} queryTokens={queryTokens} />
                          </code>
                        </td>
                        <td className="db-cell-desc">
                          <div className="db-desc-text">
                            <HighlightedText text={item.description} queryTokens={queryTokens} />
                          </div>
                        </td>
                        <td className="db-cell-spec">
                          <span className="db-spec-pill">{item.brand || "Standard Trade"}</span>
                        </td>
                        <td className="db-cell-cat">
                          <span className="db-cat-tag">{item.category}</span>
                        </td>
                        <td className="db-cell-action" style={{ textAlign: "right" }}>
                          <button
                            type="button"
                            className="db-row-view-btn"
                            style={{ minHeight: 44, minWidth: 44 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                            title="Open item specifications & photo"
                          >
                            <Eye size={13} aria-hidden="true" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Clean Pagination Bar */}
          {totalPages > 1 && (
            <div className="store-pagination-bar">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="store-page-nav-btn"
                style={{ minHeight: 44, minWidth: 44 }}
              >
                <ChevronLeft size={16} aria-hidden="true" />
                <span>Prev</span>
              </button>

              <span className="store-page-status tabular-nums">
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="store-page-nav-btn"
                style={{ minHeight: 44, minWidth: 44 }}
              >
                <span>Next</span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          NICE & BIG SCREEN PRODUCT POP-UP MENU / MODAL (ZERO CURVES, PURE WHITE)
         ========================================================================= */}
      {selectedItem && (
        <div
          className="db-modal-overlay"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-item-title"
        >
          <div
            className="db-modal-card db-modal-animated"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="db-modal-topbar">
              <div className="db-modal-topbar-left">
                <span className="db-modal-cat-badge">{selectedItem.category}</span>
                {selectedIndex >= 0 && (
                  <span className="db-modal-counter tabular-nums">
                    Product <strong>{selectedIndex + 1}</strong> of <strong>{filteredItems.length.toLocaleString()}</strong>
                  </span>
                )}
              </div>

              <div className="db-modal-topbar-actions">
                <div className="db-modal-nav-group">
                  <button
                    type="button"
                    className="db-modal-nav-btn"
                    style={{ minHeight: 44, minWidth: 44 }}
                    disabled={selectedIndex <= 0}
                    onClick={handlePrevItem}
                    title="Previous item (Left Arrow)"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    className="db-modal-nav-btn"
                    style={{ minHeight: 44, minWidth: 44 }}
                    disabled={selectedIndex >= filteredItems.length - 1}
                    onClick={handleNextItem}
                    title="Next item (Right Arrow)"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>

                <button
                  type="button"
                  className="db-modal-close-btn"
                  style={{ minWidth: 44, minHeight: 44 }}
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close dialog (Escape)"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Modal Body: Big Screen Photo + Specs */}
            <div className="db-modal-body">
              {/* Left Column: Big Product Photo Frame */}
              <div className="db-modal-media-col">
                <div className="db-modal-img-frame">
                  {selectedItem.image ? (
                    <img
                      src={getProductImageUrl(selectedItem.image)}
                      alt={selectedItem.description}
                      className="db-modal-img"
                    />
                  ) : (
                    <div className="db-modal-no-img">
                      <Package size={52} strokeWidth={1.5} className="db-modal-no-img-icon" aria-hidden="true" />
                      <span className="db-modal-no-img-title">Standard Specification Item</span>
                      <span className="db-modal-no-img-sub">
                        Physical inventory available at Bandar Seri Coalfields warehouse
                      </span>
                    </div>
                  )}
                </div>
                {selectedItem.image && (
                  <div className="db-modal-img-caption">
                    <span>SKL Hardware Master Inventory</span>
                  </div>
                )}
              </div>

              {/* Right Column: Information & Direct Inquiries */}
              <div className="db-modal-info-col">
                <div className="db-modal-sku-row">
                  <span className="db-modal-sku-label">SKU Code:</span>
                  <strong className="db-modal-sku-value tabular-nums">
                    {modalVariant?.itemCode || selectedItem.itemCode}
                  </strong>
                  <span className="db-modal-dept-badge">{selectedItem.category}</span>
                </div>

                <h2 id="modal-item-title" className="db-modal-title">
                  {selectedItem.description}
                </h2>

                {/* Multi-Size Variant Selector in Modal */}
                {selectedItem.variants && selectedItem.variants.length > 1 && (
                  <div className="db-modal-variants-section">
                    <div className="db-modal-variants-top">
                      <span className="db-modal-variants-title tabular-nums">
                        Available Sizes ({selectedItem.variants.length}):
                      </span>
                      <span className="db-modal-variants-active-spec">
                        Active: <strong>{modalVariant?.spec || selectedItem.spec}</strong>
                      </span>
                    </div>

                    <div className="db-modal-variant-chips">
                      {selectedItem.variants.map((v) => {
                        const isSelected = (modalVariant?.itemCode || selectedItem.itemCode) === v.itemCode;
                        return (
                          <button
                            key={v.itemCode}
                            type="button"
                            className={`db-modal-variant-chip ${isSelected ? "is-active" : ""}`}
                            style={{ minHeight: 44, minWidth: 44 }}
                            onClick={() => {
                              setModalVariant(v);
                              setCopiedBarcode(false);
                            }}
                          >
                            <span>{v.spec}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Prominent Barcode Box with 1-Click Copy */}
                <div className="db-modal-barcode-box">
                  <div className="db-modal-barcode-top">
                    <span className="db-modal-barcode-label">
                      <Barcode size={15} aria-hidden="true" />
                      Barcode / EAN
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyBarcode(modalVariant?.barcode || selectedItem.barcode)}
                      className="db-modal-copy-btn"
                      style={{ minHeight: 44, minWidth: 44 }}
                      title="Copy Barcode to clipboard"
                    >
                      {copiedBarcode ? (
                        <>
                          <Check size={14} className="text-emerald" aria-hidden="true" />
                          <span className="text-emerald">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} aria-hidden="true" />
                          <span>Copy Barcode</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="db-modal-barcode-code tabular-nums">
                    {modalVariant?.barcode || selectedItem.barcode || "No Barcode Assigned"}
                  </div>
                </div>

                {/* Warehouse Specifications Matrix */}
                <div className="db-modal-specs-grid">
                  <div className="db-modal-spec-cell">
                    <span className="db-spec-label">Brand / Manufacturer</span>
                    <span className="db-spec-val">{selectedItem.brand || "Standard Trade"}</span>
                  </div>
                  <div className="db-modal-spec-cell">
                    <span className="db-spec-label">Selected Specification</span>
                    <span className="db-spec-val">{modalVariant?.spec || selectedItem.spec || "Standard Jobsite Grade"}</span>
                  </div>
                  <div className="db-modal-spec-cell">
                    <span className="db-spec-label">Category Department</span>
                    <span className="db-spec-val">{selectedItem.category}</span>
                  </div>
                  <div className="db-modal-spec-cell">
                    <span className="db-spec-label">Depot Facility</span>
                    <span className="db-spec-val">Bandar Seri Coalfields</span>
                  </div>
                </div>

                {/* Application & Technical Highlights */}
                {selectedItem.application && (
                  <div className="db-modal-app-box">
                    <span className="db-spec-label">Contractor Application</span>
                    <p className="db-modal-app-text">{selectedItem.application}</p>
                  </div>
                )}

                {/* Direct Action Buttons */}
                <div className="db-modal-actions">
                  <a
                    href={`https://wa.me/60199144743?text=${encodeURIComponent(
                      `Hello SKL Hardware, I would like to inquire about:\n*${selectedItem.description}*\nSize / Spec: ${modalVariant?.spec || selectedItem.spec}\nSKU Code: ${modalVariant?.itemCode || selectedItem.itemCode}\nBarcode: ${modalVariant?.barcode || selectedItem.barcode}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="db-modal-btn db-modal-btn-wa"
                    style={{ minHeight: 44 }}
                  >
                    <MessageSquare size={16} aria-hidden="true" />
                    <span>WhatsApp Inquiry for Pricing</span>
                  </a>

                  <a
                    href="tel:+60199144743"
                    className="db-modal-btn db-modal-btn-call"
                    style={{ minHeight: 44 }}
                  >
                    <Phone size={16} aria-hidden="true" />
                    <span className="tabular-nums">Call Warehouse (+60 19-914 4743)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
