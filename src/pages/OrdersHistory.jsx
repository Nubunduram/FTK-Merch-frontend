import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { getUserOrders } from "../api/orders"
import { FaArrowRight, FaShoppingBag } from "react-icons/fa"

export default function OrdersHistory() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(user.id)
        setOrders(data)
      } catch (err) {
        console.error("Erreur lors de la récupération des commandes :", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

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

  return (
    <>
      <style>{`
        .oh-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9fafb;
          min-height: 60vh;
          padding: 40px 32px 64px;
        }

        .oh-inner { max-width: 800px; margin: 0 auto; }

        .oh-header {
          margin-bottom: 28px;
        }

        .oh-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.06em;
          color: #111827;
          margin-bottom: 4px;
        }

        .oh-subtitle {
          font-size: 0.82rem;
          color: #9ca3af;
        }

        /* ── Ordre card ── */
        .oh-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 14px;
          padding: 18px 20px;
          margin-bottom: 12px;
          transition: all 0.2s;
          text-decoration: none;
        }

        .oh-card:hover {
          border-color: #d1fae5;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        .oh-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f9fafb;
          border: 1.5px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .oh-card:hover .oh-card-icon {
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: #16a34a;
        }

        .oh-card-info { flex: 1; min-width: 0; }

        .oh-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .oh-card-id {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.08em;
          color: #111827;
        }

        .oh-status-badge {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1.5px solid;
          flex-shrink: 0;
        }

        .oh-card-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .oh-card-meta-item {
          font-size: 0.78rem;
          color: #9ca3af;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .oh-card-meta-sep {
          color: #e5e7eb;
          font-size: 0.7rem;
        }

        .oh-card-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.04em;
          color: #16a34a;
        }

        .oh-card-arrow {
          color: #d1d5db;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .oh-card:hover .oh-card-arrow {
          color: #16a34a;
          transform: translateX(3px);
        }

        /* ── Empty ── */
        .oh-empty {
          text-align: center;
          padding: 80px 16px;
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #f3f4f6;
        }

        .oh-empty-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: #f9fafb;
          border: 1.5px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d1d5db;
          margin: 0 auto 16px;
        }

        .oh-empty-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0.06em;
          color: #374151;
          margin-bottom: 6px;
        }

        .oh-empty-sub {
          font-size: 0.82rem;
          color: #9ca3af;
          margin-bottom: 24px;
        }

        .oh-empty-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 10px 20px;
          background: #111827;
          color: #fff;
          border-radius: 9px;
          transition: opacity 0.18s;
        }

        .oh-empty-btn:hover { opacity: 0.8; }

        /* ── Loading skeleton ── */
        .oh-skeleton {
          height: 82px;
          border-radius: 14px;
          background: linear-gradient(90deg, #f3f4f6 25%, #eaebec 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: ftk-shimmer 1.4s infinite;
          margin-bottom: 12px;
        }


        @media (max-width: 600px) {
          .oh-root { padding: 24px 16px 48px; }
        }
      `}</style>

      <div className="oh-root">
        <div className="oh-inner">

          <div className="oh-header">
            <h1 className="oh-title">Mes commandes</h1>
            {!loading && orders.length > 0 && (
              <p className="oh-subtitle">{orders.length} commande{orders.length > 1 ? "s" : ""} passée{orders.length > 1 ? "s" : ""}</p>
            )}
          </div>

          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="oh-skeleton" />)
          ) : orders.length === 0 ? (
            <div className="oh-empty">
              <div className="oh-empty-icon">
                <FaShoppingBag size={22} />
              </div>
              <p className="oh-empty-title">Aucune commande</p>
              <p className="oh-empty-sub">Vous n'avez pas encore passé de commande.</p>
              <Link to="/" className="oh-empty-btn">
                Voir la boutique →
              </Link>
            </div>
          ) : (
            orders.map(order => {
              const status = getStatus(order.status)
              return (
                <Link key={order.id} to={`/order/${order.id}`} className="oh-card">

                  <div className="oh-card-icon">
                    <FaShoppingBag size={18} />
                  </div>

                  <div className="oh-card-info">
                    <div className="oh-card-top">
                      <span className="oh-card-id">Commande #{order.id}</span>
                      <span
                        className="oh-status-badge"
                        style={{ background: status.bg, color: status.color, borderColor: status.border }}
                      >
                        {status.label}
                      </span>
                    </div>

                    <div className="oh-card-meta">
                      <span className="oh-card-meta-item">
                        {new Date(order.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </span>
                      <span className="oh-card-meta-sep">·</span>
                      <span className="oh-card-amount">
                        {(order.total_amount_in_cents / 100).toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  <FaArrowRight size={13} className="oh-card-arrow" />
                </Link>
              )
            })
          )}

        </div>
      </div>
    </>
  )
}