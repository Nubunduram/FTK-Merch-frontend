import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { postOrder } from "../api/orders";
import { getUserAddresses } from "../api/users";
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaShoppingBag, FaArrowLeft, FaTruck } from "react-icons/fa";

const SHIPPING_FEE = 5.90;
const FREE_SHIPPING_THRESHOLD = 60;

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    postal_code: "",
  });
  const [loading, setLoading] = useState(false);
  const [stockError, setStockError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const grandTotal = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    if (!user) return;
    const fetchAddresses = async () => {
      try {
        const data = await getUserAddresses();
        setAddresses(data);
      } catch (err) {
        console.error("Erreur chargement adresses :", err);
      }
    };
    fetchAddresses();
  }, [user]);

  useEffect(() => {
    if (selectedAddressId) {
      const addr = addresses.find(a => a.id === selectedAddressId);
      if (addr) setAddressForm(addr);
    } else {
      setAddressForm({ street: "", city: "", postal_code: "" });
    }
  }, [selectedAddressId, addresses]);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const { street, city, postal_code } = addressForm;
    if (!street || !city || !postal_code) {
      setErrorMsg("Veuillez remplir l'adresse de livraison complète.");
      setStockError(null);
      return;
    }
    setErrorMsg(null);
    setStockError(null);
    setLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product_variants_id: item.product_variants_id,
          quantity: item.quantity,
        })),
        address: { street, city, postal_code }
      };
      const order = await postOrder(orderData);
      clearCart();
      navigate(`/order/${order.id}`, { state: { order } });
    } catch (err) {
      if (err.message === "STOCK_ERROR") {
        setStockError(err.stockItems);
      } else {
        console.error("Erreur lors de la commande:", err);
        setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .cart-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9fafb;
          min-height: 60vh;
          padding: 40px 16px;
        }

        .cart-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .cart-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6b7280;
          margin-bottom: 24px;
          transition: color 0.18s;
        }

        .cart-back:hover { color: #111827; }

        .cart-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.06em;
          color: #111827;
          margin-bottom: 6px;
        }

        .cart-count {
          font-size: 0.8rem;
          color: #9ca3af;
          margin-bottom: 28px;
        }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr; }
        }

        /* ── Items ── */
        .cart-items-card {
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #f3f4f6;
          overflow: hidden;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-bottom: 1px solid #f9fafb;
          transition: background 0.15s;
        }

        .cart-item:last-child { border-bottom: none; }
        .cart-item:hover { background: #fafafa; }

        .cart-item-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 10px;
          background: #f3f4f6;
          flex-shrink: 0;
        }

        .cart-item-img-placeholder {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          background: #f3f4f6;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d1d5db;
        }

        .cart-item-info {
          flex: 1;
          min-width: 0;
        }

        .cart-item-name {
          font-weight: 700;
          font-size: 0.9rem;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cart-item-meta {
          font-size: 0.78rem;
          color: #9ca3af;
          margin-top: 3px;
        }

        .cart-item-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.04em;
          color: #16a34a;
          margin-top: 4px;
        }

        .cart-item-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .cart-qty-btn {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          color: #374151;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          line-height: 1;
        }

        .cart-qty-btn:hover {
          border-color: #111827;
          background: #111827;
          color: #fff;
        }

        .cart-qty-val {
          font-size: 0.88rem;
          font-weight: 700;
          color: #111827;
          min-width: 24px;
          text-align: center;
        }

        .cart-remove-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: none;
          background: #fff1f2;
          color: #e11d48;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          margin-left: 4px;
        }

        .cart-remove-btn:hover {
          background: #e11d48;
          color: #fff;
        }

        /* ── Sidebar ── */
        .cart-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-address-card {
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #f3f4f6;
          padding: 20px;
        }

        .cart-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.08em;
          color: #111827;
          margin-bottom: 14px;
        }

        .cart-select {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px 12px;
          width: 100%;
          color: #111827;
          background: #fff;
          outline: none;
          cursor: pointer;
          margin-bottom: 12px;
          transition: border-color 0.18s;
        }

        .cart-select:focus { border-color: #16a34a; }

        .cart-input {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px 12px;
          width: 100%;
          color: #111827;
          background: #fff;
          outline: none;
          transition: border-color 0.18s;
          margin-bottom: 8px;
          box-sizing: border-box;
        }

        .cart-input:focus { border-color: #16a34a; }

        .cart-summary-card {
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #f3f4f6;
          padding: 20px;
        }

        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.83rem;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .cart-summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1.5px solid #f3f4f6;
          margin-top: 4px;
        }

        .cart-total-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.06em;
          color: #111827;
        }

        .cart-total-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.04em;
          color: #16a34a;
        }

        .cart-checkout-btn {
          width: 100%;
          margin-top: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 13px;
          background: #16a34a;
          color: #fff;
          border: 2px solid #16a34a;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .cart-checkout-btn:hover:not(:disabled) {
          background: transparent;
          color: #16a34a;
        }

        .cart-checkout-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ── Empty ── */
        .cart-empty {
          text-align: center;
          padding: 80px 16px;
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #f3f4f6;
        }

        .cart-empty-icon {
          font-size: 3rem;
          color: #e5e7eb;
          margin-bottom: 16px;
        }

        .cart-empty-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.06em;
          color: #374151;
          margin-bottom: 8px;
        }

        .cart-empty-sub {
          font-size: 0.85rem;
          color: #9ca3af;
          margin-bottom: 24px;
        }

        .cart-empty-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 10px 22px;
          background: #111827;
          color: #fff;
          border-radius: 9px;
          transition: opacity 0.18s;
        }

        .cart-empty-btn:hover { opacity: 0.8; }

        /* ── Livraison ── */
        .cart-shipping-banner {
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 12px;
          font-size: 0.8rem;
          color: #15803d;
          font-weight: 500;
        }

        .cart-shipping-banner.free {
          background: #f0fdf4;
          color: #15803d;
        }

        .cart-shipping-progress-track {
          height: 4px;
          background: #d1fae5;
          border-radius: 999px;
          margin-top: 7px;
          overflow: hidden;
        }

        .cart-shipping-progress-bar {
          height: 100%;
          background: #16a34a;
          border-radius: 999px;
          transition: width 0.3s ease;
        }

        .cart-summary-row-shipping {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.83rem;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .cart-shipping-free-badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #16a34a;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 2px 8px;
          border-radius: 999px;
        }

        /* ── Stock error ── */
        .cart-stock-error {
          background: #fff1f2;
          border: 1.5px solid #fecdd3;
          border-radius: 12px;
          padding: 16px 18px;
          margin-bottom: 16px;
        }

        .cart-stock-error-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.08em;
          color: #e11d48;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .cart-stock-error-item {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          padding: 7px 0;
          border-top: 1px solid #fecdd3;
          font-size: 0.82rem;
        }

        .cart-stock-error-name {
          font-weight: 700;
          color: #111827;
        }

        .cart-stock-error-meta {
          color: #9ca3af;
          font-size: 0.75rem;
          margin-top: 1px;
        }

        .cart-stock-error-qty {
          flex-shrink: 0;
          font-size: 0.78rem;
          color: #e11d48;
          font-weight: 600;
          white-space: nowrap;
        }

        .cart-error-banner {
          background: #fff1f2;
          border: 1.5px solid #fecdd3;
          border-radius: 10px;
          padding: 11px 14px;
          margin-top: 14px;
          font-size: 0.82rem;
          font-weight: 500;
          color: #e11d48;
        }
      `}</style>

      <div className="cart-root">
        <div className="cart-inner">

          <Link to="/" className="cart-back">
            <FaArrowLeft size={11} /> Continuer mes achats
          </Link>

          <h1 className="cart-title">Mon Panier</h1>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <FaShoppingBag />
              </div>
              <p className="cart-empty-title">Votre panier est vide</p>
              <p className="cart-empty-sub">Ajoutez des produits pour commencer.</p>
              <Link to="/" className="cart-empty-btn">
                <FaArrowLeft size={11} /> Voir la boutique
              </Link>
            </div>
          ) : (
            <>
              <p className="cart-count">{cart.length} article{cart.length > 1 ? "s" : ""}</p>

              <div className="cart-layout">

                {/* ── Liste articles ── */}
                <div className="cart-items-card">
                  {cart.map(item => (
                    <div key={`${item.product_variants_id}-${item.color}-${item.size}`} className="cart-item">

                      <div className="cart-item-img-placeholder">
                        <FaShoppingBag size={22} />
                      </div>

                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-meta">{item.color} · {item.size}</p>
                        <p className="cart-item-price">{(item.price * item.quantity).toFixed(2)} €</p>
                      </div>

                      <div className="cart-item-actions">
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                        >
                          −
                        </button>
                        <span className="cart-qty-val">{item.quantity}</span>
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item, item.quantity + 1)}
                        >
                          +
                        </button>

                        <button
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item)}
                          title="Supprimer"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Sidebar ── */}
                <div className="cart-sidebar">

                  {/* Adresse */}
                  <div className="cart-address-card">
                    <p className="cart-section-title">Adresse de livraison</p>

                    {addresses.length > 0 && (
                      <select
                        value={selectedAddressId || ""}
                        onChange={e => setSelectedAddressId(Number(e.target.value) || null)}
                        className="cart-select"
                      >
                        <option value="">— Nouvelle adresse —</option>
                        {addresses.map(addr => (
                          <option key={addr.id} value={addr.id}>
                            {addr.label} · {addr.street}, {addr.city}
                          </option>
                        ))}
                      </select>
                    )}

                    <input
                      value={addressForm.street}
                      onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                      placeholder="Rue"
                      className="cart-input"
                    />
                    <input
                      value={addressForm.city}
                      onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                      placeholder="Ville"
                      className="cart-input"
                    />
                    <input
                      value={addressForm.postal_code}
                      onChange={e => setAddressForm({ ...addressForm, postal_code: e.target.value })}
                      placeholder="Code postal"
                      className="cart-input"
                      style={{ marginBottom: 0 }}
                    />
                  </div>

                  {/* Résumé + CTA */}
                  <div className="cart-summary-card">
                    <p className="cart-section-title">Résumé</p>

                    {cart.map(item => (
                      <div key={item.product_variants_id} className="cart-summary-row">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}

                    <div className="cart-summary-row-shipping">
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <FaTruck size={12} /> Livraison
                      </span>
                      {shippingFee === 0
                        ? <span className="cart-shipping-free-badge">Offerte</span>
                        : <span>{shippingFee.toFixed(2)} €</span>
                      }
                    </div>

                    <div className="cart-summary-total">
                      <span className="cart-total-label">Total</span>
                      <span className="cart-total-price">{grandTotal.toFixed(2)} €</span>
                    </div>

                    {amountToFreeShipping > 0 && (
                      <div className="cart-shipping-banner" style={{ marginTop: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <FaTruck size={12} />
                          Plus que <strong>{amountToFreeShipping.toFixed(2)} €</strong> pour la livraison offerte
                        </div>
                        <div className="cart-shipping-progress-track">
                          <div
                            className="cart-shipping-progress-bar"
                            style={{ width: `${freeShippingProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {shippingFee === 0 && (
                      <div className="cart-shipping-banner free" style={{ marginTop: "12px" }}>
                        <FaTruck size={12} style={{ display: "inline", marginRight: "6px" }} />
                        Livraison offerte !
                      </div>
                    )}

                    {errorMsg && (
                      <div className="cart-error-banner">{errorMsg}</div>
                    )}

                    {stockError && (
                      <div className="cart-stock-error" style={{ marginTop: "14px" }}>
                        <p className="cart-stock-error-title">
                          Stock insuffisant
                        </p>
                        {stockError.map((item, i) => (
                          <div key={i} className="cart-stock-error-item">
                            <div>
                              <p className="cart-stock-error-name">{item.name}</p>
                              <p className="cart-stock-error-meta">{item.color} · {item.size}</p>
                            </div>
                            <span className="cart-stock-error-qty">
                              {item.available === 0
                                ? "Rupture de stock"
                                : `${item.available} disponible${item.available > 1 ? "s" : ""}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="cart-checkout-btn"
                    >
                      <FaShoppingBag size={14} />
                      {loading ? "Traitement..." : "Passer la commande"}
                    </button>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}