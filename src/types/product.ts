export type ProductCategory = 'Maquillage' | 'Soins Visage' | 'Soins Corps' | 'Parfums' | 'Accessoires Beauté' | 'Cheveux';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  promo_price: number | null;
  promo_active: boolean;
  image_url: string | null;
  category: ProductCategory;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  promo_price: number | null;
  promo_active: boolean;
  image_url: string;
  category: string; // Changed to string to accommodate '_NEW_CATEGORY_' before final conversion
}
