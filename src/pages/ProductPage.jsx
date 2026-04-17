import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as AuthContext from "../context/AuthContext";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";
import { sortSizes } from "../utils/sizes";
import { postReview, deleteReview } from "../api/reviews";
import { FaArrowLeft, FaShoppingCart, FaTrash, FaUser } from "react-icons/fa";

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = AuthContext.useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
        const variants = data?.variants || [];
        setComments(data?.reviews || []);
        if (variants.length > 0) setSelectedColor(variants[0].color);
        setLoading(false);
      } catch (err) {
        console.error("Erreur produit:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "80px 32px", textAlign: "center", color: "#9ca3af", fontSize: "0.875rem" }}>
      Chargement du produit...
    </div>
  );

  if (!product) return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "80px 32px", textAlign: "center", color: "#9ca3af", fontSize: "0.875rem" }}>
      Produit introuvable.
    </div>
  );

  const variants = product?.variants || [];
  const availableColors = [...new Set(variants.map(v => v.color))];
  const availableSizes = sortSizes(
    variants.filter(v => v.color === selectedColor).map(v => ({ size: v.size, stock: v.stock })),
    item => item.size
  );
  const hasAlreadyCommented = comments.some(c => c.users_id === user?.id);
  const selectedVariant = variants.find(v => v.color === selectedColor && v.size === selectedSize);
  const isOutOfStock = selectedSize && selectedVariant?.stock === 0;

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setSelectedSize("");
  };

  const handleAddToCart = () => {
    if (!selectedSize) { alert("Veuillez sélectionner une taille."); return; }
    if (!selectedVariant) return;
    addToCart({
      product_id: product.id,
      product_variants_id: selectedVariant.id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      sku: selectedVariant.sku,
      price: product.price_in_cents / 100,
      quantity: 1
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSubmitReview = async () => {
    if (!newComment.trim()) return;
    setSubmitError("");
    try {
      const review = await postReview(productId, newComment);
      setComments(prev => [...prev, review]);
      setNewComment("");
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Supprimer ce commentaire ?")) return;
    await deleteReview(reviewId);
    setComments(prev => prev.filter(c => c.id !== reviewId));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .pp-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9fafb;
          min-height: 60vh;
        }

        /* ── Breadcrumb bar ── */
        .pp-topbar {
          background: #fff;
          border-bottom: 1px solid #f3f4f6;
          padding: 12px 40px;
        }

        .pp-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          transition: color 0.18s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .pp-back:hover { color: #111827; }

        /* ── Main layout ── */
        .pp-main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .pp-main { grid-template-columns: 1fr; gap: 28px; padding: 24px 20px; }
          .pp-topbar { padding: 12px 20px; }
        }

        /* ── Image ── */
        .pp-img-wrap {
          position: sticky;
          top: 80px;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          border: 1.5px solid #f3f4f6;
          aspect-ratio: 1;
        }

        .pp-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .pp-img-wrap:hover .pp-img { transform: scale(1.03); }

        /* ── Info panel ── */
        .pp-info { }

        .pp-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #16a34a;
          margin-bottom: 8px;
        }

        .pp-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.4rem;
          letter-spacing: 0.04em;
          color: #111827;
          line-height: 1;
          margin-bottom: 12px;
        }

        .pp-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.04em;
          color: #16a34a;
          margin-bottom: 20px;
        }

        .pp-desc {
          font-size: 0.85rem;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid #f3f4f6;
        }

        /* ── Sélecteurs ── */
        .pp-option-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #374151;
          margin-bottom: 10px;
        }

        .pp-option-label span {
          font-weight: 400;
          color: #9ca3af;
          text-transform: none;
          letter-spacing: 0;
          margin-left: 6px;
        }

        .pp-colors {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .pp-color-btn {
          padding: 6px 16px;
          border-radius: 8px;
          border: 1.5px solid #e5e7eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: #374151;
          background: #fff;
          cursor: pointer;
          transition: all 0.18s;
        }

        .pp-color-btn:hover { border-color: #111827; }

        .pp-color-btn.selected {
          background: #111827;
          color: #fff;
          border-color: #111827;
        }

        .pp-sizes {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .pp-size-btn {
          min-width: 48px;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1.5px solid #e5e7eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
          background: #fff;
          cursor: pointer;
          transition: all 0.18s;
          text-align: center;
        }

        .pp-size-btn:hover:not(.out):not(.selected) { border-color: #111827; }

        .pp-size-btn.selected {
          background: #16a34a;
          color: #fff;
          border-color: #16a34a;
        }

        .pp-size-btn.out {
          color: #d1d5db;
          border-color: #f3f4f6;
          background: #fafafa;
          text-decoration: line-through;
          cursor: not-allowed;
        }

        /* ── CTA ── */
        .pp-add-btn {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 14px;
          border-radius: 12px;
          border: 2px solid #16a34a;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .pp-add-btn.ready {
          background: #16a34a;
          color: #fff;
        }

        .pp-add-btn.ready:hover {
          background: transparent;
          color: #16a34a;
        }

        .pp-add-btn.done {
          background: #f0fdf4;
          color: #16a34a;
          border-color: #bbf7d0;
          cursor: default;
        }

        .pp-add-btn.disabled {
          background: #f9fafb;
          color: #d1d5db;
          border-color: #f3f4f6;
          cursor: not-allowed;
        }

        /* ── Reviews ── */
        .pp-reviews {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px 64px;
        }

        @media (max-width: 768px) {
          .pp-reviews { padding: 0 20px 48px; }
        }

        .pp-reviews-header {
          display: flex;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 20px;
          padding-top: 8px;
          border-top: 1px solid #f3f4f6;
        }

        .pp-reviews-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0.08em;
          color: #111827;
        }

        .pp-reviews-count {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
        }

        .pp-review-item {
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          transition: border-color 0.15s;
        }

        .pp-review-item:hover { border-color: #e5e7eb; }

        .pp-review-left { display: flex; gap: 10px; flex: 1; min-width: 0; }

        .pp-review-avatar {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #16a34a;
          flex-shrink: 0;
        }

        .pp-review-author {
          font-size: 0.78rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 3px;
        }

        .pp-review-text {
          font-size: 0.82rem;
          color: #6b7280;
          line-height: 1.5;
        }

        .pp-review-delete {
          background: none;
          border: none;
          color: #d1d5db;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.15s;
          flex-shrink: 0;
        }

        .pp-review-delete:hover { color: #ef4444; background: #fff1f2; }

        .pp-review-form {
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 12px;
          padding: 16px;
          margin-top: 8px;
        }

        .pp-review-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 10px 12px;
          color: #111827;
          background: #f9fafb;
          outline: none;
          resize: vertical;
          transition: border-color 0.18s;
          box-sizing: border-box;
          margin-bottom: 10px;
        }

        .pp-review-textarea:focus {
          border-color: #16a34a;
          background: #fff;
        }

        .pp-review-submit {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 8px 18px;
          background: #16a34a;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.18s;
        }

        .pp-review-submit:hover { background: #15803d; }

        .pp-review-note {
          font-size: 0.78rem;
          color: #9ca3af;
          margin-top: 10px;
        }

        .pp-review-note a {
          color: #16a34a;
          font-weight: 600;
          text-decoration: none;
        }

        .pp-review-note a:hover { text-decoration: underline; }
      `}</style>

      <div className="pp-root">

        {/* ── Topbar ── */}
        <div className="pp-topbar">
          <button className="pp-back" onClick={() => navigate(-1)}>
            <FaArrowLeft size={10} /> Retour
          </button>
        </div>

        {/* ── Main ── */}
        <div className="pp-main">

          {/* Image */}
          <div className="pp-img-wrap">
            <img src={product.img_url} alt={product.name} className="pp-img" />
          </div>

          {/* Info */}
          <div className="pp-info">
            <p className="pp-label">FTK Merch</p>
            <h1 className="pp-name">{product.name}</h1>
            <p className="pp-price">{(product.price_in_cents / 100).toFixed(2)} €</p>

            {product.description && (
              <p className="pp-desc">{product.description}</p>
            )}

            {/* Couleurs */}
            <div style={{ marginBottom: "20px" }}>
              <p className="pp-option-label">
                Couleur
                {selectedColor && <span>{selectedColor}</span>}
              </p>
              <div className="pp-colors">
                {availableColors.map(color => {
                  const hex = variants.find(v => v.color === color)?.color_hex;
                  return (
                    <button
                      key={color}
                      onClick={() => handleSelectColor(color)}
                      className={`pp-color-btn ${selectedColor === color ? "selected" : ""}`}
                      style={{ display: "flex", alignItems: "center", gap: "7px" }}
                    >
                      <span style={{
                        width: "12px", height: "12px",
                        borderRadius: "50%",
                        background: hex || color,
                        border: "1.5px solid rgba(0,0,0,0.1)",
                        flexShrink: 0,
                      }} />
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tailles */}
            <div style={{ marginBottom: "28px" }}>
              <p className="pp-option-label">
                Taille
                {selectedSize && <span>{selectedSize}</span>}
              </p>
              <div className="pp-sizes">
                {availableSizes.map(({ size, stock }) => (
                  <button
                    key={size}
                    onClick={() => stock > 0 && setSelectedSize(size)}
                    className={`pp-size-btn ${selectedSize === size ? "selected" : ""} ${stock === 0 ? "out" : ""}`}
                    disabled={stock === 0}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || addedToCart}
              className={`pp-add-btn ${addedToCart ? "done" : !selectedSize ? "disabled" : "ready"}`}
            >
              <FaShoppingCart size={14} />
              {addedToCart ? "Ajouté au panier ✓" : !selectedSize ? "Sélectionnez une taille" : "Ajouter au panier"}
            </button>

          </div>
        </div>

        {/* ── Reviews ── */}
        <div className="pp-reviews">
          <div className="pp-reviews-header">
            <h2 className="pp-reviews-title">Commentaires</h2>
            <span className="pp-reviews-count">{comments.length} avis</span>
          </div>

          {comments.length > 0 ? (
            comments.map(c => (
              <div key={c.id} className="pp-review-item">
                <div className="pp-review-left">
                  <div className="pp-review-avatar">
                    <FaUser size={13} />
                  </div>
                  <div>
                    <p className="pp-review-author">{c.first_name}</p>
                    <p className="pp-review-text">{c.comment}</p>
                  </div>
                </div>
                {(user?.role === "admin" || user?.id === c.users_id) && (
                  <button className="pp-review-delete" onClick={() => handleDeleteReview(c.id)} title="Supprimer">
                    <FaTrash size={11} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p style={{ fontSize: "0.82rem", color: "#9ca3af", marginBottom: "16px" }}>
              Aucun commentaire pour ce produit.
            </p>
          )}

          {user && !hasAlreadyCommented && (
            <div className="pp-review-form">
              <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#374151", marginBottom: "10px" }}>
                Laisser un avis
              </p>
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Partagez votre expérience..."
                className="pp-review-textarea"
                rows={3}
              />
              {submitError && (
                <p style={{ fontSize: "0.78rem", color: "#e11d48", marginBottom: "8px" }}>{submitError}</p>
              )}
              <button onClick={handleSubmitReview} className="pp-review-submit">
                Publier
              </button>
            </div>
          )}

          {user && hasAlreadyCommented && (
            <p className="pp-review-note">Vous avez déjà laissé un avis sur ce produit.</p>
          )}

          {!user && (
            <p className="pp-review-note">
              <Link to="/login">Connectez-vous</Link> pour laisser un commentaire.
            </p>
          )}
        </div>
      </div>
    </>
  );
}