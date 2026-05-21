import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getOrderById } from "../api/orders"
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaBox } from "react-icons/fa"

export default function Order() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id)
        setOrder(data)
      } catch (err) {
        console.error("Erreur lors de la récupération de la commande :", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const getStatus = (status) => {
    switch (status) {
      case "pending":   return { label: "En attente",  bg: "#fffbeb", color: "#d97706", border: "#fde68a" }
      case "paid":      return { label: "Payé",        bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" }
      case "shipped":   return { label: "Expédié",     bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" }
      case "delivered": return { label: "Livré",       bg: "#f0fdfa", color: "#0d9488", border: "#99f6e4" }
      case "canceled": return { label: "Annulé",      bg: "#fff1f2", color: "#e11d48", border: "#fecdd3" }
      default:          return { label: status,        bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb" }
    }
  }

  if (loading) return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "80px 32px", textAlign: "center", color: "#9ca3af", fontSize: "0.875rem" }}>
      Chargement de la commande...
    </div>
  )

  if (!order) return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: "80px 32px", textAlign: "center", color: "#9ca3af", fontSize: "0.875rem" }}>
      Commande introuvable.
    </div>
  )

  const status = getStatus(order.status)

  return (
    <>
      <style>{`
        .ord-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9fafb;
          min-height: 60vh;
          padding: 40px 32px 64px;
        }

        .ord-inner { max-width: 1000px; margin: 0 auto; }

        .ord-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          margin-bottom: 24px;
          transition: color 0.18s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .ord-back:hover { color: #111827; }

        .ord-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ord-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.06em;
          color: #111827;
        }

        .ord-status-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1.5px solid;
        }

        .ord-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .ord-layout { grid-template-columns: 1fr; }
          .ord-root { padding: 24px 16px 48px; }
        }

        /* ── Carte résumé ── */
        .ord-summary-card {
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #f3f4f6;
          overflow: hidden;
        }

        .ord-card-header {
          background: #111827;
          padding: 14px 18px;
        }

        .ord-card-header-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.1em;
          color: #fff;
        }

        .ord-card-body { padding: 18px; }

        .ord-info-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }

        .ord-info-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #f9fafb;
          border: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .ord-info-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          margin-bottom: 2px;
        }

        .ord-info-value {
          font-size: 0.85rem;
          font-weight: 500;
          color: #111827;
          line-height: 1.4;
        }

        .ord-card-divider {
          height: 1px;
          background: #f3f4f6;
          margin: 14px 0;
        }

        .ord-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ord-total-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.08em;
          color: #374151;
        }

        .ord-total-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.04em;
          color: #16a34a;
        }

        /* ── Carte produits ── */
        .ord-items-card {
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #f3f4f6;
          overflow: hidden;
        }

        .ord-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-bottom: 1px solid #f9fafb;
          transition: background 0.15s;
        }

        .ord-item:last-child { border-bottom: none; }
        .ord-item:hover { background: #fafafa; }

        .ord-item-img {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 10px;
          background: #f3f4f6;
          flex-shrink: 0;
        }

        .ord-item-img-placeholder {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d1d5db;
          flex-shrink: 0;
        }

        .ord-item-info { flex: 1; min-width: 0; }

        .ord-item-name {
          font-weight: 700;
          font-size: 0.875rem;
          color: #111827;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ord-item-meta {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .ord-item-right {
          text-align: right;
          flex-shrink: 0;
        }

        .ord-item-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.05rem;
          letter-spacing: 0.04em;
          color: #111827;
        }

        .ord-item-qty {
          font-size: 0.72rem;
          color: #9ca3af;
          margin-top: 2px;
        }
      `}</style>

      <div className="ord-root">
        <div className="ord-inner">

          {/* ── Back ── */}
          <button className="ord-back" onClick={() => navigate("/orders")}>
            <FaArrowLeft size={10} /> Retour à l'historique
          </button>

          {/* ── Header ── */}
          <div className="ord-header">
            <h1 className="ord-title">Commande #{order.id}</h1>
            <span
              className="ord-status-badge"
              style={{ background: status.bg, color: status.color, borderColor: status.border }}
            >
              {status.label}
            </span>
          </div>

          <div className="ord-layout">

            {/* ── Résumé ── */}
            <div className="ord-summary-card">
              <div className="ord-card-header">
                <p className="ord-card-header-title">Résumé</p>
              </div>
              <div className="ord-card-body">

                <div className="ord-info-row">
                  <div className="ord-info-icon"><FaCalendarAlt size={12} /></div>
                  <div>
                    <p className="ord-info-label">Date</p>
                    <p className="ord-info-value">
                      {new Date(order.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </p>
                  </div>
                </div>

                <div className="ord-info-row">
                  <div className="ord-info-icon"><FaMapMarkerAlt size={12} /></div>
                  <div>
                    <p className="ord-info-label">Adresse de livraison</p>
                    <p className="ord-info-value">
                      {order.street}<br />
                      {order.postal_code} {order.city}
                    </p>
                  </div>
                </div>

                <div className="ord-info-row" style={{ marginBottom: 0 }}>
                  <div className="ord-info-icon"><FaBox size={11} /></div>
                  <div>
                    <p className="ord-info-label">Articles</p>
                    <p className="ord-info-value">
                      {order.items?.length || 0} article{order.items?.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="ord-card-divider" />

                <div className="ord-total-row" style={{ marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Sous-total</span>
                  <span style={{ fontSize: "0.82rem", color: "#374151" }}>
                    {((order.total_amount_in_cents - (order.shipping_fee_in_cents || 0)) / 100).toFixed(2)} €
                  </span>
                </div>

                <div className="ord-total-row" style={{ marginBottom: "10px" }}>
                  <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Livraison</span>
                  {(order.shipping_fee_in_cents || 0) === 0
                    ? <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#16a34a" }}>Offerte</span>
                    : <span style={{ fontSize: "0.82rem", color: "#374151" }}>
                        {(order.shipping_fee_in_cents / 100).toFixed(2)} €
                      </span>
                  }
                </div>

                <div className="ord-total-row">
                  <span className="ord-total-label">Total</span>
                  <span className="ord-total-value">
                    {(order.total_amount_in_cents / 100).toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>

            {/* ── Articles ── */}
            <div className="ord-items-card">
              <div className="ord-card-header">
                <p className="ord-card-header-title">Produits commandés</p>
              </div>

              {(order.items ?? []).map(item => (
                <div key={item.id} className="ord-item">
                  {item.img_url ? (
                    <img src={item.img_url} alt={item.name} className="ord-item-img" />
                  ) : (
                    <div className="ord-item-img-placeholder">
                      <FaBox size={18} />
                    </div>
                  )}

                  <div className="ord-item-info">
                    <p className="ord-item-name">{item.name}</p>
                    <p className="ord-item-meta">{item.color} · {item.size}</p>
                  </div>

                  <div className="ord-item-right">
                    <p className="ord-item-price">{(item.unit_price_in_cents / 100).toFixed(2)} €</p>
                    <p className="ord-item-qty">× {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}