import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiShoppingCart } from "react-icons/hi";
import { FaReceipt, FaUser, FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getCategories } from "../api/products";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [categories, setCategories] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  const cartItemCount = cart
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const isActive = (path) => location.pathname === path;
  const isActiveSub = (path) => location.pathname.startsWith(path);
  const isActiveCategory = (slug) =>
    location.pathname.startsWith(`/category/${slug}`);

  // ✅ Track scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Track si on est mobile — ferme le menu si on passe en desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fermer le drawer au changement de route
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Erreur de chargement des catégories :", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .ftk-header {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          transition: box-shadow 0.3s ease;
        }

        .ftk-header.scrolled {
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
        }

        .ftk-topbar {
          height: 3px;
          background: linear-gradient(90deg, #15803d, #22c55e, #86efac, #22c55e, #15803d);
          background-size: 300% 100%;
          animation: ftk-slide 4s linear infinite;
        }

        @keyframes ftk-slide {
          0% { background-position: 0% 0; }
          100% { background-position: 300% 0; }
        }

        .ftk-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.06em;
          color: #111827;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ftk-logo-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #16a34a;
          border-radius: 50%;
          margin-bottom: 2px;
        }

        .ftk-logo:hover { opacity: 0.75; }

        .ftk-nav-link {
          position: relative;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #6b7280;
          transition: color 0.2s;
          padding: 4px 0;
        }

        .ftk-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #16a34a;
          border-radius: 2px;
          transition: width 0.25s ease;
        }

        .ftk-nav-link:hover { color: #111827; }
        .ftk-nav-link:hover::after { width: 100%; }

        .ftk-nav-link.ftk-active {
          color: #111827;
          font-weight: 700;
        }

        .ftk-nav-link.ftk-active::after {
          width: 100%;
        }

        .ftk-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: all 0.18s;
          position: relative;
        }

        .ftk-icon-btn:hover {
          background: #f0fdf4;
          color: #16a34a;
        }

        .ftk-icon-btn.ftk-active {
          background: #dcfce7;
          color: #16a34a;
        }

        .ftk-cart-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background: #16a34a;
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          min-width: 17px;
          height: 17px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 2px solid white;
        }

        .ftk-btn-login {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.45rem 1.1rem;
          background: #16a34a;
          color: #fff;
          border-radius: 8px;
          border: 2px solid #16a34a;
          transition: all 0.2s;
          white-space: nowrap;
          display: inline-block;
        }

        .ftk-btn-login:hover {
          background: transparent;
          color: #16a34a;
        }

        .ftk-btn-logout {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.45rem 1.1rem;
          background: transparent;
          color: #9ca3af;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
          transition: all 0.2s;
          cursor: pointer;
          white-space: nowrap;
        }

        .ftk-btn-logout:hover {
          border-color: #ef4444;
          color: #ef4444;
        }

        .ftk-drawer {
          animation: ftk-drop 0.2s ease;
          border-top: 1px solid #f3f4f6;
          background: white;
          padding: 4px 16px 20px;
        }

        @keyframes ftk-drop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ftk-mobile-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #374151;
          padding: 0.7rem 0;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.18s;
        }

        .ftk-mobile-link:hover,
        .ftk-mobile-link.ftk-active {
          color: #16a34a;
        }

        .ftk-mobile-link.ftk-active {
          font-weight: 700;
        }

        .ftk-pip {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #16a34a;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .ftk-divider {
          height: 1px;
          background: #f3f4f6;
          margin: 0.75rem 0;
        }
      `}</style>

      <header className={`ftk-header sticky top-0 z-50 ${scrolled ? "scrolled" : ""}`}>
        <div className="ftk-topbar" />

        <div className="container mx-auto flex items-center justify-between px-4 py-3">

          {/* ── Logo ── */}
          <Link to="/" className="ftk-logo" style={{ marginRight: "2.5rem" }}>
            FTK<span className="ftk-logo-dot" />MERCH
          </Link>

          {/* ── Desktop Nav ── */}
          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: "2rem", flex: 1 }}>
              <Link to="/" className={`ftk-nav-link ${isActive("/") ? "ftk-active" : ""}`}>
                Accueil
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className={`ftk-nav-link capitalize ${isActiveCategory(cat.slug) ? "ftk-active" : ""}`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          )}

          {/* ── Desktop Actions ── */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "2.5rem" }}>
              {user && (
                <Link
                  to="/profile"
                  className={`ftk-icon-btn ${isActive("/profile") ? "ftk-active" : ""}`}
                  title="Mon profil"
                >
                  <FaUser size={15} />
                </Link>
              )}

              {user && (
                <Link
                  to="/orders"
                  className={`ftk-icon-btn ${isActiveSub("/order") ? "ftk-active" : ""}`}
                  title="Mes commandes"
                >
                  <FaReceipt size={15} />
                </Link>
              )}

              <Link
                to="/cart"
                className={`ftk-icon-btn ${isActive("/cart") ? "ftk-active" : ""}`}
                title="Panier"
              >
                <HiShoppingCart size={18} />
                {cartItemCount > 0 && (
                  <span className="ftk-cart-badge">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </Link>

              <div style={{ marginLeft: "8px" }}>
                {!user ? (
                  <Link to="/login" className="ftk-btn-login">
                    Connexion
                  </Link>
                ) : (
                  <button onClick={logout} className="ftk-btn-logout">
                    Déconnexion
                  </button>
                )}
              </div>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className={`ftk-icon-btn ${isActiveSub("/admin") ? "ftk-active" : ""}`}
                  style={{ marginLeft: "4px" }}
                  title="Administration"
                >
                  <FaCog size={15} />
                </Link>
              )}
            </div>
          )}

          {/* ── Mobile : panier + toggle ── */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Link
                to="/cart"
                className={`ftk-icon-btn ${isActive("/cart") ? "ftk-active" : ""}`}
              >
                <HiShoppingCart size={18} />
                {cartItemCount > 0 && (
                  <span className="ftk-cart-badge">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </Link>

              <button
                className="ftk-icon-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
              >
                {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
              </button>
            </div>
          )}
        </div>

        {/* ── Mobile Drawer — rendu uniquement si mobile ET ouvert ── */}
        {isMobile && isOpen && (
          <div className="ftk-drawer">

            <Link
              to="/"
              className={`ftk-mobile-link ${isActive("/") ? "ftk-active" : ""}`}
            >
              {isActive("/") && <span className="ftk-pip" />}
              Accueil
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={`ftk-mobile-link capitalize ${isActiveCategory(cat.slug) ? "ftk-active" : ""}`}
              >
                {isActiveCategory(cat.slug) && <span className="ftk-pip" />}
                {cat.name}
              </Link>
            ))}

            <div className="ftk-divider" />

            {user && (
              <Link
                to="/profile"
                className={`ftk-mobile-link ${isActive("/profile") ? "ftk-active" : ""}`}
              >
                <FaUser size={13} /> Mon profil
              </Link>
            )}

            {user && (
              <Link
                to="/orders"
                className={`ftk-mobile-link ${isActiveSub("/order") ? "ftk-active" : ""}`}
              >
                <FaReceipt size={13} /> Mes commandes
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className={`ftk-mobile-link ${isActiveSub("/admin") ? "ftk-active" : ""}`}
              >
                <FaCog size={13} /> Administration
              </Link>
            )}

            <div className="ftk-divider" />

            <div style={{ paddingTop: "4px" }}>
              {!user ? (
                <Link to="/login" className="ftk-btn-login" style={{ display: "block", textAlign: "center" }}>
                  Connexion
                </Link>
              ) : (
                <button
                  className="ftk-btn-logout"
                  style={{ width: "100%", textAlign: "center" }}
                  onClick={logout}
                >
                  Déconnexion
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}