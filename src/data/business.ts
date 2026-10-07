export interface BusinessConfig {
  name: string;
  fullName: string;
  subtitle: string;
  category: string;
  categoryMs: string;
  address: {
    street: string;
    area: string;
    postcode: string;
    state: string;
    country: string;
    full: string;
  };
  phone: {
    display: string;
    tel: string;
    whatsapp: string;
    bossName: string;
    bossRole?: string;
    afterHoursDisplay: string;
    afterHoursTel: string;
    afterHoursWhatsapp: string;
    afterHoursName: string;
  };
  hours: {
    status: string;
    closingTime: string;
    shifts: string;
    notice: string;
    is247: boolean;
  };
  googleProfile: {
    rating: number;
    maxRating: number;
    reviewCount: number;
    placeId: string;
    cid: string;
    mapsUrl: string;
    directionsUrl: string;
  };
}

export interface HardwareCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  commonItems: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspectRatio: string;
  alt: string;
}

export const businessData: BusinessConfig = {
  name: "SKL Waste",
  fullName: "SKL Waste Sdn Bhd",
  subtitle: "Kedai Hardware",
  category: "Hardware store",
  categoryMs: "Kedai Hardware",
  address: {
    street: "Jln Kuala Selangor",
    area: "Bandar Seri Coalfields",
    postcode: "47000",
    state: "Selangor",
    country: "Malaysia",
    full: "Bandar Seri Coalfields, Jln Kuala Selangor, 47000, Selangor, Malaysia",
  },
  phone: {
    display: "019-914 4743",
    tel: "+60199144743",
    whatsapp: "60199144743",
    bossName: "Mr. Saravanan",
    bossRole: "Boss",
    afterHoursDisplay: "016-615 9365",
    afterHoursTel: "+60166159365",
    afterHoursWhatsapp: "60166159365",
    afterHoursName: "Mr. Hari",
  },
  hours: {
    status: "Open 24/7",
    closingTime: "Open 24 Hours",
    shifts: "8:00 AM – 6:00 PM (Normal Shifts) · After 6:00 PM on-call with Mr. Hari",
    notice: "Sungai Buloh's only 24/7 hardware store. Regular walk-in shifts 8:00 AM – 6:00 PM. After 6:00 PM, contact Mr. Hari (+60 16-615 9365) for on-call emergency supply & pickup.",
    is247: true,
  },
  googleProfile: {
    rating: 4.5,
    maxRating: 5.0,
    reviewCount: 9,
    placeId: "0x31cc5bdb144491eb:0xa4acebd6da21bec2",
    cid: "11866118426229587650",
    mapsUrl: "https://maps.google.com/?cid=11866118426229587650",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=SKL+Waste+Sdn+Bhd+(Kedai+Hardware)+Bandar+Seri+Coalfields+Jln+Kuala+Selangor+47000+Selangor&destination_place_id=0x31cc5bdb144491eb:0xa4acebd6da21bec2",
  },
};

export const hardwareCategories: HardwareCategory[] = [
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
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "DongCheng 20V Cordless Brushless Rotary Hammer",
    category: "Power Tools",
    imageUrl: "/catalogue/dongcheng-20v-cordless-brushless-rotary-hammer-dczc02-26ek-p.png",
    aspectRatio: "4/3",
    alt: "DongCheng 20V cordless brushless rotary hammer kit with battery and case",
  },
  {
    id: "gal-2",
    title: "Common Red Clay Bricks (Batu Merah)",
    category: "Bricks & Masonry",
    imageUrl: "/catalogue/batu-merah-common-brick-per-pcs.jpeg",
    aspectRatio: "4/3",
    alt: "Stack of common red clay bricks for construction and walling",
  },
  {
    id: "gal-3",
    title: "Portland Cement (50kg Heavy-Duty Bag)",
    category: "Cement & Aggregates",
    imageUrl: "/catalogue/cement-portland-50kg.jpeg",
    aspectRatio: "4/3",
    alt: "Portland cement 50kg bag for structural mortar and concrete mixing",
  },
  {
    id: "gal-4",
    title: "Milwaukee M18 FUEL Circular Saw (165mm)",
    category: "Milwaukee Cordless",
    imageUrl: "/catalogue/milwaukee-circular-saw-m18-fcs66-0-bare-power-tools-milwauke.png",
    aspectRatio: "4/3",
    alt: "Milwaukee M18 FUEL cordless circular saw 165mm with blade",
  },
  {
    id: "gal-5",
    title: "Milwaukee M18 FUEL Angle Grinder (VSR)",
    category: "Power Tools & Grinders",
    imageUrl: "/catalogue/milwaukee-vsr-angle-grinder-m18-fsagv100xb-0x0-bare-power-to.png",
    aspectRatio: "4/3",
    alt: "Milwaukee M18 FUEL 100mm variable speed angle grinder",
  },
  {
    id: "gal-6",
    title: "Precast Concrete Hollow Blocks",
    category: "Blocks & Walling",
    imageUrl: "/catalogue/hollow-block-clean.jpeg",
    aspectRatio: "4/3",
    alt: "Standard precast concrete hollow blocks for foundation and retaining walls",
  },
];
