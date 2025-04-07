import { Category } from '../category';

export type ProductItemModel = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
};

export type ProductApiModel = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export const normalizeProductItem = (raw: ProductApiModel): ProductItemModel => ({
  id: raw.id,
  title: raw.title,
  description: raw.description,
  price: raw.price,
  category: raw.category,
  images: raw.images,
});
