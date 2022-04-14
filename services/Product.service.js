import apiClient from "@/services/apiClient";

export const ProductService = {
  getProducts() {
    return apiClient.$get(`/catalog-products`);
  },
  getProduct(slug) {
    return apiClient.$get(`catalog-products/slug/${slug}`);
  },
}