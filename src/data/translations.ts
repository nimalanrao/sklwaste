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
    callNow: string;
    openStatus: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    exploreCatalogue: string;
    callUsNow: string;
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
    floatingEmergencyTitle: string;
    floatingEmergencySub: string;
    floatingRatingTitle: string;
    floatingRatingSub: string;
    floatingLocationTitle: string;
    floatingLocationSub: string;
  };
  stats: {
    ratingValue: string;
    ratingLabel: string;
    reviewsValue: string;
    reviewsLabel: string;
    emergencyValue: string;
    emergencyLabel: string;
    walkInValue: string;
    walkInLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    callAction: string;
    directionsAction: string;
    photoBadgeTitle: string;
    photoBadgeSub: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  catalogueShowcase: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAllBtn: string;
    enquireBtn: string;
    browseCategoryBtn: string;
    group1Title: string;
    group1Sub: string;
    group2Title: string;
    group2Sub: string;
    group3Title: string;
    group3Sub: string;
  };
  shiftsSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    dayShiftBadge: string;
    dayShiftTitle: string;
    dayShiftHours: string;
    dayShiftName: string;
    dayShiftRole: string;
    dayShiftDesc: string;
    dayShiftAction: string;
    nightShiftBadge: string;
    nightShiftTitle: string;
    nightShiftHours: string;
    nightShiftName: string;
    nightShiftRole: string;
    nightShiftDesc: string;
    nightShiftAction: string;
    whatsappAction: string;
    notice: string;
  };
  whyChooseUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      desc: string;
    }>;
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
    lorryAccessTitle: string;
    lorryAccessDesc: string;
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
    phoneCardRole: string;
    phoneCardDesc: string;
    phoneCardAction: string;
    afterHoursCardTitle: string;
    afterHoursCardRole: string;
    afterHoursCardDesc: string;
    afterHoursCardAction: string;
    whatsappAction: string;
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
      callNow: "Call Now",
      openStatus: "Open 24/7",
    },
    hero: {
      eyebrow: "SKL Hardware · Bandar Seri Coalfields",
      title: "Hardware & Building Materials in Bandar Seri Coalfields.",
      subtitle: "Stocking cement, bricks, Hansen poly pipes, PVC fittings, sealants, and power tools. Daily walk-in counter from 8:00 AM to 6:00 PM, plus 24/7 emergency supply.",
      exploreCatalogue: "Browse Catalogue",
      callUsNow: "Call Store",
      getDirections: "Get Directions",
      callNow: "019-914 4743",
      callBoss: "Day: 019-914 4743",
      callNight: "Night: 016-615 9365",
      ratingText: "4.5 Google Rating",
      locationBadge: "Bandar Seri Coalfields",
      hoursLabel: "Hours",
      hoursValue: "Open 24/7",
      hoursDesc: "8 AM - 6 PM Daily + 24/7 On-Call",
      photoCaptionTag: "SKL Hardware",
      photoCaptionText: "Jalan Kuala Selangor",
      shiftsTitle: "Direct Contacts",
      dayShiftLabel: "Day (8 AM - 6 PM)",
      dayShiftVal: "Mr. Saravanan · 019-914 4743",
      nightShiftLabel: "Night (6 PM - 8 AM)",
      nightShiftVal: "Mr. Hari · 016-615 9365",
      scrollCue: "Browse",
      floatingEmergencyTitle: "24/7 Emergency Supply",
      floatingEmergencySub: "016-615 9365 (Mr. Hari)",
      floatingRatingTitle: "4.5 Google Rating",
      floatingRatingSub: "9 Google Reviews",
      floatingLocationTitle: "Bandar Seri Coalfields",
      floatingLocationSub: "Jalan Kuala Selangor",
    },
    stats: {
      ratingValue: "4.5/5",
      ratingLabel: "Google Rating",
      reviewsValue: "9",
      reviewsLabel: "Google Reviews",
      emergencyValue: "24/7",
      emergencyLabel: "Emergency Supply",
      walkInValue: "Daily",
      walkInLabel: "Walk-In Service",
    },
    about: {
      eyebrow: "About Us",
      title: "Materials and Hardware for Construction and Repairs.",
      lead: "SKL Waste Sdn Bhd, trading as SKL Hardware, supplies building materials, plumbing fittings, and tools to contractors and homeowners in Bandar Seri Coalfields.",
      body: "",
      callAction: "Call Store",
      directionsAction: "Get Directions",
      photoBadgeTitle: "Main Road Yard",
      photoBadgeSub: "Direct lorry access on Jalan Kuala Selangor",
      feature1Title: "Building Materials",
      feature1Desc: "Cement, red bricks, sand, AAC blocks, pavers, and stone aggregates.",
      feature2Title: "Plumbing & Hardware",
      feature2Desc: "Hansen poly fittings, HDPE coils, PVC pipes, sealants, paints, and tools.",
      feature3Title: "24/7 Emergency Supply",
      feature3Desc: "8:00 AM to 6:00 PM daily walk-in, plus after-hours emergency dispatch.",
    },
    catalogueShowcase: {
      eyebrow: "Product Catalogue",
      title: "Product Catalogue",
      subtitle: "Select a category to browse items or search our 9,974-item inventory.",
      viewAllBtn: "Full Directory (9,974 Items)",
      enquireBtn: "Enquire",
      browseCategoryBtn: "View Items",
      group1Title: "Building Materials",
      group1Sub: "Masonry, cement, sand & aggregates",
      group2Title: "Plumbing Supplies",
      group2Sub: "Hansen poly pipes, fittings & PVC",
      group3Title: "Hardware & Tools",
      group3Sub: "Discs, sealants, paints & power tools",
    },
    shiftsSection: {
      eyebrow: "24/7 Emergency Supply",
      title: "Need Urgent Stock After Hours? Call Direct.",
      subtitle: "For burst pipes, sudden site shortages, or urgent repairs, call our after-hours line for emergency stock and delivery.",
      dayShiftBadge: "DAY SHIFT",
      dayShiftTitle: "Mr. Saravanan",
      dayShiftHours: "8:00 AM - 6:00 PM Daily",
      dayShiftName: "Mr. Saravanan",
      dayShiftRole: "Boss / Day Operations",
      dayShiftDesc: "",
      dayShiftAction: "Call Day Shift",
      nightShiftBadge: "NIGHT SHIFT",
      nightShiftTitle: "Mr. Hari",
      nightShiftHours: "6:00 PM - 8:00 AM",
      nightShiftName: "Mr. Hari",
      nightShiftRole: "24/7 Emergency Supply",
      nightShiftDesc: "",
      nightShiftAction: "Call Emergency Team",
      whatsappAction: "WhatsApp",
      notice: "",
    },
    whyChooseUs: {
      eyebrow: "Why Choose Us",
      title: "Hardware Supply for Contractors & Homeowners.",
      subtitle: "",
      items: [
        {
          id: "emergency",
          title: "24/7 Emergency Supply",
          desc: "After-hours dispatch from 6:00 PM to 8:00 AM for urgent site repairs.",
        },
        {
          id: "location",
          title: "Main Road Yard Access",
          desc: "Direct access along Jalan Kuala Selangor with lorry turning space.",
        },
        {
          id: "range",
          title: "9,974 Stocked Items",
          desc: "Hansen fittings, PVC pipes, cutting discs, sealants, paints, and tools.",
        },
        {
          id: "contractors",
          title: "Contractor Building Materials",
          desc: "Ready stock of cement, red bricks, sand, AAC blocks, and aggregates.",
        },
        {
          id: "direct",
          title: "Direct Line to Store Staff",
          desc: "Call Mr. Saravanan (Day) or Mr. Hari (Night) directly to check stock.",
        },
        {
          id: "walkin",
          title: "Daily Counter Service",
          desc: "Open daily from 8:00 AM to 6:00 PM for counter pickup.",
        },
      ],
    },
    quickInfo: {
      typeLabel: "Store",
      typeVal: "SKL Hardware",
      typeSub: "Kedai Hardware",
      locationLabel: "Location",
      locationVal: "Bandar Seri Coalfields",
      locationSub: "Jalan Kuala Selangor",
      phoneLabel: "Phone",
      phoneSub: "Direct line",
      hoursLabel: "Hours",
      hoursVal: "Open 24/7",
      hoursSub: "Daily + On-Call",
    },
    hardware: {
      eyebrow: "Hardware",
      title: "Hardware Supplies",
      desc: "Call to check stock before visiting.",
      bannerTitle: "Need a specific size or fitting?",
      bannerSub: "Confirm availability by phone.",
      bannerButton: "Call 019-914 4743",
      categoriesTitle: "Categories",
      categoriesDesc: "",
      categoriesNote: "",
      commonSuppliesLabel: "Items:",
      enquireAction: "Enquire",
      customerNoticeTitle: "Note:",
      customerNotice: "Call ahead for bulk site quantities.",
      categories: [],
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Product Gallery",
      desc: "",
      viewPhoto: "View",
      disclosure: "",
      items: [],
    },
    reviews: {
      eyebrow: "Reviews",
      title: "4.5 Google Rating",
      ratingOutOf: "out of 5.0",
      countText: "9 Google Reviews",
      badgeTitle: "Google Maps",
      badgeDesc: "",
      placeIdLabel: "Place ID:",
      viewOnGoogle: "View on Google Maps",
      disclaimer: "",
    },
    location: {
      eyebrow: "Location",
      title: "Find Us in Bandar Seri Coalfields.",
      desc: "Bandar Seri Coalfields, Jalan Kuala Selangor, 47000 Selangor, Malaysia.",
      storefrontLabel: "SKL Waste Sdn Bhd",
      hoursHeader: "Operating Hours",
      hoursNotice: "8:00 AM - 6:00 PM Daily · 6:00 PM - 8:00 AM Emergency Supply",
      lorryAccessTitle: "Lorry Access & Loading",
      lorryAccessDesc: "Main road frontage along Jalan Kuala Selangor with loading space for pickups and lorries.",
      getDirections: "Get Directions",
      openInGoogle: "Open in Google Maps",
      openInWaze: "Waze",
      copyAddress: "Copy Address",
      addressCopied: "Copied",
      callStore: "Call Store",
      mapFooterText: "Bandar Seri Coalfields, 47000 Selangor",
      navigate: "Get Directions",
      ratingTitle: "Google Rating",
      ratingReviewsCount: "4.5 / 5 (9 Reviews)",
      landmarkTitle: "Address",
      landmarkDesc: "Bandar Seri Coalfields, Jalan Kuala Selangor, 47000 Selangor, Malaysia.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact the Store.",
      desc: "",
      phoneCardTitle: "Day Enquiries",
      phoneCardRole: "Boss / Day Operations",
      phoneCardDesc: "8:00 AM - 6:00 PM",
      phoneCardAction: "Call 019-914 4743",
      afterHoursCardTitle: "Emergency Enquiries",
      afterHoursCardRole: "24/7 Emergency Supply",
      afterHoursCardDesc: "6:00 PM - 8:00 AM",
      afterHoursCardAction: "Call 016-615 9365",
      whatsappAction: "WhatsApp",
      visitCardTitle: "Store Location",
      visitCardDesc: "Bandar Seri Coalfields, Jalan Kuala Selangor, 47000 Selangor, Malaysia.",
      visitCardTiming: "8:00 AM - 6:00 PM Daily · 24/7 Emergency",
      visitCardAction: "Get Directions",
    },
    footer: {
      tagline: "Hardware and building materials supplier in Bandar Seri Coalfields, Selangor.",
      navigationHeading: "Navigation",
      assistanceHeading: "Contact",
      directionsAction: "Get Directions",
      verifiedHoursText: "8:00 AM - 6:00 PM Daily · 24/7 Emergency",
      copyright: "All rights reserved.",
      backToTop: "Top",
    },
    loading: {
      loadingText: "SKL HARDWARE",
      subtitle: "Bandar Seri Coalfields",
    },
    catalogue: {
      badge: "Catalogue",
      title: "Product Catalogue",
      subtitle: "Search 9,974 building materials, plumbing fittings, and tools.",
      searchPlaceholder: "Search cement, bricks, Hansen fittings, tools...",
      allFilter: "All",
      bricksFilter: "Bricks",
      blocksFilter: "Blocks",
      paversFilter: "Pavers",
      ventFilter: "Ventilation",
      inStock: "Ready for Pickup / Delivery",
      enquireWhatsapp: "WhatsApp",
      viewSpecs: "Details",
      specTitle: "Specifications",
      appTitle: "Application",
      unitLabel: "Unit",
      brandLabel: "Brand",
      siteDeliveryNotice: "Lorry delivery available across Bandar Seri Coalfields and surrounding areas.",
      bulkQuoteAction: "Request Quote",
      backToHome: "Back",
      noResults: "No matching items found. Call us to check stock.",
    },
  },
  ms: {
    nav: {
      home: "Utama",
      about: "Tentang Kami",
      catalogue: "Katalog",
      hardware: "Perkakasan",
      gallery: "Galeri",
      location: "Lokasi & Waktu",
      contact: "Hubungi",
      getDirections: "Panduan Arah",
      callStore: "Hubungi Kedai",
      callNow: "Hubungi Sekarang",
      openStatus: "Buka 24/7",
    },
    hero: {
      eyebrow: "SKL Hardware · Bandar Seri Coalfields",
      title: "Bahan Binaan & Perkakasan di Bandar Seri Coalfields.",
      subtitle: "Membekalkan simen, batu bata, paip poly Hansen, penyambung PVC, silikon, dan alatan kuasa. Kaunter walk-in harian 8:00 PG hingga 6:00 PTG, serta bekalan kecemasan 24/7.",
      exploreCatalogue: "Lihat Katalog",
      callUsNow: "Hubungi Kedai",
      getDirections: "Panduan Arah",
      callNow: "019-914 4743",
      callBoss: "Siang: 019-914 4743",
      callNight: "Malam: 016-615 9365",
      ratingText: "4.5 Penilaian Google",
      locationBadge: "Bandar Seri Coalfields",
      hoursLabel: "Waktu",
      hoursValue: "Buka 24/7",
      hoursDesc: "8 PG - 6 PTG Setiap Hari + 24/7",
      photoCaptionTag: "SKL Hardware",
      photoCaptionText: "Jalan Kuala Selangor",
      shiftsTitle: "Talian Terus",
      dayShiftLabel: "Siang (8 PG - 6 PTG)",
      dayShiftVal: "Mr. Saravanan · 019-914 4743",
      nightShiftLabel: "Malam (6 PTG - 8 PG)",
      nightShiftVal: "Mr. Hari · 016-615 9365",
      scrollCue: "Lihat",
      floatingEmergencyTitle: "Bekalan Kecemasan 24/7",
      floatingEmergencySub: "016-615 9365 (Mr. Hari)",
      floatingRatingTitle: "4.5 Penilaian Google",
      floatingRatingSub: "9 Ulasan Google",
      floatingLocationTitle: "Bandar Seri Coalfields",
      floatingLocationSub: "Jalan Kuala Selangor",
    },
    stats: {
      ratingValue: "4.5/5",
      ratingLabel: "Penilaian Google",
      reviewsValue: "9",
      reviewsLabel: "Ulasan Google",
      emergencyValue: "24/7",
      emergencyLabel: "Bekalan Kecemasan",
      walkInValue: "Setiap Hari",
      walkInLabel: "Perkhidmatan Walk-In",
    },
    about: {
      eyebrow: "Tentang Kami",
      title: "Bahan dan Perkakasan untuk Pembinaan dan Pembaikan.",
      lead: "SKL Waste Sdn Bhd, beroperasi sebagai SKL Hardware, membekalkan bahan binaan, kelengkapan paip, dan alatan kerja kepada kontraktor serta pemilik rumah di Bandar Seri Coalfields.",
      body: "",
      callAction: "Hubungi Kedai",
      directionsAction: "Panduan Arah",
      photoBadgeTitle: "Tapak Jalan Utama",
      photoBadgeSub: "Akses terus lori di Jalan Kuala Selangor",
      feature1Title: "Bahan Binaan",
      feature1Desc: "Simen, bata merah, pasir, blok AAC, paver, dan batu baur.",
      feature2Title: "Kelengkapan Paip & Perkakasan",
      feature2Desc: "Penyambung poly Hansen, paip HDPE, PVC, silikon, cat, dan alatan.",
      feature3Title: "Bekalan Kecemasan 24/7",
      feature3Desc: "Walk-in 8:00 PG hingga 6:00 PTG setiap hari, serta penghantaran kecemasan 24/7.",
    },
    catalogueShowcase: {
      eyebrow: "Katalog Produk",
      title: "Katalog Produk",
      subtitle: "Pilih kategori atau cari dalam inventori penuh 9,974 item kami.",
      viewAllBtn: "Direktori Penuh (9,974 Item)",
      enquireBtn: "Tanya",
      browseCategoryBtn: "Lihat Produk",
      group1Title: "Bahan Binaan",
      group1Sub: "Bata, simen, pasir & batu baur",
      group2Title: "Bekalan Paip",
      group2Sub: "Paip poly Hansen, penyambung & PVC",
      group3Title: "Perkakasan & Alatan",
      group3Sub: "Mata pemotong, silikon, cat & alatan kuasa",
    },
    shiftsSection: {
      eyebrow: "Bekalan Kecemasan 24/7",
      title: "Perlukan Stok Kecemasan Luar Waktu? Hubungi Terus.",
      subtitle: "Untuk paip pecah, kekurangan bahan di tapak, atau pembaikan segera, hubungi talian luar waktu kami untuk bekalan dan penghantaran.",
      dayShiftBadge: "SYIF SIANG",
      dayShiftTitle: "Mr. Saravanan",
      dayShiftHours: "8:00 PG - 6:00 PTG Setiap Hari",
      dayShiftName: "Mr. Saravanan",
      dayShiftRole: "Bos / Operasi Siang",
      dayShiftDesc: "",
      dayShiftAction: "Hubungi Syif Siang",
      nightShiftBadge: "SYIF MALAM",
      nightShiftTitle: "Mr. Hari",
      nightShiftHours: "6:00 PTG - 8:00 PG",
      nightShiftName: "Mr. Hari",
      nightShiftRole: "Bekalan Kecemasan 24/7",
      nightShiftDesc: "",
      nightShiftAction: "Hubungi Pasukan Kecemasan",
      whatsappAction: "WhatsApp",
      notice: "",
    },
    whyChooseUs: {
      eyebrow: "Mengapa Pilih Kami",
      title: "Bekalan Perkakasan untuk Kontraktor & Pemilik Rumah.",
      subtitle: "",
      items: [
        {
          id: "emergency",
          title: "Bekalan Kecemasan 24/7",
          desc: "Bantuan luar waktu kerja 6:00 PTG hingga 8:00 PG untuk kecemasan tapak.",
        },
        {
          id: "location",
          title: "Akses Tapak Jalan Utama",
          desc: "Akses terus di Jalan Kuala Selangor dengan ruang masuk lori yang luas.",
        },
        {
          id: "range",
          title: "9,974 Item Berstok",
          desc: "Penyambung Hansen, paip PVC, mata pemotong, silikon, cat, dan alatan.",
        },
        {
          id: "contractors",
          title: "Bahan Binaan untuk Kontraktor",
          desc: "Stok sedia simen, bata merah, pasir, blok AAC, dan batu baur.",
        },
        {
          id: "direct",
          title: "Talian Terus Staf Kedai",
          desc: "Hubungi terus En. Saravanan (Siang) atau En. Hari (Malam) untuk semakan stok.",
        },
        {
          id: "walkin",
          title: "Kaunter Walk-In Harian",
          desc: "Dibuka setiap hari 8:00 PG hingga 6:00 PTG untuk pengambilan di kaunter.",
        },
      ],
    },
    quickInfo: {
      typeLabel: "Kedai",
      typeVal: "SKL Hardware",
      typeSub: "Kedai Hardware",
      locationLabel: "Lokasi",
      locationVal: "Bandar Seri Coalfields",
      locationSub: "Jalan Kuala Selangor",
      phoneLabel: "Telefon",
      phoneSub: "Talian terus",
      hoursLabel: "Waktu",
      hoursVal: "Buka 24/7",
      hoursSub: "Siang + Malam",
    },
    hardware: {
      eyebrow: "Perkakasan",
      title: "Bekalan Perkakasan",
      desc: "",
      bannerTitle: "",
      bannerSub: "",
      bannerButton: "",
      categoriesTitle: "",
      categoriesDesc: "",
      categoriesNote: "",
      commonSuppliesLabel: "",
      enquireAction: "",
      customerNoticeTitle: "",
      customerNotice: "",
      categories: [],
    },
    gallery: {
      eyebrow: "Galeri",
      title: "Galeri Produk",
      desc: "",
      viewPhoto: "Lihat",
      disclosure: "",
      items: [],
    },
    reviews: {
      eyebrow: "Ulasan",
      title: "4.5 Penilaian Google",
      ratingOutOf: "daripada 5.0",
      countText: "9 Ulasan Google",
      badgeTitle: "Google Maps",
      badgeDesc: "",
      placeIdLabel: "ID:",
      viewOnGoogle: "Lihat di Google Maps",
      disclaimer: "",
    },
    location: {
      eyebrow: "Lokasi",
      title: "Temui Kami di Bandar Seri Coalfields.",
      desc: "Bandar Seri Coalfields, Jalan Kuala Selangor, 47000 Selangor, Malaysia.",
      storefrontLabel: "SKL Waste Sdn Bhd",
      hoursHeader: "Waktu Operasi",
      hoursNotice: "8:00 PG - 6:00 PTG Setiap Hari · 6:00 PTG - 8:00 PG Kecemasan",
      lorryAccessTitle: "Akses Lori & Ruang Memunggah",
      lorryAccessDesc: "Tepi jalan utama Jalan Kuala Selangor dengan ruang pemuatan untuk pikap dan lori.",
      getDirections: "Panduan Arah",
      openInGoogle: "Buka di Google Maps",
      openInWaze: "Waze",
      copyAddress: "Salin Alamat",
      addressCopied: "Disalin",
      callStore: "Hubungi Kedai",
      mapFooterText: "Bandar Seri Coalfields, 47000 Selangor",
      navigate: "Panduan Arah",
      ratingTitle: "Penarafan Google",
      ratingReviewsCount: "4.5 / 5 (9 Ulasan)",
      landmarkTitle: "Alamat",
      landmarkDesc: "Bandar Seri Coalfields, Jalan Kuala Selangor, 47000 Selangor, Malaysia.",
    },
    contact: {
      eyebrow: "Hubungi",
      title: "Hubungi Kedai Kami.",
      desc: "",
      phoneCardTitle: "Pertanyaan Waktu Siang",
      phoneCardRole: "Bos / Operasi Siang",
      phoneCardDesc: "8:00 PG - 6:00 PTG",
      phoneCardAction: "Hubungi 019-914 4743",
      afterHoursCardTitle: "Pertanyaan Kecemasan",
      afterHoursCardRole: "Bekalan Kecemasan 24/7",
      afterHoursCardDesc: "6:00 PTG - 8:00 PG",
      afterHoursCardAction: "Hubungi 016-615 9365",
      whatsappAction: "WhatsApp",
      visitCardTitle: "Lokasi Kedai",
      visitCardDesc: "Bandar Seri Coalfields, Jalan Kuala Selangor, 47000 Selangor, Malaysia.",
      visitCardTiming: "8:00 PG - 6:00 PTG Setiap Hari · 24/7 Kecemasan",
      visitCardAction: "Panduan Arah",
    },
    footer: {
      tagline: "Pembekal perkakasan dan bahan binaan di Bandar Seri Coalfields, Selangor.",
      navigationHeading: "Navigasi",
      assistanceHeading: "Hubungi",
      directionsAction: "Panduan Arah",
      verifiedHoursText: "8:00 PG - 6:00 PTG Setiap Hari · 24/7 Kecemasan",
      copyright: "Hak cipta terpelihara.",
      backToTop: "Atas",
    },
    loading: {
      loadingText: "SKL HARDWARE",
      subtitle: "Bandar Seri Coalfields",
    },
    catalogue: {
      badge: "Katalog",
      title: "Katalog Produk",
      subtitle: "Cari 9,974 bahan binaan, kelengkapan paip, dan alatan.",
      searchPlaceholder: "Cari simen, bata, penyambung Hansen, alatan...",
      allFilter: "Semua",
      bricksFilter: "Bata",
      blocksFilter: "Blok",
      paversFilter: "Paver",
      ventFilter: "Lubang Angin",
      inStock: "Sedia untuk Ambil / Hantar",
      enquireWhatsapp: "WhatsApp",
      viewSpecs: "Butiran",
      specTitle: "Spesifikasi",
      appTitle: "Kegunaan",
      unitLabel: "Unit",
      brandLabel: "Jenama",
      siteDeliveryNotice: "Penghantaran lori disediakan di sekitar Bandar Seri Coalfields.",
      bulkQuoteAction: "Minta Sebut Harga",
      backToHome: "Kembali",
      noResults: "Tiada barangan ditemui. Hubungi kami untuk semakan stok.",
    },
  },
};
