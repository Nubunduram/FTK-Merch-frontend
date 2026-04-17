import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .cat-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9fafb;
          min-height: 60vh;
        }

        /* ── Hero banner ── */
        .cat-hero {
          background: #111827;
          padding: 40px 32px;
          position: relative;
          overflow: hidden;
        }

        .cat-hero::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 300px; height: 100%;
          background: linear-gradient(135deg, transparent 40%, rgba(22,163,74,0.12));
          pointer-events: none;
        }

        .cat-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .cat-hero-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #16a34a;
          margin-bottom: 8px;
        }

        .cat-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          letter-spacing: 0.06em;
          color: #fff;
          text-transform: capitalize;
          line-height: 1;
        }

        .cat-hero-count {
          font-size: 0.82rem;
          color: #6b7280;
          margin-top: 8px;
        }

        /* ── Toolbar ── */
        .cat-toolbar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cat-toolbar-left {
          font-size: 0.82rem;
          color: #9ca3af;
        }

        .cat-sort-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cat-sort-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6b7280;
        }

        .cat-sort-select {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 6px 12px;
          color: #111827;
          background: #fff;
          cursor: pointer;
          outline: none;
          transition: border-color 0.18s;
        }

        .cat-sort-select:focus { border-color: #16a34a; }

        /* ── Grid ── */
        .cat-grid-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px 48px;
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr); }
          .cat-hero { padding: 32px 20px; }
          .cat-toolbar { padding: 16px 20px; }
          .cat-grid-wrap { padding: 0 20px 40px; }
        }

        @media (max-width: 560px) {
          .cat-grid { grid-template-columns: 1fr; }
          .cat-hero-title { font-size: 2.2rem; }
        }

        /* ── Skeleton loader ── */
        .cat-skeleton {
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          border: 1.5px solid #f3f4f6;
        }

        .cat-skeleton-img {
          height: 220px;
          background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: cat-shimmer 1.4s infinite;
        }

        .cat-skeleton-body {
          padding: 14px 16px;
        }

        .cat-skeleton-line {
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: cat-shimmer 1.4s infinite;
          margin-bottom: 8px;
        }

        @keyframes cat-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Empty ── */
        .cat-empty {
          text-align: center;
          padding: 80px 16px;
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #f3f4f6;
        }

        .cat-empty-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.06em;
          color: #374151;
          margin-bottom: 8px;
        }

        .cat-empty-sub {
          font-size: 0.85rem;
          color: #9ca3af;
        }
      `}</style>

      <div className="cat-root">

        {/* ── Hero ── */}
        <div className="cat-hero">
          <div className="cat-hero-inner">
            <p className="cat-hero-label">Collection</p>
            <h1 className="cat-hero-title">{category?.name || categoryName}</h1>
            {!loading && (
              <p className="cat-hero-count">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="cat-toolbar">
          <span className="cat-toolbar-left">
            {loading ? "Chargement..." : `${sortedProducts.length} résultat${sortedProducts.length > 1 ? "s" : ""}`}
          </span>

          <div className="cat-sort-wrap">
            <span className="cat-sort-label">Trier par</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cat-sort-select"
            >
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* ── Grille ── */}
        <div className="cat-grid-wrap">
          {loading ? (
            <div className="cat-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="cat-skeleton">
                  <div className="cat-skeleton-img" />
                  <div className="cat-skeleton-body">
                    <div className="cat-skeleton-line" style={{ width: "70%" }} />
                    <div className="cat-skeleton-line" style={{ width: "40%" }} />
                    <div className="cat-skeleton-line" style={{ width: "55%", marginBottom: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="cat-grid">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categorySlug={categoryName}
                />
              ))}
            </div>
          ) : (
            <div className="cat-empty">
              <p className="cat-empty-title">Aucun produit trouvé</p>
              <p className="cat-empty-sub">Cette collection est vide pour le moment.</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default CategoryPage;