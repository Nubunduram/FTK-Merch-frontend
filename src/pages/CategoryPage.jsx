import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getCategories, getSubCategories, getProductsBySubCategory } from "../api/products";
import { getSubCategoriesForCategory } from "../utils/categoryUtils";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, subCats] = await Promise.all([getCategories(), getSubCategories()]);
        setCategories(cats);
        setSubCategories(subCats);

        const foundCategory = cats.find(c => c.slug === categoryName);
        if (foundCategory) setCategory(foundCategory);
      } catch (err) {
        console.error("Erreur de chargement:", err);
      }
    };
    fetchData();
  }, [categoryName]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category || !subCategories.length) return;
      setLoading(true);
      try {
        const subCatsForCategory = getSubCategoriesForCategory(category.id, subCategories);

        const allProducts = [];
        for (const subCat of subCatsForCategory) {
          const prods = await getProductsBySubCategory(subCat.id);
          allProducts.push(...prods);
        }

        setProducts(allProducts);
      } catch (err) {
        console.error("Erreur produits:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, subCategories]);

  const sortedProducts = [...products].sort((a, b) =>
    sort === "asc" ? a.price_in_cents - b.price_in_cents : b.price_in_cents - a.price_in_cents
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Collection {category?.name || categoryName}
      </h1>

      {/* Sélecteur de tri */}
      <div className="mb-4 flex items-center gap-2">
        <label>Tri :</label>
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
              to={`/category/${category?.slug}/product/${product.id}`}
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
