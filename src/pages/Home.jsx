// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { getFeaturedProducts, getCategories } from '../api/products';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getFeaturedProducts(),
          getCategories()
        ]);
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les produits à la une.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategorySlug = (subCatId) => {
    const cat = categories.find(c => c.id === subCatId);
    return cat ? cat.slug : "autres";
  };

  if (loading) return <p>Chargement des produits à la une...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="mb-12 bg-gray-200 rounded-lg flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur FTK Merch Shop</h1>
        <p className="text-gray-700 max-w-xl">
          Découvrez nos collections exclusives pour hommes, femmes et enfants. 
          Trouvez des vêtements tendance, confortables et adaptés à chaque style. 
          Profitez d’une expérience d’achat simple et rapide avec nos promotions et nouveautés chaque semaine.
        </p>
      </div>

      {/* Produits à la une */}
      <h2 className="text-2xl font-semibold mb-6">Produits à la une</h2>
      {featuredProducts.length === 0 ? (
        <p>Aucun produit à la une pour l’instant.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <Link
              key={product.id}
              to={`/category/${getCategorySlug(product.sub_categories_id)}/product/${product.id}`}
              className="block"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
