/* ------------------------------ PRODUCTS -------------------------------- */
import { handleResponse } from './helpers';

const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:uEJUS-2_";

// GET product by ID
export async function getProductById(productId) {
  const res = await fetch(`${API_URL}/products/${productId}`);
  return handleResponse(res);
}

// GET products by sub-category
export async function getProductsBySubCategory(subCategoryId) {
  const res = await fetch(`${API_URL}/products?sub_categories_id=${subCategoryId}`);
  return handleResponse(res);
}

// GET featured products
export async function getFeaturedProducts() {
  const res = await fetch(`${API_URL}/products?is_featured=true`);
  return handleResponse(res);
}

/* ------------------------------ CATEGORIES ------------------------------ */

// GET categories
export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  return handleResponse(res);
}

// GET sub-categories
export async function getSubCategories() {
  const res = await fetch(`${API_URL}/sub_categories`);
  return handleResponse(res);
}
