import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { postOrder } from "../api/orders";
import { getUserAddresses } from "../api/users";
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaShoppingBag, FaArrowLeft } from "react-icons/fa";

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

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

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
      alert("Veuillez remplir l'adresse complète.");
      return;
    }
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
      console.error("Erreur lors de la commande:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

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

                    <div className="cart-summary-total">
                      <span className="cart-total-label">Total</span>
                      <span className="cart-total-price">{totalPrice.toFixed(2)} €</span>
                    </div>

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