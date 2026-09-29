import rawCatalogue from "./catalogue-products.json";

export interface CatalogueProduct {
  id: string;
  title: string;
  brand: string;
  category: string;
  categoryMs: string;
  spec: string;
  unit: string;
  application: string;
  localImage: string;
  fallbackImage: string;
  inStock: boolean;
  subCategory?: "brick" | "block" | "paver" | "ventilation";
}

// Categorize items accurately
export const catalogueProducts: CatalogueProduct[] = rawCatalogue.map((p) => {
  let subCategory: "brick" | "block" | "paver" | "ventilation" = "brick";
  if (p.title.includes("BATU ANGIN")) {
    subCategory = "ventilation";
  } else if (p.title.includes("PAVER")) {
    subCategory = "paver";
  } else if (p.title.includes("BLOCK")) {
    subCategory = "block";
  } else {
    subCategory = "brick";
  }

  return {
    ...p,
    subCategory,
  };
});
