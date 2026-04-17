import { Outlet, Link, useLocation } from "react-router-dom";
import { FaBoxOpen, FaClipboardList } from "react-icons/fa";

export default function AdminLayout() {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .adm-layout {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f9fafb;
        }

        .adm-topbar {
          background: #111827;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 3px solid #16a34a;
        }

        .adm-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.08em;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .adm-title-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          background: #16a34a;
          color: #fff;
          padding: 3px 8px;
          border-radius: 5px;
          margin-bottom: 2px;
        }

        .adm-nav {
          display: flex;
          gap: 6px;
        }

        .adm-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 7px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.18s;
          border: 1.5px solid transparent;
          color: #9ca3af;
        }

        .adm-nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.08);
        }

        .adm-nav-link.active {
          background: #16a34a;
          color: #fff;
          border-color: #16a34a;
        }

        .adm-content {
          padding: 32px;
          max-width: 1280px;
          margin: 0 auto;
        }
      `}</style>

      <div className="adm-layout">

        {/* ── Top bar ── */}
        <div className="adm-topbar">
          <div className="adm-title">
            FTK MERCH
            <span className="adm-title-badge">Admin</span>
          </div>

          <nav className="adm-nav">
            <Link
              to="products"
              className={`adm-nav-link ${isActive("products") ? "active" : ""}`}
            >
              <FaBoxOpen size={13} /> Produits
            </Link>
            <Link
              to="orders"
              className={`adm-nav-link ${isActive("orders") ? "active" : ""}`}
            >
              <FaClipboardList size={13} /> Commandes
            </Link>
          </nav>
        </div>

        {/* ── Page content ── */}
        <div className="adm-content">
          <Outlet />
        </div>

      </div>
    </>
  );
}