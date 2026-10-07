import allProductsRaw from "./all-products.json";

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

export const masterProducts: MasterProduct[] = allProductsRaw as MasterProduct[];
export const catalogueProducts: MasterProduct[] = masterProducts;

// The 7 genuine hardware & building materials categories:
export const SIDEBAR_CATEGORIES = [
  "BUILDING MATERIALS",
  "PIPING & PLUMBING",
  "TOOLS",
  "CUTTING TOOLS",
  "WATERPROOFING & SEALANT",
  "KITCHEN & BATH",
  "PAINT"
] as const;

export type MainCategoryType = typeof SIDEBAR_CATEGORIES[number] | "ALL";
