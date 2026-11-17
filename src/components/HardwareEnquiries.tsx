import React, { useState } from "react";
import {
  BrickWall,
  Layers,
  Grid,
  Box,
  Mountain,
  Package,
  Workflow,
  SlidersHorizontal,
  Droplets,
  Disc,
  Paintbrush,
  Hammer,
  Wrench,
  ArrowRight,
  Search
} from "lucide-react";
import { useLanguage } from "../context/useLanguage";
import { assetUrl } from "../utils/asset";

interface HardwareEnquiriesProps {
  onOpenCatalogue?: (initialCategory?: string, initialQuery?: string) => void;
}

interface CatalogueCardItem {
  id: string;
  group: "BUILDING MATERIALS" | "PLUMBING SUPPLIES" | "HARDWARE & TOOLS";
  titleEn: string;
  titleMs: string;
  labelEn: string;
  labelMs: string;
  image: string;
  fallbackImage: string;
  icon: React.ReactNode;
  portalCategory: string;
  searchQuery: string;
}

const SHOWCASE_ITEMS: CatalogueCardItem[] = [
  // GROUP 1: BUILDING MATERIALS (6 cards)
  {
    id: "cement-bags",
    group: "BUILDING MATERIALS",
    titleEn: "Cement Bags",
    titleMs: "Beg Simen",
    labelEn: "Building Materials",
    labelMs: "Bahan Binaan",
    image: "/catalogue/cement-portland-50kg.jpeg",
    fallbackImage: "/catalogue/weber-skimcoat-base-grey.jpeg",
    icon: <Package size={15} strokeWidth={2} />,
    portalCategory: "BUILDING MATERIALS",
    searchQuery: "Simen"
  },
  {
    id: "red-bricks",
    group: "BUILDING MATERIALS",
    titleEn: "Red Bricks",
    titleMs: "Bata Merah",
    labelEn: "Building Materials",
    labelMs: "Bahan Binaan",
    image: "/catalogue/batu-merah-common-brick.jpeg",
    fallbackImage: "/catalogue/batu-merah-common-brick-per-pcs.jpeg",
    icon: <BrickWall size={15} strokeWidth={2} />,
    portalCategory: "BUILDING MATERIALS",
    searchQuery: "Bata"
  },
  {
    id: "sand",
    group: "BUILDING MATERIALS",
    titleEn: "Sand",
    titleMs: "Pasir",
    labelEn: "Building Materials",
    labelMs: "Bahan Binaan",
    image: "/catalogue/fine-sand-tng.jpg",
    fallbackImage: "/catalogue/pasir-guni-beg.jpg",
    icon: <Mountain size={15} strokeWidth={2} />,
    portalCategory: "BUILDING MATERIALS",
    searchQuery: "Pasir"
  },
  {
    id: "aac-blocks",
    group: "BUILDING MATERIALS",
    titleEn: "AAC Blocks",
    titleMs: "Blok AAC",
    labelEn: "Building Materials",
    labelMs: "Bahan Binaan",
    image: "/catalogue/light-weight-block-100mm-t-x-200mm-h-x-600mm-w.jpeg",
    fallbackImage: "/catalogue/hollow-block-clean.jpeg",
    icon: <Box size={15} strokeWidth={2} />,
    portalCategory: "BUILDING MATERIALS",
    searchQuery: "Block"
  },
  {
    id: "pavers",
    group: "BUILDING MATERIALS",
    titleEn: "Pavers",
    titleMs: "Batu Paver",
    labelEn: "Building Materials",
    labelMs: "Bahan Binaan",
    image: "/catalogue/batu-lantai-tapak-60mm-interlocking-paver-uni-paver-red.jpeg",
    fallbackImage: "/catalogue/pbm-grass-paver.jpeg",
    icon: <Grid size={15} strokeWidth={2} />,
    portalCategory: "BUILDING MATERIALS",
    searchQuery: "Paver"
  },
  {
    id: "aggregates",
    group: "BUILDING MATERIALS",
    titleEn: "Aggregates",
    titleMs: "Batu Baur",
    labelEn: "Building Materials",
    labelMs: "Bahan Binaan",
    image: "/catalogue/aggregate-3-4-tng.jpg",
    fallbackImage: "/catalogue/batu-3-4-guni-beg.jpg",
    icon: <Layers size={15} strokeWidth={2} />,
    portalCategory: "BUILDING MATERIALS",
    searchQuery: "Batu"
  },

  // GROUP 2: PLUMBING SUPPLIES (3 cards)
  {
    id: "hansen-poly-pipes",
    group: "PLUMBING SUPPLIES",
    titleEn: "Hansen Poly Pipes",
    titleMs: "Paip Poly & HDPE",
    labelEn: "Plumbing Supplies",
    labelMs: "Bekalan Paip",
    image: "/catalogue/piping/hdpe-poly-pipe-roll.webp",
    fallbackImage: "/catalogue/hdpe-poly-pipe-roll.webp",
    icon: <Workflow size={15} strokeWidth={2} />,
    portalCategory: "PIPING & PLUMBING",
    searchQuery: "Poly"
  },
  {
    id: "poly-pipe-fittings",
    group: "PLUMBING SUPPLIES",
    titleEn: "Poly Pipe Fittings",
    titleMs: "Penyambung Paip Poly",
    labelEn: "Plumbing Supplies",
    labelMs: "Bekalan Paip",
    image: "/catalogue/piping/hansen-fitting-equal-tee-25mm.webp",
    fallbackImage: "/catalogue/hansen-fitting-equal-socket-25mm.webp",
    icon: <SlidersHorizontal size={15} strokeWidth={2} />,
    portalCategory: "PIPING & PLUMBING",
    searchQuery: "Hansen"
  },
  {
    id: "plumbing-accessories",
    group: "PLUMBING SUPPLIES",
    titleEn: "Plumbing Accessories",
    titleMs: "Aksesori Paip",
    labelEn: "Plumbing Supplies",
    labelMs: "Bekalan Paip",
    image: "/catalogue/pvc-solvent-cement-glue.webp",
    fallbackImage: "/catalogue/pvc-fitting-equal-tee-1-2-039-039-2-039-039.webp",
    icon: <Droplets size={15} strokeWidth={2} />,
    portalCategory: "PIPING & PLUMBING",
    searchQuery: "PVC"
  },

  // GROUP 3: HARDWARE & TOOLS (5 cards)
  {
    id: "cutting-discs",
    group: "HARDWARE & TOOLS",
    titleEn: "Cutting Discs",
    titleMs: "Mata Pemotong",
    labelEn: "Hardware & Tools",
    labelMs: "Perkakasan & Alatan",
    image: "/chinchunimages/cutting-tools/akoda-wood-saw-blade-230mm-9-x-80t-atct230080-cutting-tools-.jpeg",
    fallbackImage: "/chinchunimages/cutting-tools/akoda-wood-saw-blade-100mm-4-x-40t-atct110040-cutting-tools-.jpeg",
    icon: <Disc size={15} strokeWidth={2} />,
    portalCategory: "CUTTING TOOLS",
    searchQuery: ""
  },
  {
    id: "sealants",
    group: "HARDWARE & TOOLS",
    titleEn: "Sealants",
    titleMs: "Pengedap & Kalis Air",
    labelEn: "Hardware & Tools",
    labelMs: "Perkakasan & Alatan",
    image: "/chinchunimages/waterproofing-sealant/sikasil-119-multipurpose-neutral-silicone-black-270ml-waterp.jpeg",
    fallbackImage: "/chinchunimages/waterproofing-sealant/sika-04kg-sikacoat-333-grey-waterproofing-sealant-selangor-k.jpeg",
    icon: <Droplets size={15} strokeWidth={2} />,
    portalCategory: "WATERPROOFING & SEALANT",
    searchQuery: ""
  },
  {
    id: "paints",
    group: "HARDWARE & TOOLS",
    titleEn: "Paints",
    titleMs: "Cat & Kemasan",
    labelEn: "Hardware & Tools",
    labelMs: "Perkakasan & Alatan",
    image: "/chinchunimages/nippon-paint/nippon-weatherbond-ultimate-1-lit-5-lit-15-lit-paint-nippon-.jpeg",
    fallbackImage: "/chinchunimages/nippon-paint/nippon-spotless-plus-sheen-paint-nippon-paint-selangor-kl-sh.jpeg",
    icon: <Paintbrush size={15} strokeWidth={2} />,
    portalCategory: "PAINT",
    searchQuery: ""
  },
  {
    id: "hand-tools",
    group: "HARDWARE & TOOLS",
    titleEn: "Hand Tools",
    titleMs: "Alatan Tangan",
    labelEn: "Hardware & Tools",
    labelMs: "Perkakasan & Alatan",
    image: "/catalogue/dongcheng-20v-cordless-brushless-rotary-hammer-dczc02-26ek-p.png",
    fallbackImage: "/catalogue/bosch-angle-grinder-gws-750-100-set-c-w-tool-box-power-tools.jpeg",
    icon: <Hammer size={15} strokeWidth={2} />,
    portalCategory: "TOOLS",
    searchQuery: ""
  },
  {
    id: "workshop-tools",
    group: "HARDWARE & TOOLS",
    titleEn: "Workshop Tools",
    titleMs: "Peralatan Bengkel",
    labelEn: "Hardware & Tools",
    labelMs: "Perkakasan & Alatan",
    image: "/catalogue/milwaukee-circular-saw-m18-fcs66-0-bare-power-tools-milwauke.png",
    fallbackImage: "/catalogue/milwaukee-vsr-angle-grinder-m18-fsagv100xb-0x0-bare-power-to.png",
    icon: <Wrench size={15} strokeWidth={2} />,
    portalCategory: "TOOLS",
    searchQuery: "Milwaukee"
  }
];

export const HardwareEnquiries: React.FC<HardwareEnquiriesProps> = ({ onOpenCatalogue }) => {
  const { t, language } = useLanguage();
  const isMalay = language === "ms";
  const [activeTab, setActiveTab] = useState<"ALL" | "BUILDING MATERIALS" | "PLUMBING SUPPLIES" | "HARDWARE & TOOLS">("ALL");

  const groups: Array<{
    key: "BUILDING MATERIALS" | "PLUMBING SUPPLIES" | "HARDWARE & TOOLS";
    title: string;
  }> = [
    { key: "BUILDING MATERIALS", title: t.catalogueShowcase.group1Title },
    { key: "PLUMBING SUPPLIES", title: t.catalogueShowcase.group2Title },
    { key: "HARDWARE & TOOLS", title: t.catalogueShowcase.group3Title }
  ];

  const visibleGroups = activeTab === "ALL" ? groups : groups.filter(g => g.key === activeTab);

  return (
    <section id="catalogue-showcase" className="section catalogue-showcase-section" aria-labelledby="catalogue-showcase-title">
      <div className="container">
        {/* Clean Top Bar: Title + Filter Pills + Full Directory Action */}
        <div className="showcase-header">
          <div className="showcase-header-copy">
            <h2 id="catalogue-showcase-title" className="section-title">
              {t.catalogueShowcase.title}
            </h2>
            <p className="section-desc">
              {t.catalogueShowcase.subtitle}
            </p>
          </div>

          <div className="showcase-controls-right">
            <div className="showcase-filter-tabs" role="tablist" aria-label="Product Category Groups">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "ALL"}
                onClick={() => setActiveTab("ALL")}
                className={`showcase-tab-btn ${activeTab === "ALL" ? "is-active" : ""}`}
              >
                {isMalay ? "Semua" : "All"}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "BUILDING MATERIALS"}
                onClick={() => setActiveTab("BUILDING MATERIALS")}
                className={`showcase-tab-btn ${activeTab === "BUILDING MATERIALS" ? "is-active" : ""}`}
              >
                {t.catalogueShowcase.group1Title}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "PLUMBING SUPPLIES"}
                onClick={() => setActiveTab("PLUMBING SUPPLIES")}
                className={`showcase-tab-btn ${activeTab === "PLUMBING SUPPLIES" ? "is-active" : ""}`}
              >
                {t.catalogueShowcase.group2Title}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "HARDWARE & TOOLS"}
                onClick={() => setActiveTab("HARDWARE & TOOLS")}
                className={`showcase-tab-btn ${activeTab === "HARDWARE & TOOLS" ? "is-active" : ""}`}
              >
                {t.catalogueShowcase.group3Title}
              </button>
            </div>

            {onOpenCatalogue && (
              <button
                type="button"
                onClick={() => onOpenCatalogue("ALL", "")}
                className="btn btn-primary showcase-full-dir-btn"
              >
                <Search size={16} strokeWidth={2} />
                <span>{t.catalogueShowcase.viewAllBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Groups & Visual Product Cards */}
        <div className="showcase-groups-stack">
          {visibleGroups.map((group) => {
            const items = SHOWCASE_ITEMS.filter((item) => item.group === group.key);

            return (
              <div key={group.key} className="showcase-category-block">
                <div className="showcase-group-header">
                  <h3 className="showcase-group-title">{group.title}</h3>
                  {onOpenCatalogue && (
                    <button
                      type="button"
                      onClick={() => onOpenCatalogue(items[0]?.portalCategory)}
                      className="showcase-group-link"
                    >
                      <span>{t.catalogueShowcase.browseCategoryBtn}</span>
                      <ArrowRight size={15} strokeWidth={2} />
                    </button>
                  )}
                </div>

                <div className="showcase-cards-grid">
                  {items.map((item) => {
                    const title = isMalay ? item.titleMs : item.titleEn;
                    const label = isMalay ? item.labelMs : item.labelEn;

                    return (
                      <article
                        key={item.id}
                        className="showcase-product-card"
                        onClick={() => onOpenCatalogue && onOpenCatalogue(item.portalCategory, item.searchQuery)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if ((e.key === "Enter" || e.key === " ") && onOpenCatalogue) {
                            e.preventDefault();
                            onOpenCatalogue(item.portalCategory, item.searchQuery);
                          }
                        }}
                        aria-label={`${title} - ${label}`}
                      >
                        <div className="showcase-card-media">
                          <img
                            src={assetUrl(item.image)}
                            alt={title}
                            className="showcase-card-img"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget;
                              const fb = assetUrl(item.fallbackImage);
                              if (target.src !== fb) {
                                target.src = fb;
                              }
                            }}
                          />
                          <div className="showcase-card-category-chip">
                            {item.icon}
                            <span>{label}</span>
                          </div>
                        </div>

                        <div className="showcase-card-body">
                          <h4 className="showcase-card-title">{title}</h4>
                          <ArrowRight size={17} strokeWidth={2} className="showcase-card-arrow" />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
