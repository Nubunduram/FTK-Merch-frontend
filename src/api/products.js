const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:uEJUS-2_";

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`)
  if (!res.ok) throw new Error("Erreur lors du chargement des catégories")
  return await res.json()
}

export async function getProductsByCategory(categoryId) {
  const res = await fetch(`${API_URL}/products?categories_id=${categoryId}`);
  if (!res.ok) throw new Error("Erreur lors du chargement des produits");
  return await res.json();
}

export async function getFeaturedProducts() {
  const res = await fetch(`${API_URL}/products?is_featured=true`);
  if (!res.ok) throw new Error("Erreur lors du chargement des produits à la une");
  return await res.json();
}
