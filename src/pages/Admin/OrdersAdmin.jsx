import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/admin";

const ORDER_STATUSES = [
  { value: "pending",   label: "En attente" },
  { value: "paid",      label: "Payé" },
  { value: "shipped",   label: "Expédié" },
  { value: "delivered", label: "Livré" },
  { value: "canceled", label: "Annulé" },
];

const STATUS_STYLES = {
  pending:   { bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
  paid:      { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  shipped:   { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  delivered: { bg: "#f0fdfa", color: "#0d9488", border: "#99f6e4" },
  canceled: { bg: "#fff1f2", color: "#e11d48", border: "#fecdd3" },
};

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getAllOrders();
    setOrders(data);
    setLoading(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = filterStatus
    ? orders.filter(o => o.status === filterStatus)
    : orders;

  // Stats
  const countByStatus = (s) => orders.filter(o => o.status === s).length;

  return (
    <>
      <style>{`
        .oadm-root { font-family: 'DM Sans', sans-serif; }

        /* ── Header ── */
        .oadm-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }

        .oadm-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.06em;
          color: #111827;
          margin-bottom: 10px;
        }

        .oadm-stats {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .oadm-stat {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 11px;
          border-radius: 8px;
          border: 1.5px solid;
          cursor: pointer;
          transition: opacity 0.15s;
        }

        .oadm-stat:hover { opacity: 0.75; }

        /* ── Toolbar ── */
        .oadm-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 16px;
        }

        .oadm-filter-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .oadm-filter-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
        }

        .oadm-select {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 7px 12px;
          color: #111827;
          background: #fff;
          cursor: pointer;
          outline: none;
          transition: border-color 0.18s;
        }

        .oadm-select:focus { border-color: #16a34a; }

        .oadm-count {
          font-size: 0.75rem;
          color: #9ca3af;
          font-weight: 500;
        }

        /* ── Table wrap ── */
        .oadm-table-wrap {
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #f3f4f6;
          overflow: hidden;
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }

        .oadm-table {
          width: 100%;
          border-collapse: collapse;
        }

        .oadm-table thead tr {
          background: #f9fafb;
          border-bottom: 1.5px solid #f3f4f6;
        }

        .oadm-table thead th {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #9ca3af;
          padding: 10px 16px;
          text-align: left;
          white-space: nowrap;
        }

        .oadm-table tbody tr {
          border-bottom: 1px solid #f9fafb;
          transition: background 0.12s;
        }

        .oadm-table tbody tr:last-child { border-bottom: none; }
        .oadm-table tbody tr:hover { background: #fafafa; }

        .oadm-table td {
          padding: 12px 16px;
          font-size: 0.83rem;
          color: #374151;
          vertical-align: middle;
        }

        .oadm-id {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: #9ca3af;
          background: #f9fafb;
          padding: 2px 8px;
          border-radius: 5px;
          border: 1px solid #f3f4f6;
          white-space: nowrap;
        }

        .oadm-date {
          font-size: 0.8rem;
          color: #6b7280;
          white-space: nowrap;
        }

        .oadm-address {
          font-size: 0.78rem;
          color: #6b7280;
          max-width: 200px;
        }

        .oadm-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.04em;
          color: #111827;
          white-space: nowrap;
        }

        .oadm-status-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 9px;
          border-radius: 999px;
          border: 1.5px solid;
          white-space: nowrap;
        }

        .oadm-status-select {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1.5px solid;
          border-radius: 8px;
          padding: 5px 10px;
          cursor: pointer;
          outline: none;
          transition: all 0.18s;
          background: transparent;
        }

        /* ── Empty ── */
        .oadm-empty {
          text-align: center;
          padding: 48px 16px;
          color: #9ca3af;
          font-size: 0.875rem;
        }

        /* ── Skeleton ── */
        .oadm-skeleton-row td {
          padding: 12px 16px;
        }

        .oadm-skeleton-cell {
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, #f3f4f6 25%, #eaebec 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: ftk-shimmer 1.4s infinite;
        }

      `}</style>

      <div className="oadm-root">

        {/* ── Header ── */}
        <div className="oadm-header">
          <div>
            <h1 className="oadm-title">Gestion des commandes</h1>
            <div className="oadm-stats">
              {ORDER_STATUSES.map(s => {
                const style = STATUS_STYLES[s.value] || STATUS_STYLES.pending;
                const count = countByStatus(s.value);
                if (count === 0) return null;
                return (
                  <span
                    key={s.value}
                    className="oadm-stat"
                    style={{ background: style.bg, color: style.color, borderColor: style.border }}
                    onClick={() => setFilterStatus(filterStatus === s.value ? "" : s.value)}
                  >
                    {s.label} · {count}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="oadm-toolbar">
          <div className="oadm-filter-wrap">
            <span className="oadm-filter-label">Filtrer</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="oadm-select"
            >
              <option value="">Tous les statuts</option>
              {ORDER_STATUSES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <span className="oadm-count">
            {filteredOrders.length} commande{filteredOrders.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Table ── */}
        <div className="oadm-table-wrap">
          <table className="oadm-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Adresse</th>
                <th>Total</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [1,2,3,4].map(i => (
                  <tr key={i} className="oadm-skeleton-row">
                    {[80, 100, 180, 60, 110].map((w, j) => (
                      <td key={j}><div className="oadm-skeleton-cell" style={{ width: w }} /></td>
                    ))}
                  </tr>
                ))
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="oadm-empty">Aucune commande trouvée.</td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  const style = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
                  return (
                    <tr key={order.id}>
                      <td><span className="oadm-id">#{order.id}</span></td>
                      <td>
                        <span className="oadm-date">
                          {new Date(order.created_at).toLocaleDateString("fr-FR", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </span>
                      </td>
                      <td>
                        <span className="oadm-address">
                          {order.street}, {order.postal_code} {order.city}
                        </span>
                      </td>
                      <td>
                        <span className="oadm-amount">
                          {(order.total_amount_in_cents / 100).toFixed(2)} €
                        </span>
                      </td>
                      <td>
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order.id, e.target.value)}
                          className="oadm-status-select"
                          style={{
                            background: style.bg,
                            color: style.color,
                            borderColor: style.border,
                          }}
                        >
                          {ORDER_STATUSES.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}