import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signupAndLogin } = useAuth();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);
      await signupAndLogin(first_name, last_name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .su-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #fff;
        }

        @media (max-width: 768px) {
          .su-root { grid-template-columns: 1fr; }
          .su-visual { display: none; }
        }

        /* ── Panneau gauche ── */
        .su-visual {
          background: #111827;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .su-visual-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 80% 20%, rgba(22,163,74,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 10% 90%, rgba(22,163,74,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .su-visual-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.08em;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 7px;
          position: relative;
          z-index: 1;
          text-decoration: none;
        }

        .su-visual-logo-dot {
          width: 8px; height: 8px;
          background: #16a34a;
          border-radius: 50%;
        }

        .su-visual-center {
          position: relative;
          z-index: 1;
        }

        .su-visual-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4.5rem;
          letter-spacing: 0.04em;
          line-height: 0.92;
          color: #fff;
          margin-bottom: 20px;
        }

        .su-visual-title span { color: #22c55e; }

        .su-visual-perks {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .su-visual-perk {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          color: #6b7280;
        }

        .su-visual-perk-dot {
          width: 6px; height: 6px;
          background: #16a34a;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .su-visual-bottom {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .su-visual-badge {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          background: rgba(22,163,74,0.15);
          border: 1px solid rgba(22,163,74,0.25);
          color: #22c55e;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .su-visual-tagline {
          font-size: 0.72rem;
          color: #4b5563;
        }

        /* ── Panneau droite ── */
        .su-form-side {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          overflow-y: auto;
        }

        .su-form-wrap {
          width: 100%;
          max-width: 380px;
        }

        .su-form-eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #16a34a;
          margin-bottom: 8px;
        }

        .su-form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          letter-spacing: 0.06em;
          color: #111827;
          margin-bottom: 6px;
        }

        .su-form-sub {
          font-size: 0.82rem;
          color: #9ca3af;
          margin-bottom: 28px;
        }

        .su-field { margin-bottom: 12px; }

        .su-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #374151;
          margin-bottom: 5px;
        }

        .su-input {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          padding: 11px 14px;
          color: #111827;
          background: #fff;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
          box-sizing: border-box;
        }

        .su-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.08);
        }

        .su-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 12px;
        }

        .su-error {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #fff1f2;
          border: 1px solid #fecdd3;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 0.8rem;
          color: #e11d48;
          margin-bottom: 14px;
        }

        .su-submit {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          width: 100%;
          padding: 13px;
          background: #16a34a;
          color: #fff;
          border: 2px solid #16a34a;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 6px;
        }

        .su-submit:hover:not(:disabled) {
          background: transparent;
          color: #16a34a;
        }

        .su-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .su-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }

        .su-divider-line {
          flex: 1;
          height: 1px;
          background: #f3f4f6;
        }

        .su-divider-text {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #d1d5db;
        }

        .su-login-link {
          text-align: center;
          font-size: 0.82rem;
          color: #9ca3af;
        }

        .su-login-link a {
          color: #16a34a;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.18s;
        }

        .su-login-link a:hover { opacity: 0.75; }
      `}</style>

      <div className="su-root">

        {/* ── Panneau gauche ── */}
        <div className="su-visual">
          <div className="su-visual-bg" />

          <Link to="/" className="su-visual-logo">
            FTK<span className="su-visual-logo-dot" />MERCH
          </Link>

          <div className="su-visual-center">
            <h2 className="su-visual-title">
              Rejoins<br />
              <span>la tribu.</span>
            </h2>
            <div className="su-visual-perks">
              <div className="su-visual-perk">
                <span className="su-visual-perk-dot" />
                Accès à votre historique de commandes
              </div>
              <div className="su-visual-perk">
                <span className="su-visual-perk-dot" />
                Adresses sauvegardées pour un checkout rapide
              </div>
              <div className="su-visual-perk">
                <span className="su-visual-perk-dot" />
                Nouvelles collections en avant-première
              </div>
            </div>
          </div>

          <div className="su-visual-bottom">
            <span className="su-visual-badge">Inscription gratuite</span>
            <span className="su-visual-tagline">En quelques secondes</span>
          </div>
        </div>

        {/* ── Formulaire ── */}
        <div className="su-form-side">
          <div className="su-form-wrap">

            <p className="su-form-eyebrow">Nouveau compte</p>
            <h1 className="su-form-title">Inscription</h1>
            <p className="su-form-sub">Créez votre compte pour commencer.</p>

            <form onSubmit={handleSubmit}>

              {/* Prénom + Nom sur la même ligne */}
              <div className="su-row">
                <div>
                  <label className="su-label">Prénom</label>
                  <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="su-input"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="su-label">Nom</label>
                  <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="su-input"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="su-field">
                <label className="su-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="su-input"
                  placeholder="vous@email.com"
                />
              </div>

              <div className="su-field">
                <label className="su-label">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="su-input"
                  placeholder="••••••••"
                />
              </div>

              <div className="su-field">
                <label className="su-label">Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="su-input"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="su-error">
                  <span>⚠</span> {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="su-submit">
                {loading ? "Inscription..." : "Créer mon compte →"}
              </button>
            </form>

            <div className="su-divider">
              <div className="su-divider-line" />
              <span className="su-divider-text">ou</span>
              <div className="su-divider-line" />
            </div>

            <p className="su-login-link">
              Déjà un compte ?{" "}
              <Link to="/login">Se connecter</Link>
            </p>

          </div>
        </div>

      </div>
    </>
  );
};

export default Signup;