import { Link } from "react-router-dom";
import { sortSizes } from "../utils/sizes";

const ProductCard = ({ product, categorySlug }) => {

  const sizes = sortSizes([...new Set(product.variants?.map(v => v.size) || [])]);
  const colors = [...new Map(
    product.variants?.map(v => [v.color, { name: v.color, hex: v.color_hex }]) || []
  ).values()];
  const hasOutOfStock = sizes.some(size => !product.variants?.some(v => v.size === size && v.stock > 0));
  const allOutOfStock = sizes.every(size => !product.variants?.some(v => v.size === size && v.stock > 0));

  return (
    <>
      <style>{`
        .ftk-card {
          font-family: 'DM Sans', sans-serif;
          display: block;
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #f0f0f0;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          position: relative;
        }

        .ftk-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
          border-color: #d1fae5;
        }

        .ftk-card-img-wrap {
          position: relative;
          overflow: hidden;
          background: #f9f9f9;
        }

        .ftk-card-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.4s ease;
          display: block;
        }

        .ftk-card:hover .ftk-card-img {
          transform: scale(1.04);
        }

        .ftk-card-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #111827;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 9px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
        }

        .ftk-card-badge.out {
          background: #ef4444;
        }

        .ftk-card-body {
          padding: 14px 16px 16px;
        }

        .ftk-card-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ftk-card-desc {
          font-size: 0.78rem;
          color: #9ca3af;
          margin-bottom: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ftk-card-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0.04em;
          color: #16a34a;
          margin-bottom: 12px;
          line-height: 1;
        }

        .ftk-card-divider {
          height: 1px;
          background: #f3f4f6;
          margin-bottom: 12px;
        }

        .ftk-card-label {
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          margin-bottom: 6px;
        }

        .ftk-size-chip {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          color: #374151;
          background: #fff;
          transition: background 0.15s, border-color 0.15s;
        }

        .ftk-size-chip.in-stock {
          border-color: #bbf7d0;
          color: #15803d;
          background: #f0fdf4;
        }

        .ftk-size-chip.out-stock {
          border-color: #e5e7eb;
          color: #d1d5db;
          background: #fafafa;
          text-decoration: line-through;
        }

        .ftk-color-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #e5e7eb;
          transition: transform 0.15s;
          flex-shrink: 0;
        }

        .ftk-card:hover .ftk-color-dot {
          transform: scale(1.15);
        }

        .ftk-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        }

        .ftk-card-arrow {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f0fdf4;
          color: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: background 0.18s, transform 0.18s;
          flex-shrink: 0;
        }

        .ftk-card:hover .ftk-card-arrow {
          background: #16a34a;
          color: #fff;
          transform: translateX(2px);
        }
      `}</style>

      <Link
        to={`/category/${categorySlug}/product/${product.id}`}
        className="ftk-card"
      >
        {/* Image */}
        <div className="ftk-card-img-wrap">
          <img
            src={product.img_url}
            alt={product.name}
            className="ftk-card-img"
          />
          {allOutOfStock && (
            <span className="ftk-card-badge out">Rupture</span>
          )}
        </div>

        {/* Body */}
        <div className="ftk-card-body">
          <p className="ftk-card-name">{product.name}</p>
          <p className="ftk-card-desc">{product.description}</p>
          <p className="ftk-card-price">{(product.price_in_cents / 100).toFixed(2)} €</p>

          <div className="ftk-card-divider" />

          {/* Tailles */}
          {sizes.length > 0 && (
            <div style={{ marginBottom: "10px" }}>
              <p className="ftk-card-label">Tailles</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {sizes.map(size => {
                  const inStock = product.variants?.some(v => v.size === size && v.stock > 0);
                  return (
                    <span
                      key={size}
                      className={`ftk-size-chip ${inStock ? "in-stock" : "out-stock"}`}
                    >
                      {size}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Couleurs + flèche */}
          <div className="ftk-card-footer">
            {colors.length > 0 && (
              <div>
                <p className="ftk-card-label">Couleurs</p>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {colors.map(({ name, hex }) => (
                    <span
                      key={name}
                      className="ftk-color-dot"
                      style={{ backgroundColor: hex }}
                      title={name}
                    />
                  ))}
                </div>
              </div>
            )}

            <span className="ftk-card-arrow">→</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;