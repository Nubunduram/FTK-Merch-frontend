import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getCategories, getProductsByCategory } from "../api/products";

const CategoryPage = () => {
  const { categoryName } = useParams(); // correspond au paramètre dans App.jsx
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tri simple
  const [sort, setSort] = useState("asc");

  // Récupérer les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Erreur categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Déterminer l'ID de la catégorie depuis le slug
  useEffect(() => {
    if (!categories.length) return;
    const cat = categories.find(c => c.slug === categoryName);
    if (!cat) {
      console.log("Catégorie introuvable pour le slug:", categoryName);
      return;
    }
    setCategoryId(cat.id);
  }, [categories, categoryName]);

  // Charger les produits de la catégorie
  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) return;
      setLoading(true);
      try {
        const data = await getProductsByCategory(categoryId);
        setProducts(data);
      } catch (err) {
        console.error("Erreur produits:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  // Tri des produits
  const sortedProducts = [...products].sort((a, b) =>
    sort === "asc" ? a.price_in_cents - b.price_in_cents : b.price_in_cents - a.price_in_cents
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Collection {categoryName}
      </h1>

      {/* Sélecteur de tri */}
      <div className="mb-4 flex items-center gap-2">
        <label>Tri : </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>

      {loading ? (
        <p>Chargement des produits...</p>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/category/${categoryName}/product/${product.id}`}
              className="block"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <p>Aucun produit trouvé pour cette catégorie.</p>
      )}
    </div>
  );
};

export default CategoryPage;
