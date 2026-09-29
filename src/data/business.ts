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
  };
  hours: {
    status: string;
    closingTime: string;
    notice: string;
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
  },
  hours: {
    status: "Open",
    closingTime: "7:00 PM",
    notice: "Closing time based on verified Google listing. Please call ahead for public holidays or specific inquiries.",
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
    title: "Hand Tools & Mechanical Essentials",
    category: "Tools & Equipment",
    imageUrl: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=1200&q=80",
    aspectRatio: "4/3",
    alt: "Organized workshop hand tools including wrenches, pliers, and screwdrivers",
  },
  {
    id: "gal-2",
    title: "Fasteners, Bolts & Threaded Hardware",
    category: "Fasteners & Fixings",
    imageUrl: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=1200&q=80",
    aspectRatio: "4/3",
    alt: "Collection of metal screws, hex bolts, nuts, and hardware fasteners",
  },
  {
    id: "gal-3",
    title: "Plumbing & Brass Pipe Connections",
    category: "Plumbing Supplies",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&q=80",
    aspectRatio: "4/3",
    alt: "Brass pipe fittings, connectors, and plumbing hardware valves",
  },
  {
    id: "gal-4",
    title: "Workshop Assembly & Maintenance Materials",
    category: "Maintenance",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=80",
    aspectRatio: "4/3",
    alt: "Craftsman workbench with woodworking and general maintenance equipment",
  },
  {
    id: "gal-5",
    title: "Power Tools & Drilling Accessories",
    category: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=1200&q=80",
    aspectRatio: "4/3",
    alt: "Cordless drill and bit accessories for construction and hardware repair",
  },
  {
    id: "gal-6",
    title: "Hardware Supplies & Construction Racks",
    category: "Supplies",
    imageUrl: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1200&q=80",
    aspectRatio: "4/3",
    alt: "Industrial shelving with neatly organized hardware tools and workshop gear",
  },
];
