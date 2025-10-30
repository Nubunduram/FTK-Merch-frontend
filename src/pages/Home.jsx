import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { getFeaturedProducts, getCategories, getSubCategories } from "../api/products";
import { getCategorySlugFromSubCategory } from "../utils/categoryUtils";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData, subCategoriesData] = await Promise.all([
          getFeaturedProducts(),
          getCategories(),
          getSubCategories()
        ]);
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
        setSubCategories(subCategoriesData);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les produits à la une.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Chargement des produits à la une...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 bg-gray-200 rounded-lg flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur FTK Merch Shop</h1>
        <p className="text-gray-700 max-w-xl">
          Découvrez nos collections exclusives pour hommes, femmes et enfants.
          Trouvez des vêtements tendance, confortables et adaptés à chaque style.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Produits à la une</h2>
      {featuredProducts.length === 0 ? (
        <p>Aucun produit à la une pour l’instant.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map(product => {
            const catSlug = getCategorySlugFromSubCategory(
              product.sub_categories_id,
              subCategories,
              categories
            );

            return (
              <Link
                key={product.id}
                to={`/category/${catSlug}/product/${product.id}`}
                className="block"
              >
                <ProductCard product={product} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
