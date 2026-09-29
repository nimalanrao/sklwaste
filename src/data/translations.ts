export type Language = "en" | "ms";

export interface Translations {
  nav: {
    home: string;
    about: string;
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
    ratingText: string;
    locationBadge: string;
    hoursLabel: string;
    hoursValue: string;
    hoursDesc: string;
    photoCaptionTag: string;
    photoCaptionText: string;
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
    copyAddress: string;
    addressCopied: string;
    callStore: string;
    mapFooterText: string;
    navigate: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    desc: string;
    phoneCardTitle: string;
    phoneCardDesc: string;
    phoneCardAction: string;
    visitCardTitle: string;
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
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      hardware: "Hardware",
      gallery: "Gallery",
      location: "Location & Hours",
      contact: "Contact",
      getDirections: "Get Directions",
      callStore: "Call Store",
      openStatus: "Open · Closes at 7:00 PM",
    },
    hero: {
      eyebrow: "YOUR LOCAL HARDWARE STORE",
      title: "Hardware for the Work Ahead.",
      subtitle: "Find your local hardware store in Bandar Seri Coalfields, Selangor. Get in touch for supplies or plan your in-store visit.",
      getDirections: "Get Directions",
      callNow: "Call 019-914 4743",
      ratingText: "9 Google Reviews",
      locationBadge: "Bandar Seri Coalfields",
      hoursLabel: "Store Hours",
      hoursValue: "Open until 7:00 PM",
      hoursDesc: "Based on verified listing. Call ahead for holiday operating hours.",
      photoCaptionTag: "Tools & Workshop Gear",
      photoCaptionText: "Everyday essentials for home maintenance & trades",
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
      hoursVal: "Closes at 7:00 PM",
      hoursSub: "Verified Google listing",
    },
    about: {
      eyebrow: "ABOUT THE STORE",
      title: "Serving Bandar Seri Coalfields with Practical Hardware Solutions.",
      lead: "SKL Waste Sdn Bhd (Kedai Hardware) is a hardware store serving customers in Bandar Seri Coalfields, Selangor. Visit the store or get in touch for enquiries.",
      body: "Whether you are undertaking DIY home repairs, general building maintenance, plumbing fixes, or commercial trade jobs, our storefront provides local access to essential equipment and everyday hardware materials along Jalan Kuala Selangor.",
      callAction: "Call Store for Enquiries",
      directionsAction: "Get Directions",
      feature1Title: "Local Community Hardware",
      feature1Desc: "Conveniently situated along Jalan Kuala Selangor to serve residents, property owners, and nearby worksites without unnecessary travel.",
      feature2Title: "Direct Stock Enquiries",
      feature2Desc: "Call 019-914 4743 directly before your visit. We can confirm current availability for fasteners, plumbing parts, hand tools, or specific fittings.",
      feature3Title: "Convenient Evening Hours",
      feature3Desc: "Open until 7:00 PM based on our verified Google listing, offering ample time to pick up necessary repair materials after work hours.",
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
          title: "Plumbing & Pipe Fittings",
          subtitle: "Pipes, Connectors & Valving",
          description: "PVC, uPVC, and brass piping components, stop cocks, hose clips, PTFE thread seal tapes, and drainage accessories.",
          commonItems: ["PVC / uPVC Fittings", "Brass Valves & Connectors", "Garden Hoses & Clips", "Thread Seal Tapes", "Drainage Outlets"],
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
          title: "Hand Tools & Mechanical Essentials",
          category: "Tools & Equipment",
          alt: "Organized workshop hand tools including wrenches, pliers, and screwdrivers",
        },
        {
          id: "gal-2",
          title: "Fasteners, Bolts & Threaded Hardware",
          category: "Fasteners & Fixings",
          alt: "Collection of metal screws, hex bolts, nuts, and hardware fasteners",
        },
        {
          id: "gal-3",
          title: "Plumbing & Brass Pipe Connections",
          category: "Plumbing Supplies",
          alt: "Brass pipe fittings, connectors, and plumbing hardware valves",
        },
        {
          id: "gal-4",
          title: "Workshop Assembly & Maintenance Materials",
          category: "Maintenance",
          alt: "Craftsman workbench with woodworking and general maintenance equipment",
        },
        {
          id: "gal-5",
          title: "Power Tools & Drilling Accessories",
          category: "Equipment",
          alt: "Cordless drill and bit accessories for construction and hardware repair",
        },
        {
          id: "gal-6",
          title: "Hardware Supplies & Construction Racks",
          category: "Supplies",
          alt: "Industrial shelving with neatly organized hardware tools and workshop gear",
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
      eyebrow: "LOCATION & STORE ACCESS",
      title: "Visit Us in Bandar Seri Coalfields",
      desc: "Conveniently positioned along Jalan Kuala Selangor with direct roadside accessibility for picking up hardware materials.",
      storefrontLabel: "Storefront Address:",
      hoursHeader: "Operating Schedule",
      hoursNotice: "Closing time based on verified Google listing. Please call ahead for public holidays or specific inquiries.",
      getDirections: "Get Directions",
      openInGoogle: "Open in Google Maps",
      copyAddress: "Copy Address",
      addressCopied: "Address Copied!",
      callStore: "Call Store",
      mapFooterText: "Jln Kuala Selangor, Bandar Seri Coalfields",
      navigate: "Navigate",
    },
    contact: {
      eyebrow: "CONTACT & ENQUIRIES",
      title: "Get in Touch with Our Hardware Team",
      desc: "Have questions regarding tool specifications, building hardware, or stock in Bandar Seri Coalfields? Reach out directly via telephone or plan your route.",
      phoneCardTitle: "Telephone Assistance",
      phoneCardDesc: "Speak directly with staff for item enquiries, fitting dimensions, or availability.",
      phoneCardAction: "Call 019-914 4743",
      visitCardTitle: "Storefront Visit",
      visitCardAction: "Get Driving Directions",
    },
    footer: {
      tagline: "Your local hardware store in Bandar Seri Coalfields, Selangor. Supplying everyday tools, plumbing parts, fasteners, and maintenance supplies.",
      navigationHeading: "Store Navigation",
      assistanceHeading: "Customer Assistance",
      directionsAction: "Get Driving Directions",
      verifiedHoursText: "Verified Hours: Open until 7:00 PM",
      copyright: "All rights reserved.",
      backToTop: "Back to top",
    },
    loading: {
      loadingText: "SKL HARDWARE",
      subtitle: "Bandar Seri Coalfields, Selangor",
    },
  },
  ms: {
    nav: {
      home: "Laman Utama",
      about: "Tentang Kami",
      hardware: "Barangan Hardware",
      gallery: "Galeri",
      location: "Lokasi & Waktu",
      contact: "Hubungi",
      getDirections: "Panduan Arah",
      callStore: "Hubungi Kedai",
      openStatus: "Buka · Tutup jam 7:00 PM",
    },
    hero: {
      eyebrow: "KEDAI HARDWARE PILIHAN ANDA",
      title: "Barangan Hardware untuk Setiap Projek Anda.",
      subtitle: "Kunjungi kedai hardware tempatan anda di Bandar Seri Coalfields, Selangor. Hubungi kami untuk sebarang barangan atau rancang kunjungan anda.",
      getDirections: "Dapatkan Panduan Arah",
      callNow: "Hubungi 019-914 4743",
      ratingText: "9 Ulasan Google",
      locationBadge: "Bandar Seri Coalfields",
      hoursLabel: "Waktu Kedai",
      hoursValue: "Buka sehingga 7:00 PM",
      hoursDesc: "Berdasarkan penyenaraian Google yang disahkan. Sila hubungi kami semasa cuti umum.",
      photoCaptionTag: "Peralatan & Perkakas Bengkel",
      photoCaptionText: "Keperluan harian untuk penyelenggaraan rumah dan pertukangan",
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
      hoursVal: "Tutup jam 7:00 PM",
      hoursSub: "Disahkan melalui Google",
    },
    about: {
      eyebrow: "TENTANG KEDAI",
      title: "Berkhidmat untuk Bandar Seri Coalfields dengan Bekalan Hardware Berkualiti.",
      lead: "SKL Waste Sdn Bhd (Kedai Hardware) ialah kedai hardware yang menyediakan barangan dan peralatan pertukangan di Bandar Seri Coalfields, Selangor. Kunjungi kedai kami atau hubungi kami untuk sebarang pertanyaan.",
      body: "Sama ada anda sedang membaiki rumah secara DIY, menjalankan penyelenggaraan bangunan, kerja paip, atau projek pertukangan komersial, kedai kami menyediakan akses mudah kepada barangan penting sepanjang Jalan Kuala Selangor.",
      callAction: "Hubungi Kedai untuk Pertanyaan",
      directionsAction: "Dapatkan Panduan Arah",
      feature1Title: "Kedai Hardware Komuniti Tempatan",
      feature1Desc: "Terletak strategik di Jalan Kuala Selangor untuk memudahkan penduduk, pemilik kediaman, dan tapak kerja berhampiran.",
      feature2Title: "Pertanyaan Stok Terus",
      feature2Desc: "Hubungi 019-914 4743 sebelum datang. Kami sedia menyemak ketersediaan skru, paip, peralatan tangan atau alat ganti khusus.",
      feature3Title: "Waktu Operasi Sehingga Malam",
      feature3Desc: "Buka sehingga jam 7:00 PM berdasarkan maklumat Google, memberikan masa mencukupi untuk mengambil barangan selepas waktu kerja.",
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
          title: "Kelengkapan Paip & Penyambung",
          subtitle: "Paip, Injap & Sambungan",
          description: "Komponen paip PVC, uPVC, dan tembaga, injap henti (stop cock), klip hos, pita pengedap PTFE, dan saliran sisa.",
          commonItems: ["Penyambung PVC / uPVC", "Injap & Kepala Paip Tembaga", "Hos Getah & Klip", "Pita Putih Paip (PTFE)", "Saluran Sisa"],
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
          title: "Peralatan Tangan & Mekanikal Asas",
          category: "Peralatan & Perkakas",
          alt: "Susunan peralatan tangan bengkel termasuk sepana, playar, dan pemutar skru",
        },
        {
          id: "gal-2",
          title: "Skru, Bolt & Hardware Berbenang",
          category: "Skru & Pengikat",
          alt: "Koleksi pelbagai skru logam, bolt hex, nat dan pengikat hardware",
        },
        {
          id: "gal-3",
          title: "Kelengkapan Paip & Penyambung Tembaga",
          category: "Bekalan Paip",
          alt: "Penyambung paip tembaga, injap paip dan kelengkapan paip",
        },
        {
          id: "gal-4",
          title: "Meja Pertukangan & Bahan Penyelenggaraan",
          category: "Penyelenggaraan",
          alt: "Meja kerja pertukangan dengan peralatan kayu dan perkakas pembaikan",
        },
        {
          id: "gal-5",
          title: "Peralatan Kuasa & Aksesori Penebuk",
          category: "Peralatan Elektrik",
          alt: "Mesin gerudi tanpa wayar dan mata gerudi untuk pembinaan dan pembaikan",
        },
        {
          id: "gal-6",
          title: "Rak Simpanan Hardware & Perkakas",
          category: "Bekalan Kedai",
          alt: "Rak industri dengan susunan peralatan hardware dan perkakas bengkel",
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
      eyebrow: "LOKASI & AKSES KEDAI",
      title: "Kunjungi Kami di Bandar Seri Coalfields",
      desc: "Terletak di tepi Jalan Kuala Selangor dengan akses jalan raya terus untuk kemudahan mengambil barangan hardware.",
      storefrontLabel: "Alamat Kedai:",
      hoursHeader: "Jadual Operasi",
      hoursNotice: "Waktu tutup berdasarkan maklumat sah Google. Sila hubungi kami semasa cuti umum.",
      getDirections: "Dapatkan Panduan Arah",
      openInGoogle: "Buka di Google Maps",
      copyAddress: "Salin Alamat",
      addressCopied: "Alamat Disalin!",
      callStore: "Hubungi Kedai",
      mapFooterText: "Jln Kuala Selangor, Bandar Seri Coalfields",
      navigate: "Pandu Arah",
    },
    contact: {
      eyebrow: "HUBUNGI KAMI",
      title: "Hubungi Pasukan Hardware Kami",
      desc: "Ada sebarang soalan tentang saiz peralatan, bahan binaan atau stok di Bandar Seri Coalfields? Hubungi kami terus atau rancang laluan anda.",
      phoneCardTitle: "Bantuan Telefon",
      phoneCardDesc: "Bercakap terus dengan kakitangan kami untuk pertanyaan barang, saiz paip atau stok.",
      phoneCardAction: "Hubungi 019-914 4743",
      visitCardTitle: "Lawatan Kedai",
      visitCardAction: "Dapatkan Panduan Memandu",
    },
    footer: {
      tagline: "Kedai hardware pilihan anda di Bandar Seri Coalfields, Selangor. Membekalkan peralatan harian, paip, skru dan bahan penyelenggaraan.",
      navigationHeading: "Navigasi Kedai",
      assistanceHeading: "Bantuan Pelanggan",
      directionsAction: "Dapatkan Panduan Memandu",
      verifiedHoursText: "Waktu Disahkan: Buka sehingga 7:00 PM",
      copyright: "Hak cipta terpelihara.",
      backToTop: "Kembali ke atas",
    },
    loading: {
      loadingText: "SKL HARDWARE",
      subtitle: "Bandar Seri Coalfields, Selangor",
    },
  },
};
