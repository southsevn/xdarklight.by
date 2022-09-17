import apiClient from "@/services/apiClient";

export const CategoryService = {
  getCategories() {
    return apiClient.$get(`/categories`);
  }
}