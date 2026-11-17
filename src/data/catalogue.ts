import allItemsRaw from "./all-items.json";

export interface ProductVariant {
  itemCode: string;
  barcode: string;
  spec: string;
  description?: string;
}

export interface DatabaseItem {
  itemCode: string;
  barcode: string;
  description: string;
  category: string;
  image?: string;
  spec?: string;
  unit?: string;
  brand?: string;
  application?: string;
  features?: string[];
  variants?: ProductVariant[];
}

// Backward compatibility types for shopping cart components (kept dormant for later)
export interface MasterProduct {
  id: string;
  title: string;
  brand: string;
  mainCategory: string;
  subCategory: string;
  spec: string;
  description: string;
  unit: string;
  application: string;
  localImage: string;
  fallbackImage: string;
  inStock: boolean;
}

export type CatalogueProduct = MasterProduct;

export const allDatabaseItems: DatabaseItem[] = allItemsRaw as DatabaseItem[];

export const DATABASE_CATEGORIES = [
  "Plumbing & Piping",
  "Tools & Machinery",
  "Fasteners & Hardware",
  "Paints & Chemicals",
  "Electrical & Lighting",
  "Building Materials",
  "Bathroom & Kitchen",
  "Safety, Household & Garden",
  "General Hardware & Supplies"
] as const;

export type DatabaseCategoryType = typeof DATABASE_CATEGORIES[number] | "ALL";
