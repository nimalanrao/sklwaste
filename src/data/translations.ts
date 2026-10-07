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
      eyebrow: "SUNGAI BULOH'S ONLY 24/7 HARDWARE STORE",
      title: "Hardware & Building Materials. Open 24/7.",
      subtitle: "Direct supplier in Bandar Seri Coalfields. Cement, sand, bricks, Hansen poly pipes, and round-the-clock emergency site supply on Jalan Kuala Selangor.",
      getDirections: "Get Directions",
      callNow: "Call 019-914 4743",
      callBoss: "Boss (Saravanan): 019-914 4743",
      callNight: "After 6 PM (Hari): 016-615 9365",
      ratingText: "4.5 Google Rating (9 Reviews)",
      locationBadge: "Bandar Seri Coalfields, Selangor",
      hoursLabel: "Store Hours",
      hoursValue: "Open 24/7",
      hoursDesc: "Day shifts 8:00 AM to 6:00 PM. Call Mr. Hari after 6:00 PM.",
      photoCaptionTag: "Store Yard",
      photoCaptionText: "Authentic SKL Waste yard in Bandar Seri Coalfields",
      shiftsTitle: "24/7 Store Shifts & Direct Contacts",
      dayShiftLabel: "Day Shifts (8:00 AM to 6:00 PM)",
      dayShiftVal: "Mr. Saravanan · 019-914 4743",
      nightShiftLabel: "After 6:00 PM (24/7 On-Call)",
      nightShiftVal: "Mr. Hari · 016-615 9365",
      scrollCue: "Scroll for 24/7 shifts and emergency supply",
    },
    shiftsSection: {
      eyebrow: "24/7 STORE SHIFTS & DIRECT CONTACTS",
      title: "Day Shifts & After-Hours Emergency Supply",
      subtitle: "Regular walk-in hours during the day, with on-call emergency materials release at night.",
      dayShiftTitle: "Normal Store Shifts",
      dayShiftHours: "8:00 AM to 6:00 PM Daily",
      dayShiftName: "Mr. Saravanan",
      dayShiftRole: "Boss / Day Shifts",
      dayShiftDesc: "Walk in for immediate purchases. Cement, sand, aggregates, bricks, pavers, plumbing fittings, and workshop tools.",
      dayShiftAction: "Call 019-914 4743",
      nightShiftTitle: "After Hours & Night Supply",
      nightShiftHours: "6:00 PM to 8:00 AM (24/7 On-Call)",
      nightShiftName: "Mr. Hari",
      nightShiftRole: "24/7 Emergency Supply",
      nightShiftDesc: "Contact Mr. Hari directly for late-night site deliveries, urgent plumbing repairs, and after-hours pickup.",
      nightShiftAction: "Call 016-615 9365",
      whatsappAction: "WhatsApp Mr. Hari",
      notice: "Sungai Buloh's only 24/7 hardware store. We keep your project moving day and night.",
    },
    quickInfo: {
      typeLabel: "Business Type",
      typeVal: "Hardware Store",
      typeSub: "Kedai Hardware",
      locationLabel: "Location",
      locationVal: "Bandar Seri Coalfields",
      locationSub: "Jln Kuala Selangor, 47000",
      phoneLabel: "Phone Enquiries",
      phoneSub: "Direct store line",
      hoursLabel: "Store Hours",
      hoursVal: "Open 24/7",
      hoursSub: "8 AM – 6 PM Shifts · After 6 PM On-Call",
    },
    about: {
      eyebrow: "ABOUT THE STORE",
      title: "Building materials and hardware right on Jalan Kuala Selangor.",
      lead: "SKL Waste supplies building materials, plumbing supplies, trade tools, and repair hardware to contractors, homeowners, and site crews in Bandar Seri Coalfields.",
      body: "Our yard and retail shop carry cement bags, bricks, Hansen poly fittings, diamond cutting discs, waterproof sealants, paint, and hand tools. You can walk in during the day or call ahead for heavy orders and site deliveries across Sungai Buloh and Puncak Alam.",
      callAction: "Call Store for Enquiries",
      directionsAction: "Get Directions",
      feature1Title: "Building and Site Materials",
      feature1Desc: "Stocked with cement, red bricks, AAC blocks, pavers, aggregates, and masonry tools for ongoing construction and renovation jobs.",
      feature2Title: "Plumbing, Tools and Sealants",
      feature2Desc: "From Hansen pipe fittings and stopcocks to cutting discs, silicone, and paints. Call Mr. Saravanan on 019-914 4743 to check stock before driving over.",
      feature3Title: "24/7 Emergency Supply",
      feature3Desc: "Regular walk-in hours run 8:00 AM to 6:00 PM daily. For late-night emergency repairs, burst pipes, or urgent site pickups after 6:00 PM, contact Mr. Hari on 016-615 9365.",
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
      eyebrow: "STORE & YARD LOCATION",
      title: "Visit Us in Bandar Seri Coalfields",
      desc: "Direct roadside access along Jalan Kuala Selangor with customer parking and heavy lorry loading bay.",
      storefrontLabel: "Storefront & Hardware Yard",
      hoursHeader: "Store Hours",
      hoursNotice: "Open 24/7. Walk-in daytime shifts 8:00 AM to 6:00 PM; 24/7 on-call after 6:00 PM.",
      getDirections: "Google Maps",
      openInGoogle: "View Google Reviews",
      openInWaze: "Waze",
      copyAddress: "Copy Address",
      addressCopied: "Address Copied!",
      callStore: "Call Store",
      mapFooterText: "Jalan Kuala Selangor, Bandar Seri Coalfields",
      navigate: "Navigate Now",
      ratingTitle: "Google Rating",
      ratingReviewsCount: "4.5 Rating · 9 Reviews on Google",
      landmarkTitle: "Address & Landmark",
      landmarkDesc: "Main road frontage along Jalan Kuala Selangor near BSC Central. Easy lorry access and customer parking.",
    },
    contact: {
      eyebrow: "CONTACT & DIRECT ENQUIRIES",
      title: "Get in Touch with Our Hardware Team",
      desc: "Sungai Buloh's only 24/7 hardware store. Daytime shifts run 8:00 AM – 6:00 PM with Mr. Saravanan (Boss). After 6:00 PM, contact Mr. Hari for immediate on-call emergency supplies.",
      phoneCardTitle: "Day Shifts (8:00 AM – 6:00 PM)",
      phoneCardDesc: "Direct line to Mr. Saravanan (Boss) for daytime store visits, inventory availability, and building materials.",
      phoneCardAction: "Call Mr. Saravanan: 019-914 4743",
      afterHoursCardTitle: "After 6:00 PM & 24/7 On-Call",
      afterHoursCardDesc: "Contact Mr. Hari directly for night orders, emergency plumbing/electrical gear, and after-hours pickup.",
      afterHoursCardAction: "Call Mr. Hari: 016-615 9365",
      visitCardTitle: "Storefront & Yard Visit",
      visitCardDesc: "Direct roadside yard along Jalan Kuala Selangor with customer parking and heavy lorry loading bay.",
      visitCardTiming: "Open 24/7 (Day & Night)",
      visitCardAction: "Get Driving Directions",
    },
    footer: {
      tagline: "Sungai Buloh's only 24/7 hardware store, based in Bandar Seri Coalfields, Selangor. Supplying everyday tools, plumbing parts, fasteners, and emergency site materials 24 hours a day.",
      navigationHeading: "Store Navigation",
      assistanceHeading: "Customer Assistance",
      directionsAction: "Get Driving Directions",
      verifiedHoursText: "Verified Hours: Open 24/7 (8 AM – 6 PM Shifts · After 6 PM On-Call)",
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
      eyebrow: "SATU-SATUNYA KEDAI HARDWARE 24 JAM DI SUNGAI BULOH",
      title: "Bahan Binaan & Alatan Hardware. Buka 24 Jam.",
      subtitle: "Pembekal terus di Bandar Seri Coalfields. Simen, pasir, batu bata, paip Hansen poly, dan bekalan tapak kecemasan 24 jam di Jalan Kuala Selangor.",
      getDirections: "Panduan Arah",
      callNow: "Hubungi 019-914 4743",
      callBoss: "Bos (Saravanan): 019-914 4743",
      callNight: "Selepas 6 PTG (Hari): 016-615 9365",
      ratingText: "Penilaian 4.5 (9 Ulasan Google)",
      locationBadge: "Bandar Seri Coalfields, Selangor",
      hoursLabel: "Waktu Kedai",
      hoursValue: "Buka 24 Jam",
      hoursDesc: "Syif siang 8:00 PG hingga 6:00 PTG. Hubungi En. Hari selepas 6:00 PTG.",
      photoCaptionTag: "Tapak Kedai",
      photoCaptionText: "Tapak tulen SKL Waste di Bandar Seri Coalfields",
      shiftsTitle: "Waktu Syif Kedai & Hubungan Terus",
      dayShiftLabel: "Syif Siang (8:00 PG hingga 6:00 PTG)",
      dayShiftVal: "En. Saravanan · 019-914 4743",
      nightShiftLabel: "Selepas 6:00 PTG (Bersedia 24/7)",
      nightShiftVal: "En. Hari · 016-615 9365",
      scrollCue: "Lihat syif kedai 24 jam & nombor kecemasan",
    },
    shiftsSection: {
      eyebrow: "JADUAL SYIF & TALIAN TERUS",
      title: "Syif Siang & Bekalan Kecemasan Selepas Waktu Kerja",
      subtitle: "Waktu operasi kedai biasa pada waktu siang, dan bekalan kecemasan bersedia selepas 6:00 PTG.",
      dayShiftTitle: "Syif Biasa Kedai",
      dayShiftHours: "8:00 PG hingga 6:00 PTG Setiap Hari",
      dayShiftName: "En. Saravanan",
      dayShiftRole: "Bos / Syif Siang",
      dayShiftDesc: "Kunjungi kedai untuk pembelian terus. Simen, pasir, batu bata, paver, paip, dan alatan kerja tapak.",
      dayShiftAction: "Hubungi 019-914 4743",
      nightShiftTitle: "Selepas Waktu Kerja & Malam",
      nightShiftHours: "6:00 PTG hingga 8:00 PG (Bersedia 24/7)",
      nightShiftName: "En. Hari",
      nightShiftRole: "Bekalan Kecemasan 24/7",
      nightShiftDesc: "Hubungi En. Hari terus untuk pesanan kecemasan malam, baiki paip segera, dan pengambilan barangan tapak.",
      nightShiftAction: "Hubungi 016-615 9365",
      whatsappAction: "WhatsApp En. Hari",
      notice: "Satu-satunya kedai hardware 24/7 di Sungai Buloh. Kami sedia membantu projek anda siang dan malam.",
    },
    quickInfo: {
      typeLabel: "Jenis Perniagaan",
      typeVal: "Kedai Hardware",
      typeSub: "SKL Waste Sdn Bhd",
      locationLabel: "Lokasi",
      locationVal: "Bandar Seri Coalfields",
      locationSub: "Jln Kuala Selangor, 47000",
      phoneLabel: "Pertanyaan Telefon",
      phoneSub: "Talian terus kedai",
      hoursLabel: "Waktu Operasi",
      hoursVal: "Buka 24/7",
      hoursSub: "Syif 8 PG – 6 PTG · Selepas 6 PTG Bersedia",
    },
    about: {
      eyebrow: "TENTANG KEDAI",
      title: "Bahan binaan dan perkakasan hardware di Jalan Kuala Selangor.",
      lead: "SKL Waste membekalkan bahan binaan, alatan paip, perkakas pertukangan, dan barang pembaikan untuk kontraktor, pemilik rumah, serta pekerja tapak di Bandar Seri Coalfields.",
      body: "Kedai dan stor kami membekalkan simen, batu bata, penyambung paip Hansen poly, mata pemotong berlian, bahan kalis air, cat, serta alatan tangan. Anda boleh datang terus pada waktu siang atau hubungi kami untuk pesanan pukal dan penghantaran tapak sekitar Sungai Buloh dan Puncak Alam.",
      callAction: "Hubungi Kedai untuk Pertanyaan",
      directionsAction: "Dapatkan Panduan Arah",
      feature1Title: "Bahan Binaan dan Tapak",
      feature1Desc: "Menyediakan simen, bata merah, blok AAC, paver, pasir, dan alatan lepa untuk projek pembinaan dan pengubahsuaian rumah.",
      feature2Title: "Paip, Alatan dan Kalis Air",
      feature2Desc: "Daripada penyambung paip Hansen dan stopcock hingga cakera pemotong, silikon, dan cat. Hubungi En. Saravanan di 019-914 4743 untuk semak stok sebelum datang.",
      feature3Title: "Bekalan Kecemasan 24/7",
      feature3Desc: "Waktu kedai biasa dibuka 8:00 PG hingga 6:00 PTG setiap hari. Untuk kerosakan paip malam atau pengambilan barang kecemasan selepas 6:00 PTG, hubungi En. Hari di 016-615 9365.",
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
      eyebrow: "LOKASI KEDAI & STOR",
      title: "Kunjungi Kami di Bandar Seri Coalfields",
      desc: "Akses mudah di tepi Jalan Kuala Selangor dengan tempat letak kenderaan dan ruang muatan lori berat.",
      storefrontLabel: "Kedai Hardware & Tapak Simpanan",
      hoursHeader: "Waktu Operasi",
      hoursNotice: "Buka 24/7 · Syif siang 8:00 PG hingga 6:00 PTG, bersedia 24 jam selepas 6:00 PTG",
      getDirections: "Google Maps",
      openInGoogle: "Ulasan Google",
      openInWaze: "Waze",
      copyAddress: "Salin Alamat",
      addressCopied: "Alamat Disalin!",
      callStore: "Hubungi Kedai",
      mapFooterText: "Jalan Kuala Selangor, Bandar Seri Coalfields",
      navigate: "Pandu Sekarang",
      ratingTitle: "Penarafan Google",
      ratingReviewsCount: "Penarafan 4.5 · 9 Ulasan Google",
      landmarkTitle: "Lokasi & Akses Tapak",
      landmarkDesc: "Di sepanjang Jalan Kuala Selangor berhampiran BSC Central. Ruang depan luas untuk muatan lori dan kenderaan pelanggan.",
    },
    contact: {
      eyebrow: "HUBUNGI KAMI & TALIAN TERUS",
      title: "Hubungi Pasukan Hardware Kami",
      desc: "Satu-satunya kedai hardware 24/7 di Sungai Buloh. Waktu operasi siang 8:00 PG – 6:00 PTG bersama En. Saravanan (Bos). Selepas 6:00 PTG, hubungi En. Hari untuk bekalan kecemasan segera.",
      phoneCardTitle: "Syif Siang (8:00 PG – 6:00 PTG)",
      phoneCardDesc: "Talian terus kepada En. Saravanan (Bos) untuk urusan kedai siang, ketersediaan stok alatan dan bahan binaan tapak.",
      phoneCardAction: "Hubungi En. Saravanan: 019-914 4743",
      afterHoursCardTitle: "Selepas 6:00 PTG & Bersedia 24/7",
      afterHoursCardDesc: "Hubungi En. Hari terus untuk pesanan malam, barangan paip/elektrik kecemasan dan pengambilan selepas waktu operasi.",
      afterHoursCardAction: "Hubungi En. Hari: 016-615 9365",
      visitCardTitle: "Lawatan Kedai & Tapak Bahan",
      visitCardDesc: "Akses terus tepi jalan di Jalan Kuala Selangor dengan tempat letak kenderaan dan ruang muatan lori.",
      visitCardTiming: "Buka 24 Jam (Siang & Malam)",
      visitCardAction: "Dapatkan Panduan Memandu",
    },
    footer: {
      tagline: "Satu-satunya kedai hardware 24 jam di Sungai Buloh, bertempat di Bandar Seri Coalfields, Selangor. Membekalkan alatan, paip, skru dan bahan tapak kecemasan sepanjang 24 jam sehari.",
      navigationHeading: "Navigasi Kedai",
      assistanceHeading: "Bantuan Pelanggan",
      directionsAction: "Dapatkan Panduan Memandu",
      verifiedHoursText: "Waktu Disahkan: Buka 24/7 (Syif Siang 8 PG – 6 PTG · Selepas 6 PTG Bersedia)",
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
