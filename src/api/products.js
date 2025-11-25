const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:uEJUS-2_";

// GET products
export async function getProductById(productId) {
  const res = await fetch(`${API_URL}/products/${productId}`);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement du produit");
  }
  return await res.json();
}

// GET Produits d’une sous-catégorie
export async function getProductsBySubCategory(subCategoryId) {
  const res = await fetch(`${API_URL}/products?sub_categories_id=${subCategoryId}`);
  if (!res.ok) throw new Error("Erreur récupération produits de la sous-catégorie");
  return res.json();
}

// GET products "A la une"
export async function getFeaturedProducts() {
  const res = await fetch(`${API_URL}/products?is_featured=true`);
  if (!res.ok) throw new Error("Erreur lors du chargement des produits à la une");
  return await res.json();
}

// GET categories & sub_categories
export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`)
  if (!res.ok) throw new Error("Erreur lors du chargement des catégories")
  return await res.json()
}

export async function getSubCategories() {
  const res = await fetch(`${API_URL}/sub_categories`);
  if (!res.ok) throw new Error("Erreur récupération sous-catégories");
  return res.json();
}