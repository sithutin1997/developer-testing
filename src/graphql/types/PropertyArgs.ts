export enum PropertyType {
  SALE = "SALE",
  RENT = "RENT"
}

export interface PropertyArgs {
    type?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    minArea?: number;
    maxArea?: number;
    skip?: number;
    take?: number;
}