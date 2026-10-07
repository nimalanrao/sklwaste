export type Language = "en" | "ms";

export interface Translations {
  nav: {
    home: string;
    about: string;
    catalogue: string;
    hardware: string;
    gallery: string;
    location: string;
    contact: string;
    getDirections: string;
    callStore: string;
    openStatus: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    getDirections: string;
    callNow: string;
    callBoss: string;
    callNight: string;
    ratingText: string;
    locationBadge: string;
    hoursLabel: string;
    hoursValue: string;
    hoursDesc: string;
    photoCaptionTag: string;
    photoCaptionText: string;
    shiftsTitle: string;
    dayShiftLabel: string;
    dayShiftVal: string;
    nightShiftLabel: string;
    nightShiftVal: string;
    scrollCue: string;
  };
  shiftsSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    dayShiftTitle: string;
    dayShiftHours: string;
    dayShiftName: string;
    dayShiftRole: string;
    dayShiftDesc: string;
    dayShiftAction: string;
    nightShiftTitle: string;
    nightShiftHours: string;
    nightShiftName: string;
    nightShiftRole: string;
    nightShiftDesc: string;
    nightShiftAction: string;
    whatsappAction: string;
    notice: string;
  };
  quickInfo: {
    typeLabel: string;
    typeVal: string;
    typeSub: string;
    locationLabel: string;
    locationVal: string;
    locationSub: string;
    phoneLabel: string;
    phoneSub: string;
    hoursLabel: string;
    hoursVal: string;
    hoursSub: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    callAction: string;
    directionsAction: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  hardware: {
    eyebrow: string;
    title: string;
    desc: string;
    bannerTitle: string;
    bannerSub: string;
    bannerButton: string;
    categoriesTitle: string;
    categoriesDesc: string;
    categoriesNote: string;
    commonSuppliesLabel: string;
    enquireAction: string;
    customerNoticeTitle: string;
    customerNotice: string;
    categories: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      commonItems: string[];
    }>;
  };
  gallery: {
    eyebrow: string;
    title: string;
    desc: string;
    viewPhoto: string;
    disclosure: string;
    items: Array<{
      id: string;
      title: string;
      category: string;
      alt: string;
    }>;
  };
  reviews: {
    eyebrow: string;
    title: string;
    ratingOutOf: string;
    countText: string;
    badgeTitle: string;
    badgeDesc: string;
    placeIdLabel: string;
    viewOnGoogle: string;
    disclaimer: string;
  };
  location: {
    eyebrow: string;
    title: string;
    desc: string;
    storefrontLabel: string;
    hoursHeader: string;
    hoursNotice: string;
    getDirections: string;
    openInGoogle: string;
    openInWaze: string;
    copyAddress: string;
    addressCopied: string;
    callStore: string;
    mapFooterText: string;
    navigate: string;
    ratingTitle: string;
    ratingReviewsCount: string;
    landmarkTitle: string;
    landmarkDesc: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    desc: string;
    phoneCardTitle: string;
    phoneCardDesc: string;
    phoneCardAction: string;
    afterHoursCardTitle: string;
    afterHoursCardDesc: string;
    afterHoursCardAction: string;
    visitCardTitle: string;
    visitCardDesc: string;
    visitCardTiming: string;
    visitCardAction: string;
  };
  footer: {
    tagline: string;
    navigationHeading: string;
    assistanceHeading: string;
    directionsAction: string;
    verifiedHoursText: string;
    copyright: string;
    backToTop: string;
  };
  loading: {
    loadingText: string;
    subtitle: string;
  };
  catalogue: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allFilter: string;
    bricksFilter: string;
    blocksFilter: string;
    paversFilter: string;
    ventFilter: string;
    inStock: string;
    enquireWhatsapp: string;
    viewSpecs: string;
    specTitle: string;
    appTitle: string;
    unitLabel: string;
    brandLabel: string;
    siteDeliveryNotice: string;
    bulkQuoteAction: string;
    backToHome: string;
    noResults: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      catalogue: "Catalogue",
      hardware: "Hardware",
      gallery: "Gallery",
      location: "Location & Hours",
      contact: "Contact",
      getDirections: "Get Directions",
      callStore: "Call Store",
      openStatus: "Open 24/7 · Sungai Buloh's Only 24/7 Hardware",
    },
    hero: {
      eyebrow: "24/7 HARDWARE · COALFIELDS",
      title: "Hardware & Building Materials. Open 24/7.",
      subtitle: "Cement, sand, bricks, poly pipes & workshop tools on Jalan Kuala Selangor. Open daily until 6 PM + 24/7 emergency site supply.",
      getDirections: "Get Directions",
      callNow: "Call 019-914 4743",
      callBoss: "Boss: 019-914 4743",
      callNight: "Night 24/7: 016-615 9365",
      ratingText: "4.5 Google Rating (9 Reviews)",
      locationBadge: "Bandar Seri Coalfields",
      hoursLabel: "Hours",
      hoursValue: "Open 24/7",
      hoursDesc: "Daily 8 AM – 6 PM + 24/7 on-call.",
      photoCaptionTag: "Store Yard",
      photoCaptionText: "Authentic store yard",
      shiftsTitle: "Store Shifts & Direct Contacts",
      dayShiftLabel: "Day Shift (8 AM – 6 PM)",
      dayShiftVal: "Mr. Saravanan · 019-914 4743",
      nightShiftLabel: "Night (24/7 On-Call)",
      nightShiftVal: "Mr. Hari · 016-615 9365",
      scrollCue: "Store shifts & contacts",
    },
    shiftsSection: {
      eyebrow: "STORE SHIFTS & CONTACTS",
      title: "Day Shifts & 24/7 Night Supply",
      subtitle: "Walk in during the day. Call directly for late-night emergency site supply.",
      dayShiftTitle: "Normal Store Shifts",
      dayShiftHours: "8:00 AM – 6:00 PM Daily",
      dayShiftName: "Mr. Saravanan",
      dayShiftRole: "Boss / Day Shifts",
      dayShiftDesc: "Immediate walk-in purchases: cement, sand, bricks, plumbing & workshop tools.",
      dayShiftAction: "Call 019-914 4743",
      nightShiftTitle: "After Hours & Night Supply",
      nightShiftHours: "6:00 PM – 8:00 AM (24/7 On-Call)",
      nightShiftName: "Mr. Hari",
      nightShiftRole: "24/7 Emergency Supply",
      nightShiftDesc: "Call Mr. Hari directly for late-night site deliveries, burst pipes & after-hours pickup.",
      nightShiftAction: "Call 016-615 9365",
      whatsappAction: "WhatsApp Mr. Hari",
      notice: "24/7 emergency site supply on Jalan Kuala Selangor.",
    },
    quickInfo: {
      typeLabel: "Store Type",
      typeVal: "Hardware & Materials",
      typeSub: "Kedai Hardware",
      locationLabel: "Location",
      locationVal: "Bandar Seri Coalfields",
      locationSub: "Jln Kuala Selangor",
      phoneLabel: "Phone",
      phoneSub: "Direct store line",
      hoursLabel: "Hours",
      hoursVal: "Open 24/7",
      hoursSub: "Daily + On-Call",
    },
    about: {
      eyebrow: "ABOUT THE STORE",
      title: "Building materials & hardware on Jalan Kuala Selangor.",
      lead: "Supplying cement, bricks, Hansen poly pipes, cutting discs, and repair tools to contractors and homeowners in Bandar Seri Coalfields.",
      body: "",
      callAction: "Call Store",
      directionsAction: "Get Directions",
      feature1Title: "Building Materials",
      feature1Desc: "Cement bags, red bricks, sand, AAC blocks, pavers & aggregates.",
      feature2Title: "Plumbing & Tools",
      feature2Desc: "Hansen poly fittings, cutting discs, sealants, paints & hand tools.",
      feature3Title: "24/7 Emergency Supply",
      feature3Desc: "Open 8 AM – 6 PM daily. 24/7 on-call emergency supply after 6 PM.",
    },
    hardware: {
      eyebrow: "HARDWARE SUPPLIES & ENQUIRIES",
      title: "Looking for Hardware Supplies?",
      desc: "Contact the store to enquire about the products you need. Our team can check in-store stock availability directly before you head over.",
      bannerTitle: "Need a specific size, part, or fitting?",
      bannerSub: "Avoid unnecessary trips by confirming item availability via phone. We are ready to assist.",
      bannerButton: "Call Store: 019-914 4743",
      categoriesTitle: "Common Hardware Categories",
      categoriesDesc: "Categories supported by the store. Specific item brands and live inventory can be confirmed via phone enquiry.",
      categoriesNote: "Store owner can update items anytime",
      commonSuppliesLabel: "Common Supplies:",
      enquireAction: "Enquire for",
      customerNoticeTitle: "Note for customers:",
      customerNotice: "We are continuously organizing in-store stocks. If you require specialty fittings or larger bulk quantities for building works, please call ahead in advance.",
      categories: [
        {
          id: "tools",
          title: "Hand Tools & Mechanical Equipment",
          subtitle: "Everyday & Workshop Tools",
          description: "Wrenches, pliers, hammers, tape measures, screwdrivers, utility cutters, and basic mechanical gear for home and site work.",
          commonItems: ["Wrenches & Sockets", "Pliers & Cutters", "Hammers & Mallets", "Measuring Tapes", "Utility Knives"],
        },
        {
          id: "fasteners",
          title: "Fasteners, Screws & Fixings",
          subtitle: "Precision Hardware Connections",
          description: "Extensive selection of bolts, machine screws, wood screws, drywall fixings, wall plugs, nuts, washers, and anchoring hardware.",
          commonItems: ["Drywall & Wood Screws", "Hex Bolts & Nuts", "Wall Plugs & Anchors", "Washers & Rivets", "Threaded Rods"],
        },
        {
          id: "plumbing",
          title: "Piping, Hansen & Plumbing Fittings",
          subtitle: "Hansen Poly, PVC (Class O & D), UPVC & Valving",
          description: "Complete water supply and drainage range: Hansen poly compression fittings, HDPE coils, Class O (nipis) & Class D/6 (tebal) PVC pipes, UPVC soil & waste, and solvent cement.",
          commonItems: ["Hansen Poly Fittings (20-32mm)", "PVC Pipes (Class O Nipis & Class D/6 Tebal)", "UPVC Soil & Waste Fittings", "Gam Paip Solvent Cement", "Brass Valves & Taps"],
        },
        {
          id: "electrical",
          title: "Electrical & Lighting Essentials",
          subtitle: "Wiring, Switches & Power",
          description: "Switches, trailing sockets, extension cords, insulation tapes, light bulbs, cable clips, and everyday electrical fittings.",
          commonItems: ["Extension Sockets", "Insulation Tapes", "LED Bulbs & Tubes", "Wall Switches & Plugs", "Cable Clips"],
        },
        {
          id: "paints-sealants",
          title: "Paints, Sealants & Adhesives",
          subtitle: "Surface Protection & Sealing",
          description: "Silicone sealants, epoxy adhesives, masking tapes, paint rollers, brushes, sandpaper, and general surface protection essentials.",
          commonItems: ["Silicone & Acrylic Sealants", "Epoxy & Super Glues", "Masking & Duct Tapes", "Paint Brushes & Rollers", "Sandpaper Sheets"],
        },
        {
          id: "building-maintenance",
          title: "Building & General Maintenance",
          subtitle: "Repair & Construction Supplies",
          description: "General hardware materials, wire meshes, safety gear, locks, padlocks, hinges, and essential maintenance supplies.",
          commonItems: ["Padlocks & Door Latches", "Hinges & Brackets", "Protective Gloves", "Wire Mesh & Ties", "Heavy-Duty Buckets"],
        },
      ],
    },
    gallery: {
      eyebrow: "STORE & HARDWARE GALLERY",
      title: "Supplies & Equipment Visual Showcase",
      desc: "Explore typical workshop tools, plumbing components, and fasteners stocked for local maintenance. Click any photo to enlarge.",
      viewPhoto: "View Photo",
      disclosure: "Photographs depict representative hardware categories, tools, and workshop supplies available through store enquiry.",
      items: [
        {
          id: "gal-1",
          title: "DongCheng 20V Cordless Brushless Rotary Hammer",
          category: "Power Tools",
          alt: "DongCheng 20V cordless brushless rotary hammer kit with battery and case",
        },
        {
          id: "gal-2",
          title: "Common Red Clay Bricks (Batu Merah)",
          category: "Bricks & Masonry",
          alt: "Stack of common red clay bricks for construction and walling",
        },
        {
          id: "gal-3",
          title: "Portland Cement (50kg Heavy-Duty Bag)",
          category: "Cement & Aggregates",
          alt: "Portland cement 50kg bag for structural mortar and concrete mixing",
        },
        {
          id: "gal-4",
          title: "Milwaukee M18 FUEL Circular Saw (165mm)",
          category: "Milwaukee Cordless",
          alt: "Milwaukee M18 FUEL cordless circular saw 165mm with blade",
        },
        {
          id: "gal-5",
          title: "Milwaukee M18 FUEL Angle Grinder (VSR)",
          category: "Power Tools & Grinders",
          alt: "Milwaukee M18 FUEL 100mm variable speed angle grinder",
        },
        {
          id: "gal-6",
          title: "Precast Concrete Hollow Blocks",
          category: "Blocks & Walling",
          alt: "Standard precast concrete hollow blocks for foundation and retaining walls",
        },
      ],
    },
    reviews: {
      eyebrow: "REPUTATION",
      title: "Google Business Profile Rating",
      ratingOutOf: "out of 5.0 rating",
      countText: "Based on 9 customer reviews submitted on Google Maps.",
      badgeTitle: "Public Listing Data",
      badgeDesc: "This score is recorded directly from the official Google Business Profile for SKL Waste Sdn Bhd in Bandar Seri Coalfields, Selangor.",
      placeIdLabel: "Place ID:",
      viewOnGoogle: "View Reviews on Google Maps",
      disclaimer: "We respect authentic customer feedback. Review text and profile details are maintained and verified directly on Google.",
    },
    location: {
      eyebrow: "LOCATION & HOURS",
      title: "Store Location & Map",
      desc: "Jalan Kuala Selangor, Bandar Seri Coalfields. Easy lorry access & parking.",
      storefrontLabel: "Storefront & Hardware Yard",
      hoursHeader: "Store Hours",
      hoursNotice: "Open 24/7. Walk-in daily 8:00 AM – 6:00 PM; 24/7 on-call after 6:00 PM.",
      getDirections: "Google Maps",
      openInGoogle: "View Google Reviews",
      openInWaze: "Waze",
      copyAddress: "Copy Address",
      addressCopied: "Address Copied!",
      callStore: "Call Store",
      mapFooterText: "Jalan Kuala Selangor, Bandar Seri Coalfields",
      navigate: "Navigate",
      ratingTitle: "Google Rating",
      ratingReviewsCount: "4.5 Rating · 9 Reviews",
      landmarkTitle: "Address",
      landmarkDesc: "Main road frontage along Jalan Kuala Selangor with easy lorry access.",
    },
    contact: {
      eyebrow: "DIRECT CONTACT",
      title: "Call or Visit Us",
      desc: "Call Mr. Saravanan during the day, or Mr. Hari for after-hours emergency supply.",
      phoneCardTitle: "Day Shifts (Boss)",
      phoneCardDesc: "Direct store purchases & general inquiries.",
      phoneCardAction: "Call 019-914 4743",
      afterHoursCardTitle: "Night Shift (24/7)",
      afterHoursCardDesc: "Urgent site deliveries & late-night supply.",
      afterHoursCardAction: "Call 016-615 9365",
      visitCardTitle: "Storefront Location",
      visitCardDesc: "Directly on Jalan Kuala Selangor.",
      visitCardTiming: "Open Daily until 6 PM",
      visitCardAction: "Get Directions",
    },
    footer: {
      tagline: "Hardware and building materials store in Bandar Seri Coalfields, Selangor. Open daily until 6 PM with 24/7 emergency site supply.",
      navigationHeading: "Navigation",
      assistanceHeading: "Contact",
      directionsAction: "Get Directions",
      verifiedHoursText: "Open 24/7 (8 AM – 6 PM Shifts · After 6 PM On-Call)",
      copyright: "All rights reserved.",
      backToTop: "Back to top",
    },
    loading: {
      loadingText: "SKL HARDWARE",
      subtitle: "Bandar Seri Coalfields, Selangor",
    },
    catalogue: {
      badge: "Official Inventory & Trade Supply",
      title: "Building Materials, Bricks & Pavers",
      subtitle: "Verified trade catalogue for building contractors, bricklayers, landscapers, and residential renovation projects in Bandar Seri Coalfields & Greater Selangor.",
      searchPlaceholder: "Search bricks, interlocking pavers, hollow blocks, AAC...",
      allFilter: "All Products",
      bricksFilter: "Clay & Sand Bricks",
      blocksFilter: "Concrete & AAC Blocks",
      paversFilter: "Interlocking Pavers",
      ventFilter: "Ventilation Blocks",
      inStock: "In Stock · Ready for Delivery / Self-Pickup",
      enquireWhatsapp: "Enquire via WhatsApp",
      viewSpecs: "View Specifications",
      specTitle: "Technical Specifications",
      appTitle: "Recommended Application",
      unitLabel: "Supply Unit",
      brandLabel: "Manufacturer / Brand",
      siteDeliveryNotice: "Lorry delivery available for site orders across Bandar Seri Coalfields, Sungai Buloh, Puncak Alam, and Shah Alam. Contact our logistics line directly.",
      bulkQuoteAction: "Request Bulk Pallet Quotation",
      backToHome: "Back to Home",
      noResults: "No products found matching your search. Please contact us directly for special order items.",
    },
  },
  ms: {
    nav: {
      home: "Laman Utama",
      about: "Tentang Kami",
      catalogue: "Katalog",
      hardware: "Barangan Hardware",
      gallery: "Galeri",
      location: "Lokasi & Waktu",
      contact: "Hubungi",
      getDirections: "Panduan Arah",
      callStore: "Hubungi Kedai",
      openStatus: "Buka 24/7 · Satu-Satunya Kedai Hardware 24 Jam di Sungai Buloh",
    },
    hero: {
      eyebrow: "KEDAI HARDWARE 24 JAM · COALFIELDS",
      title: "Bahan Binaan & Alatan Hardware. Buka 24 Jam.",
      subtitle: "Simen, pasir, bata, paip Hansen poly & perkakasan di Jalan Kuala Selangor. Buka setiap hari hingga 6 petang + bekalan kecemasan 24 jam.",
      getDirections: "Panduan Arah",
      callNow: "Hubungi 019-914 4743",
      callBoss: "Bos: 019-914 4743",
      callNight: "Malam 24/7: 016-615 9365",
      ratingText: "Penilaian 4.5 (9 Ulasan)",
      locationBadge: "Bandar Seri Coalfields",
      hoursLabel: "Waktu Kedai",
      hoursValue: "Buka 24 Jam",
      hoursDesc: "Setiap hari 8 PG – 6 PTG + bersedia 24 jam.",
      photoCaptionTag: "Tapak Kedai",
      photoCaptionText: "Tapak tulen SKL Waste",
      shiftsTitle: "Jadual Syif & Hubungi",
      dayShiftLabel: "Syif Siang (8 PG – 6 PTG)",
      dayShiftVal: "En. Saravanan · 019-914 4743",
      nightShiftLabel: "Malam (Bersedia 24/7)",
      nightShiftVal: "En. Hari · 016-615 9365",
      scrollCue: "Syif kedai & hubungi terus",
    },
    shiftsSection: {
      eyebrow: "JADUAL SYIF & TALIAN TERUS",
      title: "Syif Siang & Bekalan Malam 24 Jam",
      subtitle: "Beli terus di kedai waktu siang. Hubungi terus untuk bekalan kecemasan malam.",
      dayShiftTitle: "Syif Biasa Kedai",
      dayShiftHours: "8:00 PG – 6:00 PTG Setiap Hari",
      dayShiftName: "En. Saravanan",
      dayShiftRole: "Bos / Syif Siang",
      dayShiftDesc: "Pembelian terus: simen, pasir, batu bata, paip, paver & alatan kerja.",
      dayShiftAction: "Hubungi 019-914 4743",
      nightShiftTitle: "Malam & Selepas Waktu Kerja",
      nightShiftHours: "6:00 PTG – 8:00 PG (Bersedia 24/7)",
      nightShiftName: "En. Hari",
      nightShiftRole: "Bekalan Kecemasan 24/7",
      nightShiftDesc: "Hubungi En. Hari terus untuk pesanan kecemasan tapak, paip pecah & pengambilan malam.",
      nightShiftAction: "Hubungi 016-615 9365",
      whatsappAction: "WhatsApp En. Hari",
      notice: "Bekalan kecemasan 24/7 di Jalan Kuala Selangor.",
    },
    quickInfo: {
      typeLabel: "Jenis Perniagaan",
      typeVal: "Bahan Binaan & Hardware",
      typeSub: "Kedai Hardware",
      locationLabel: "Lokasi",
      locationVal: "Bandar Seri Coalfields",
      locationSub: "Jln Kuala Selangor",
      phoneLabel: "Telefon",
      phoneSub: "Talian terus",
      hoursLabel: "Waktu Kedai",
      hoursVal: "Buka 24 Jam",
      hoursSub: "Siang + Bersedia Malam",
    },
    about: {
      eyebrow: "TENTANG KEDAI",
      title: "Bahan binaan & hardware di Jalan Kuala Selangor.",
      lead: "Membekalkan simen, batu bata, penyambung paip Hansen poly, mata pemotong, dan perkakas kepada kontraktor serta pemilik rumah.",
      body: "",
      callAction: "Hubungi Kedai",
      directionsAction: "Panduan Arah",
      feature1Title: "Bahan Binaan & Tapak",
      feature1Desc: "Simen, bata merah, pasir, blok AAC, paver & batu agregat.",
      feature2Title: "Paip & Alatan Kerja",
      feature2Desc: "Penyambung paip Hansen, mata pemotong, silikon, cat & perkakas tangan.",
      feature3Title: "Bekalan Kecemasan 24/7",
      feature3Desc: "Buka 8 PG – 6 PTG setiap hari. Bekalan kecemasan 24 jam selepas 6 PTG.",
    },
    hardware: {
      eyebrow: "BEKALAN HARDWARE & PERTANYAAN",
      title: "Mencari Bekalan Hardware?",
      desc: "Hubungi kedai kami untuk bertanya tentang barangan yang anda perlukan. Pasukan kami boleh memeriksa stok sebelum anda ke kedai.",
      bannerTitle: "Memerlukan saiz, bahagian atau penyambung tertentu?",
      bannerSub: "Elakkan perjalanan sia-sia dengan mengesahkan stok melalui telefon. Kami sedia membantu anda.",
      bannerButton: "Hubungi Kedai: 019-914 4743",
      categoriesTitle: "Kategori Barangan Hardware",
      categoriesDesc: "Kategori yang dibekalkan oleh kedai. Jenama khusus dan kuantiti stok boleh disahkan melalui panggilan telefon.",
      categoriesNote: "Pemilik kedai boleh mengemaskini bila-bila masa",
      commonSuppliesLabel: "Contoh Barangan:",
      enquireAction: "Tanya tentang",
      customerNoticeTitle: "Nota untuk pelanggan:",
      customerNotice: "Kami sentiasa menyusun stok kedai. Jika anda memerlukan penyambung khas atau kuantiti pukal untuk binaan, sila hubungi kami terlebih dahulu.",
      categories: [
        {
          id: "tools",
          title: "Peralatan Tangan & Mekanikal",
          subtitle: "Peralatan Pertukangan & Bengkel",
          description: "Sepana, playar, tukul, pita pengukur, pemutar skru, pisau pemotong, dan perkakas asas untuk kerja rumah dan tapak projek.",
          commonItems: ["Sepana & Soket", "Playar & Pemotong", "Tukul & Penebuk", "Pita Pengukur", "Pisau Pemotong"],
        },
        {
          id: "fasteners",
          title: "Skru, Nat & Pengikat",
          subtitle: "Sambungan Hardware Berketepatan",
          description: "Pelbagai jenis bolt, skru mesin, skru kayu, palam dinding (wall plug), nat, sesendal, dan perkakas penambat.",
          commonItems: ["Skru Kayu & Drywall", "Bolt Hex & Nat", "Wall Plug & Penambat", "Sesendal (Washer)", "Rod Berbenang"],
        },
        {
          id: "plumbing",
          title: "Sistem Paip, Hansen & Kelengkapan Paiping",
          subtitle: "Hansen Poly, Paip PVC (Nipis & Tebal), UPVC & Injap",
          description: "Rangkaian lengkap bekalan air dan kumbahan: fitting poly Hansen, paip HDPE, paip PVC Class O (nipis) & Class D/6 (tebal), fitting saliran UPVC, dan gam paip simen pelarut.",
          commonItems: ["Fitting Poly Hansen (20-32mm)", "Paip PVC (Class O Nipis & Class D/6 Tebal)", "Fitting UPVC Saliran Kumbahan", "Gam Paip Simen Pelarut", "Injap Bebola & Kepala Paip Tembaga"],
        },
        {
          id: "electrical",
          title: "Barangan Elektrik & Lampu",
          subtitle: "Pendawaian, Suis & Kuasa",
          description: "Suis dinding, soket sambungan (extension), pita penebat, mentol lampu, klip kabel, dan aksesori elektrik harian.",
          commonItems: ["Soket Sambungan", "Pita Penebat Elektrik", "Mentol LED & Lampu", "Suis & Palam Dinding", "Klip Kabel"],
        },
        {
          id: "paints-sealants",
          title: "Cat, Gam & Pelekat Kalis Air",
          subtitle: "Perlindungan Permukaan & Pengedap",
          description: "Silikon pengedap, gam epoksi, pita pelekat kertas, penggelek cat, berus cat, kertas pasir, dan pelindung permukaan.",
          commonItems: ["Silikon Pengedap Kalis Air", "Gam Epoksi & Gam Kuat", "Pita Pelekat & Duct Tape", "Berus & Penggelek Cat", "Kertas Pasir"],
        },
        {
          id: "building-maintenance",
          title: "Bahan Binaan & Penyelenggaraan",
          subtitle: "Bekalan Pembaikan & Pembinaan",
          description: "Bahan perkakasan am, dawai jaring, sarung tangan keselamatan, kunci mangga, engsel pintu, dan baldi tugas berat.",
          commonItems: ["Kunci Mangga & Selak Pintu", "Engsel & Pendakap", "Sarung Tangan Keselamatan", "Jaring Dawai & Pengikat", "Baldi Tugas Berat"],
        },
      ],
    },
    gallery: {
      eyebrow: "GALERI KEDAI & HARDWARE",
      title: "Pameran Visual Barangan & Peralatan",
      desc: "Lihat peralatan bengkel, komponen paip, dan pengikat yang dibekalkan untuk penyelenggaraan tempatan. Klik untuk besarkan gambar.",
      viewPhoto: "Lihat Gambar",
      disclosure: "Gambar menunjukkan kategori barangan hardware dan peralatan bengkel yang boleh ditanya di kedai kami.",
      items: [
        {
          id: "gal-1",
          title: "DongCheng 20V Cordless Brushless Rotary Hammer",
          category: "Alatan Kuasa",
          alt: "Set DongCheng 20V rotary hammer tanpa wayar bersama bateri dan kotak simpanan",
        },
        {
          id: "gal-2",
          title: "Batu Merah Tanah Liat Biasa",
          category: "Batu Bata & Binaan",
          alt: "Susunan batu merah tanah liat untuk kerja binaan dinding",
        },
        {
          id: "gal-3",
          title: "Simen Portland (Beg 50kg)",
          category: "Simen & Pasir",
          alt: "Beg simen Portland 50kg untuk bancuhan konkrit dan kerja lepa",
        },
        {
          id: "gal-4",
          title: "Milwaukee M18 FUEL Gergaji Bulat (165mm)",
          category: "Gergaji Tanpa Wayar",
          alt: "Milwaukee M18 FUEL gergaji bulat tanpa wayar 165mm",
        },
        {
          id: "gal-5",
          title: "Milwaukee M18 FUEL Pengisar Sudut (VSR)",
          category: "Alatan Pengisar",
          alt: "Milwaukee M18 FUEL pengisar sudut 100mm pelbagai kelajuan",
        },
        {
          id: "gal-6",
          title: "Batu Blok Konkrit Berongga",
          category: "Blok & Dinding",
          alt: "Batu blok konkrit berongga piawai untuk binaan dinding dan tapak",
        },
      ],
    },
    reviews: {
      eyebrow: "REPUTASI",
      title: "Penarafan Profil Google Business",
      ratingOutOf: "daripada 5.0 bintang",
      countText: "Berdasarkan 9 ulasan pelanggan di Google Maps.",
      badgeTitle: "Data Penyenaraian Awam",
      badgeDesc: "Markah ini direkodkan secara langsung daripada Profil Google Business rasmi SKL Waste Sdn Bhd di Bandar Seri Coalfields, Selangor.",
      placeIdLabel: "ID Tempat:",
      viewOnGoogle: "Lihat Ulasan di Google Maps",
      disclaimer: "Kami menghargai maklum balas tulen pelanggan. Maklumat ulasan dan profil diuruskan terus di Google.",
    },
    location: {
      eyebrow: "LOKASI & WAKTU",
      title: "Lokasi Kedai & Peta",
      desc: "Jalan Kuala Selangor, Bandar Seri Coalfields. Akses lori & tempat letak kereta.",
      storefrontLabel: "Kedai Hardware & Tapak",
      hoursHeader: "Waktu Operasi",
      hoursNotice: "Buka 24/7 · Syif siang 8:00 PG – 6:00 PTG, bersedia 24 jam selepas 6:00 PTG",
      getDirections: "Google Maps",
      openInGoogle: "Ulasan Google",
      openInWaze: "Waze",
      copyAddress: "Salin Alamat",
      addressCopied: "Alamat Disalin!",
      callStore: "Hubungi Kedai",
      mapFooterText: "Jalan Kuala Selangor, Bandar Seri Coalfields",
      navigate: "Pandu Sekarang",
      ratingTitle: "Penarafan Google",
      ratingReviewsCount: "Penarafan 4.5 · 9 Ulasan",
      landmarkTitle: "Alamat",
      landmarkDesc: "Tepi jalan utama Jalan Kuala Selangor dengan akses lori mudah.",
    },
    contact: {
      eyebrow: "HUBUNGI TERUS",
      title: "Hubungi atau Kunjungi Kami",
      desc: "Hubungi En. Saravanan waktu siang, atau En. Hari selepas 6 petang untuk bekalan kecemasan.",
      phoneCardTitle: "Syif Siang (Bos)",
      phoneCardDesc: "Pembelian terus di kedai & semakan stok.",
      phoneCardAction: "Hubungi 019-914 4743",
      afterHoursCardTitle: "Syif Malam (24/7)",
      afterHoursCardDesc: "Pesanan kecemasan tapak & bekalan malam.",
      afterHoursCardAction: "Hubungi 016-615 9365",
      visitCardTitle: "Lokasi Kedai",
      visitCardDesc: "Terus di Jalan Kuala Selangor.",
      visitCardTiming: "Buka Setiap Hari hingga 6 PTG",
      visitCardAction: "Panduan Arah",
    },
    footer: {
      tagline: "Kedai bahan binaan dan hardware di Bandar Seri Coalfields, Selangor. Buka setiap hari hingga 6 petang dengan bekalan kecemasan 24 jam.",
      navigationHeading: "Navigasi",
      assistanceHeading: "Hubungi",
      directionsAction: "Panduan Arah",
      verifiedHoursText: "Buka 24/7 (Syif Siang 8 PG – 6 PTG · Selepas 6 PTG Bersedia)",
      copyright: "Hak cipta terpelihara.",
      backToTop: "Kembali ke atas",
    },
    loading: {
      loadingText: "SKL HARDWARE",
      subtitle: "Bandar Seri Coalfields, Selangor",
    },
    catalogue: {
      badge: "Inventori Rasmi & Bekalan Kontraktor",
      title: "Bahan Binaan, Batu Bata & Paver",
      subtitle: "Katalog barangan binaan tulen untuk kontraktor, tukang rumah, landskap, dan ubah suai kediaman di Bandar Seri Coalfields & seluruh Selangor.",
      searchPlaceholder: "Cari batu merah, batu pasir, uni paver, hollow block...",
      allFilter: "Semua Barangan",
      bricksFilter: "Batu Bata & Batu Pasir",
      blocksFilter: "Blok Konkrit & AAC",
      paversFilter: "Batu Paver Lantai",
      ventFilter: "Batu Angin (Ventilation)",
      inStock: "Ada Stok · Sedia untuk Ambil / Hantar",
      enquireWhatsapp: "Tanya Melalui WhatsApp",
      viewSpecs: "Lihat Spesifikasi",
      specTitle: "Spesifikasi Teknikal",
      appTitle: "Kegunaan Disyorkan",
      unitLabel: "Unit Bekalan",
      brandLabel: "Pengilang / Jenama",
      siteDeliveryNotice: "Penghantaran lori disediakan untuk pesanan ke tapak projek di Bandar Seri Coalfields, Sungai Buloh, Puncak Alam, dan Shah Alam. Hubungi talian logistik kami.",
      bulkQuoteAction: "Dapatkan Sebut Harga Pukal",
      backToHome: "Kembali ke Laman Utama",
      noResults: "Tiada barangan ditemui untuk carian anda. Sila hubungi kami untuk tempahan khas.",
    },
  },
};
