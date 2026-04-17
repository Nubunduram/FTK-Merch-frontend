import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .ftk-footer {
          font-family: 'DM Sans', sans-serif;
          background: #0c0c0c;
          color: #d1d5db;
        }

        .ftk-footer-bar {
          height: 3px;
          background: linear-gradient(90deg, #15803d, #22c55e, #86efac, #22c55e, #15803d);
          background-size: 300% 100%;
          animation: ftk-slide 4s linear infinite;
        }

        @keyframes ftk-slide {
          0%   { background-position: 0% 0; }
          100% { background-position: 300% 0; }
        }

        .ftk-footer-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          letter-spacing: 0.06em;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 8px;
          line-height: 1;
        }

        .ftk-footer-logo-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #22c55e;
          border-radius: 50%;
          margin-bottom: 3px;
          animation: ftk-pulse 2.5s ease-in-out infinite;
        }

        @keyframes ftk-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }

        .ftk-footer-tagline {
          font-size: 0.72rem;
          font-weight: 400;
          color: #4b5563;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .ftk-footer-desc {
          font-size: 0.82rem;
          color: #6b7280;
          line-height: 1.65;
          margin-top: 1rem;
          max-width: 220px;
        }

        .ftk-footer-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.15em;
          color: #22c55e;
          margin-bottom: 1rem;
        }

        .ftk-footer-link {
          display: block;
          font-size: 0.82rem;
          color: #9ca3af;
          margin-bottom: 0.55rem;
          transition: color 0.18s, padding-left 0.18s;
          width: fit-content;
        }

        .ftk-footer-link:hover {
          color: #22c55e;
          padding-left: 5px;
        }

        .ftk-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 1px solid #1f2937;
          color: #6b7280;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .ftk-social:hover {
          border-color: #22c55e;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.07);
          transform: translateY(-2px);
        }

        .ftk-footer-hr {
          border: none;
          border-top: 1px solid #1a1a1a;
          margin: 2.5rem 0 1.5rem;
        }

        .ftk-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.72rem;
          color: #374151;
        }

        .ftk-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.18);
          color: #22c55e;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.28rem 0.75rem;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
        }

        .ftk-badge-dot {
          width: 5px;
          height: 5px;
          background: #22c55e;
          border-radius: 50%;
          animation: ftk-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <footer className="ftk-footer">
        <div className="ftk-footer-bar" />

        <div className="container mx-auto px-4 pt-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* ── Brand ── */}
            <div className="md:col-span-1">
              <Link to="/" className="ftk-footer-logo">
                FTK<span className="ftk-footer-logo-dot" />MERCH
              </Link>
              <p className="ftk-footer-tagline">Collection exclusive</p>
              <p className="ftk-footer-desc">
                Des vêtements pensés pour ceux qui osent s'affirmer. Qualité premium, style unique.
              </p>
              <div className="flex gap-2 mt-5">
                <a href="#" className="ftk-social" aria-label="Instagram"><FaInstagram size={15} /></a>
                <a href="#" className="ftk-social" aria-label="TikTok"><FaTiktok size={14} /></a>
                <a href="#" className="ftk-social" aria-label="Twitter"><FaTwitter size={14} /></a>
                <a href="#" className="ftk-social" aria-label="YouTube"><FaYoutube size={15} /></a>
              </div>
            </div>

            {/* ── Boutique ── */}
            <div>
              <p className="ftk-footer-heading">Boutique</p>
              <Link to="/" className="ftk-footer-link">Accueil</Link>
              <Link to="/category/homme" className="ftk-footer-link">Homme</Link>
              <Link to="/category/femme" className="ftk-footer-link">Femme</Link>
              <Link to="/category/enfants" className="ftk-footer-link">Enfants</Link>
            </div>

            {/* ── Mon compte ── */}
            <div>
              <p className="ftk-footer-heading">Mon compte</p>
              <Link to="/profile" className="ftk-footer-link">Mon profil</Link>
              <Link to="/orders" className="ftk-footer-link">Mes commandes</Link>
              <Link to="/cart" className="ftk-footer-link">Mon panier</Link>
              <Link to="/login" className="ftk-footer-link">Connexion</Link>
            </div>

            {/* ── Infos ── */}
            <div>
              <p className="ftk-footer-heading">Informations</p>
              <a href="#" className="ftk-footer-link">À propos</a>
              <a href="#" className="ftk-footer-link">Livraison & retours</a>
              <a href="#" className="ftk-footer-link">Mentions légales</a>
              <a href="#" className="ftk-footer-link">Contact</a>

              <div style={{ marginTop: "1.5rem" }}>
                <span className="ftk-badge">
                  <span className="ftk-badge-dot" />
                  Livraison offerte dès 60€
                </span>
              </div>
            </div>
          </div>

          <hr className="ftk-footer-hr" />

          <div className="ftk-footer-bottom">
            <span>© {year} FTK Merch — Tous droits réservés.</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href="#" className="ftk-footer-link" style={{ marginBottom: 0 }}>Confidentialité</a>
              <a href="#" className="ftk-footer-link" style={{ marginBottom: 0 }}>CGV</a>
              <a href="#" className="ftk-footer-link" style={{ marginBottom: 0 }}>Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}