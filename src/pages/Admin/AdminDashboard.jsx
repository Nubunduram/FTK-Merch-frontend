import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminStats } from "../../api/admin";
import { FaBoxOpen, FaClipboardList, FaExclamationTriangle, FaArrowRight } from "react-icons/fa";

const STATUS_CONFIG = {
    pending: { label: "En attente", bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
    paid: { label: "Payé", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
    shipped: { label: "Expédié", bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
    delivered: { label: "Livré", bg: "#f0fdfa", color: "#0d9488", border: "#99f6e4" },
    cancelled: { label: "Annulé", bg: "#fff1f2", color: "#e11d48", border: "#fecdd3" },
};

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAdminStats();
                setStats(data);
            } catch (err) {
                console.error("Erreur stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

    return (
        <>
            <style>{`
        .dash-root { font-family: 'DM Sans', sans-serif; }

        /* ── Greeting ── */
        .dash-greeting {
          margin-bottom: 28px;
        }

        .dash-greeting-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.06em;
          color: #111827;
          margin-bottom: 4px;
        }

        .dash-greeting-sub {
          font-size: 0.82rem;
          color: #9ca3af;
        }

        /* ── Grid principale ── */
        .dash-grid-top {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 900px) { .dash-grid-top { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .dash-grid-top { grid-template-columns: 1fr; } }

        /* ── Stat card ── */
        .dash-stat-card {
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 14px;
          padding: 20px;
          transition: border-color 0.18s, box-shadow 0.18s;
        }

        .dash-stat-card:hover {
          border-color: #e5e7eb;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
        }

        .dash-stat-card.highlight {
          background: #111827;
          border-color: #111827;
        }

        .dash-stat-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #9ca3af;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dash-stat-card.highlight .dash-stat-label { color: #4b5563; }

        .dash-stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.4rem;
          letter-spacing: 0.04em;
          color: #111827;
          line-height: 1;
          margin-bottom: 4px;
        }

        .dash-stat-card.highlight .dash-stat-value { color: #22c55e; }

        .dash-stat-sub {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .dash-stat-card.highlight .dash-stat-sub { color: #4b5563; }

        /* ── Section title ── */
        .dash-section-header {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 14px;
          margin-top: 24px;
        }

        .dash-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.08em;
          color: #111827;
        }

        .dash-section-line {
          flex: 1;
          height: 1px;
          background: #f3f4f6;
        }

        /* ── Statuts commandes ── */
        .dash-status-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }

        @media (max-width: 900px) { .dash-status-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 560px) { .dash-status-grid { grid-template-columns: repeat(2, 1fr); } }

        .dash-status-pill {
          border-radius: 12px;
          padding: 14px 16px;
          border: 1.5px solid;
          text-align: center;
        }

        .dash-status-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.04em;
          line-height: 1;
          margin-bottom: 4px;
        }

        .dash-status-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ── Raccourcis ── */
        .dash-shortcuts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        @media (max-width: 560px) { .dash-shortcuts { grid-template-columns: 1fr; } }

        .dash-shortcut {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 12px;
          transition: all 0.18s;
          text-decoration: none;
        }

        .dash-shortcut:hover {
          border-color: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(22,163,74,0.08);
        }

        .dash-shortcut-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dash-shortcut-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: #f9fafb;
          border: 1.5px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #374151;
          transition: all 0.18s;
        }

        .dash-shortcut:hover .dash-shortcut-icon {
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: #16a34a;
        }

        .dash-shortcut-title {
          font-weight: 700;
          font-size: 0.88rem;
          color: #111827;
          margin-bottom: 2px;
        }

        .dash-shortcut-sub {
          font-size: 0.72rem;
          color: #9ca3af;
        }

        .dash-shortcut-arrow {
          color: #d1d5db;
          transition: all 0.18s;
        }

        .dash-shortcut:hover .dash-shortcut-arrow {
          color: #16a34a;
          transform: translateX(3px);
        }

        /* ── Stock faible ── */
        .dash-alert-card {
          background: #fff;
          border: 1.5px solid #fde68a;
          border-radius: 14px;
          overflow: hidden;
        }

        .dash-alert-header {
          background: #fffbeb;
          border-bottom: 1px solid #fde68a;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dash-alert-header-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.08em;
          color: #92400e;
        }

        .dash-alert-count {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #fef3c7;
          color: #d97706;
          border: 1px solid #fde68a;
          padding: 2px 7px;
          border-radius: 999px;
          margin-left: 4px;
        }

        .dash-alert-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 18px;
          border-bottom: 1px solid #fffbeb;
          transition: background 0.12s;
        }

        .dash-alert-item:last-child { border-bottom: none; }
        .dash-alert-item:hover { background: #fffbeb; }

        .dash-alert-name {
          font-size: 0.83rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 2px;
        }

        .dash-alert-meta {
          font-size: 0.72rem;
          color: #9ca3af;
        }

        .dash-alert-stock {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.04em;
          padding: 3px 10px;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .dash-alert-stock.zero {
          background: #fff1f2;
          color: #e11d48;
          border: 1px solid #fecdd3;
        }

        .dash-alert-stock.low {
          background: #fffbeb;
          color: #d97706;
          border: 1px solid #fde68a;
        }

        /* ── Skeleton ── */
        .dash-skeleton {
          height: 96px;
          border-radius: 14px;
          background: linear-gradient(90deg, #f3f4f6 25%, #eaebec 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: dash-shimmer 1.4s infinite;
        }

        @keyframes dash-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

            <div className="dash-root">

                {/* ── Greeting ── */}
                <div className="dash-greeting">
                    <h1 className="dash-greeting-title">{greeting}</h1>
                    <p className="dash-greeting-sub">
                        {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                </div>

                {/* ── Stats principales ── */}
                <div className="dash-grid-top">
                    {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="dash-skeleton" />)
                    ) : (
                        <>
                            {/* Chiffre d'affaires */}
                            <div className="dash-stat-card highlight">
                                <p className="dash-stat-label">Chiffre d'affaires</p>
                                <p className="dash-stat-value">
                                    {(Number(stats?.orders?.total_revenue || 0) / 100).toFixed(2)} €
                                </p>
                                <p className="dash-stat-sub">Total des ventes</p>
                            </div>

                            {/* Total commandes */}
                            <div className="dash-stat-card">
                                <p className="dash-stat-label"><FaClipboardList size={11} /> Commandes</p>
                                <p className="dash-stat-value">{stats?.orders?.total_orders || 0}</p>
                                <p className="dash-stat-sub">Toutes commandes confondues</p>
                            </div>

                            {/* Produits */}
                            <div className="dash-stat-card">
                                <p className="dash-stat-label"><FaBoxOpen size={11} /> Produits</p>
                                <p className="dash-stat-value">{stats?.products?.total_products || 0}</p>
                                <p className="dash-stat-sub">Produits en catalogue</p>
                            </div>
                        </>
                    )}
                </div>

                {/* ── Statuts commandes ── */}
                <div className="dash-section-header">
                    <span className="dash-section-title">Statuts des commandes</span>
                    <div className="dash-section-line" />
                </div>

                <div className="dash-status-grid">
                    {loading ? (
                        [1, 2, 3, 4, 5].map(i => (
                            <div key={i} style={{ height: "80px", borderRadius: "12px", background: "linear-gradient(90deg, #f3f4f6 25%, #eaebec 50%, #f3f4f6 75%)", backgroundSize: "200% 100%", animation: "dash-shimmer 1.4s infinite" }} />
                        ))
                    ) : (
                        Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                            <div
                                key={key}
                                className="dash-status-pill"
                                style={{ background: cfg.bg, borderColor: cfg.border }}
                            >
                                <p className="dash-status-num" style={{ color: cfg.color }}>
                                    {stats?.orders?.[key] || 0}
                                </p>
                                <p className="dash-status-label" style={{ color: cfg.color }}>
                                    {cfg.label}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {/* ── Raccourcis ── */}
                <div className="dash-section-header">
                    <span className="dash-section-title">Accès rapide</span>
                    <div className="dash-section-line" />
                </div>

                <div className="dash-shortcuts">
                    <Link to="products" className="dash-shortcut">
                        <div className="dash-shortcut-left">
                            <div className="dash-shortcut-icon"><FaBoxOpen size={16} /></div>
                            <div>
                                <p className="dash-shortcut-title">Gestion des produits</p>
                                <p className="dash-shortcut-sub">Ajouter, modifier, supprimer</p>
                            </div>
                        </div>
                        <FaArrowRight size={13} className="dash-shortcut-arrow" />
                    </Link>

                    <Link to="orders" className="dash-shortcut">
                        <div className="dash-shortcut-left">
                            <div className="dash-shortcut-icon"><FaClipboardList size={16} /></div>
                            <div>
                                <p className="dash-shortcut-title">Gestion des commandes</p>
                                <p className="dash-shortcut-sub">Suivre et mettre à jour les statuts</p>
                            </div>
                        </div>
                        <FaArrowRight size={13} className="dash-shortcut-arrow" />
                    </Link>
                </div>

                {/* ── Alertes stock ── */}
                {!loading && stats?.low_stock?.length > 0 && (
                    <>
                        <div className="dash-section-header">
                            <span className="dash-section-title">Alertes stock</span>
                            <div className="dash-section-line" />
                        </div>

                        <div className="dash-alert-card">
                            <div className="dash-alert-header">
                                <FaExclamationTriangle size={13} color="#d97706" />
                                <span className="dash-alert-header-title">Stocks faibles</span>
                                <span className="dash-alert-count">{stats.low_stock.length} variante{stats.low_stock.length > 1 ? "s" : ""}</span>
                            </div>

                            {stats.low_stock.map(item => (
                                <div key={item.id} className="dash-alert-item">
                                    <div>
                                        <p className="dash-alert-name">{item.name}</p>
                                        <p className="dash-alert-meta">{item.color} · {item.size}</p>
                                    </div>
                                    <span className={`dash-alert-stock ${item.stock === 0 ? "zero" : "low"}`}>
                                        {item.stock === 0 ? "Rupture" : `${item.stock} restant${item.stock > 1 ? "s" : ""}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </>
    );
}