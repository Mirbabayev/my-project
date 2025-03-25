export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  volume: number;
  fragranceType: string;
  gender: string;
  group?: string;
  discount?: number;
  notes?: {
    top?: string[];
    middle?: string[];
    base?: string[];
  };
  hasAtomizer?: boolean;
  atomizerPrice?: number;
  atomizerVolume?: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  publishDate: string;
  imageUrl: string;
  tags: string[];
}

export interface Brand {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  countryOfOrigin?: string;
} 