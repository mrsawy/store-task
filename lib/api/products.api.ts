import { apiClient } from './client';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: any[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface DeleteProductResponse {
  id: number;
  title: string;
  isDeleted: boolean;
  deletedOn: string;
}

export const productsApi = {
  getAll: async (): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/products');
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/products/categories');
    return response.data;
  },

  getByCategory: async (category: string): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(`/products/category/${category}`);
    return response.data;
  },

  delete: async (id: number): Promise<DeleteProductResponse> => {
    const response = await apiClient.delete<DeleteProductResponse>(`/products/${id}`);
    return response.data;
  },
};