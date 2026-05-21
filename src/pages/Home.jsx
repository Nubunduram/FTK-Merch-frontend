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
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <style>{`
        .h-root { font-family: 'DM Sans', sans-serif; background: #fff; }

        /* ════════════════════════════════
           HERO — typographie plein écran
        ════════════════════════════════ */
        .h-hero {
          padding: 0 40px;
          background: #111827;
          border-bottom: 1px solid #f3f4f6;
          overflow: hidden;
        }

        .h-hero-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0 0;
          border-bottom: 1px solid #f3f4f6;
          margin-bottom: 0;
        }

        .h-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #9ca3af;
        }

        .h-hero-tag-dot {
          width: 6px; height: 6px;
          background: #16a34a;
          border-radius: 50%;
          animation: h-pulse 2s ease-in-out infinite;
        }

        @keyframes h-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .h-hero-nav-hint {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #d1d5db;
          text-transform: uppercase;
        }

        .h-hero-main {
          padding: 24px 0 32px;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 32px;
        }

        .h-hero-display {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 12vw, 10rem);
          letter-spacing: 0.02em;
          line-height: 0.9;
          color: #fff;
        }

        .h-hero-display em {
          font-style: normal;
          color: #16a34a;
          display: block;
        }

        .h-hero-right {
          text-align: right;
          padding-bottom: 8px;
          min-width: 200px;
        }

        .h-hero-desc {
          font-size: 0.82rem;
          color: #9ca3af;
          line-height: 1.7;
          max-width: 200px;
          margin-left: auto;
          margin-bottom: 20px;
          font-style: italic;
          font-weight: 300;
        }

        .h-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 10px 20px;
          background: #111827;
          color: #fff;
          border-radius: 999px;
          border: 2px solid #111827;
          transition: all 0.2s;
        }

        .h-hero-cta:hover {
          background: transparent;
          color: #111827;
        }

        /* ════════════════════════════════
           BANDE SCROLLANTE
        ════════════════════════════════ */
        .h-ticker {
          background: #16a34a;
          padding: 10px 0;
          overflow: hidden;
          white-space: nowrap;
        }

        .h-ticker-inner {
          display: inline-flex;
          gap: 0;
          animation: h-ticker 20s linear infinite;
        }

        @keyframes h-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .h-ticker-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          color: #fff;
          padding: 0 28px;
          display: inline-flex;
          align-items: center;
          gap: 20px;
        }

        .h-ticker-item::after {
          content: '✦';
          font-size: 0.5rem;
          opacity: 0.6;
        }

        /* ════════════════════════════════
           CATÉGORIES — strip horizontal
        ════════════════════════════════ */
        .h-cats {
          padding: 48px 40px;
          background: #f9fafb;
        }

        .h-cats-header {
          display: flex;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 24px;
        }

        .h-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.08em;
          color: #111827;
        }

        .h-section-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        .h-cats-strip {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .h-cat-pill {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 16px 24px;
          background: #fff;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.2s;
          flex: 1;
          min-width: 160px;
        }

        .h-cat-pill:hover {
          border-color: #16a34a;
          background: #f0fdf4;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(22,163,74,0.1);
        }

        .h-cat-pill-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.08em;
          color: #111827;
          text-transform: capitalize;
        }

        .h-cat-pill-arrow {
          width: 32px;
          height: 32px;
          background: #f3f4f6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 0.9rem;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .h-cat-pill:hover .h-cat-pill-arrow {
          background: #16a34a;
          color: #fff;
        }

        /* ════════════════════════════════
           PRODUITS VEDETTES
        ════════════════════════════════ */
        .h-featured {
          padding: 56px 40px;
          background: #fff;
        }

        .h-featured-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .h-featured-header-left {
          display: flex;
          align-items: baseline;
          gap: 16px;
          flex: 1;
        }

        .h-featured-count {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #16a34a;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 3px 9px;
          border-radius: 999px;
        }

        .h-products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ════════════════════════════════
           BANNER BAS DE PAGE
        ════════════════════════════════ */
        .h-banner {
          margin: 0 40px 56px;
          background: #111827;
          border-radius: 20px;
          padding: 48px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          position: relative;
          overflow: hidden;
        }

        .h-banner::before {
          content: '';
          position: absolute;
          right: -40px; top: -40px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(22,163,74,0.1);
          pointer-events: none;
        }

        .h-banner::after {
          content: '';
          position: absolute;
          right: 60px; bottom: -60px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: rgba(22,163,74,0.06);
          pointer-events: none;
        }

        .h-banner-text { position: relative; z-index: 1; }

        .h-banner-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.06em;
          color: #fff;
          margin-bottom: 6px;
        }

        .h-banner-sub {
          font-size: 0.82rem;
          color: #6b7280;
        }

        .h-banner-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 12px 24px;
          background: #16a34a;
          color: #fff;
          border-radius: 10px;
          border: 2px solid #16a34a;
          transition: all 0.2s;
          white-space: nowrap;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .h-banner-btn:hover {
          background: transparent;
          color: #22c55e;
        }

        /* ════════════════════════════════
           SKELETON
        ════════════════════════════════ */
        .h-skeleton {
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          border: 1.5px solid #f3f4f6;
        }

        .h-skeleton-img {
          height: 220px;
          background: linear-gradient(90deg, #f3f4f6 25%, #eaebec 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: ftk-shimmer 1.4s infinite;
        }

        .h-skeleton-body { padding: 14px 16px; }

        .h-skeleton-line {
          height: 11px;
          border-radius: 6px;
          background: linear-gradient(90deg, #f3f4f6 25%, #eaebec 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: ftk-shimmer 1.4s infinite;
          margin-bottom: 8px;
        }


        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */
        @media (max-width: 900px) {
          .h-hero { padding: 0 20px; }
          .h-hero-display { font-size: clamp(4rem, 14vw, 6rem); }
          .h-hero-right { display: none; }
          .h-hero-main { grid-template-columns: 1fr; }
          .h-cats { padding: 36px 20px; }
          .h-featured { padding: 40px 20px; }
          .h-products-grid { grid-template-columns: repeat(2, 1fr); }
          .h-banner { margin: 0 20px 40px; padding: 32px 28px; flex-direction: column; text-align: center; }
        }

        @media (max-width: 560px) {
          .h-products-grid { grid-template-columns: 1fr; }
          .h-cat-pill { min-width: 100%; }
        }
      `}</style>

      <div className="h-root">

        {/* ── Hero ── */}
        <div className="h-hero">
          <div className="h-hero-top">
            <p className="h-hero-tag">
              <span className="h-hero-tag-dot" />
              Nouvelle saison
            </p>
            <p className="h-hero-nav-hint">Collection 2026</p>
          </div>

          <div className="h-hero-main">
            <h1 className="h-hero-display">
              Exprime<br />
              <em>ton style.</em>
            </h1>

            <div className="h-hero-right">
              <p className="h-hero-desc">
                Des vêtements pensés pour ceux qui osent s'affirmer. Qualité premium, style unique.
              </p>
              {categories[0] && (
                <Link to={`/category/${categories[0].slug}`} className="h-hero-cta">
                  Voir la boutique →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="h-ticker">
          <div className="h-ticker-inner">
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{ display: "inline-flex" }}>
                <span className="h-ticker-item">Livraison offerte dès 60€</span>
                <span className="h-ticker-item">Nouveautés disponibles</span>
                <span className="h-ticker-item">Collections exclusives</span>
                <span className="h-ticker-item">Qualité premium</span>
                <span className="h-ticker-item">Homme · Femme · Enfants</span>
                <span className="h-ticker-item">FTK Merch Shop</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Catégories ── */}
        {categories.length > 0 && (
          <div className="h-cats">
            <div className="h-cats-header">
              <h2 className="h-section-title">Collections</h2>
              <div className="h-section-line" />
            </div>
            <div className="h-cats-strip">
              {categories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} className="h-cat-pill">
                  <span className="h-cat-pill-name">{cat.name}</span>
                  <span className="h-cat-pill-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Produits à la une ── */}
        <div className="h-featured">
          <div className="h-featured-header">
            <div className="h-featured-header-left">
              <h2 className="h-section-title">À la une</h2>
              <div className="h-section-line" />
            </div>
            {!loading && featuredProducts.length > 0 && (
              <span className="h-featured-count">{featuredProducts.length} produit{featuredProducts.length > 1 ? "s" : ""}</span>
            )}
          </div>

          <div className="h-products-grid">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-skeleton">
                  <div className="h-skeleton-img" />
                  <div className="h-skeleton-body">
                    <div className="h-skeleton-line" style={{ width: "65%" }} />
                    <div className="h-skeleton-line" style={{ width: "40%" }} />
                    <div className="h-skeleton-line" style={{ width: "50%", marginBottom: 0 }} />
                  </div>
                </div>
              ))
            ) : error ? (
              <p style={{ gridColumn: "1/-1", color: "#9ca3af", fontSize: "0.875rem" }}>{error}</p>
            ) : featuredProducts.length === 0 ? (
              <p style={{ gridColumn: "1/-1", color: "#9ca3af", fontSize: "0.875rem" }}>
                Aucun produit à la une pour l'instant.
              </p>
            ) : (
              featuredProducts.map(product => {
                const catSlug = getCategorySlugFromSubCategory(
                  product.sub_categories_id,
                  subCategories,
                  categories
                );
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categorySlug={catSlug}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* ── Banner ── */}
        <div className="h-banner">
          <div className="h-banner-text">
            <p className="h-banner-title">Livraison offerte dès 60 €</p>
            <p className="h-banner-sub">Sur toutes vos commandes en France métropolitaine.</p>
          </div>
          <Link
            to={categories[0] ? `/category/${categories[0].slug}` : "/"}
            className="h-banner-btn"
          >
            En profiter →
          </Link>
        </div>

      </div>
    </>
  );
};

export default Home;