import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowRight, FaReceipt } from "react-icons/fa"

export default function Success() {
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setShowConfetti(true)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showConfetti) return
    const container = document.getElementById("sc-confetti")
    if (!container) return
    const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#111827", "#f9fafb"]
    for (let i = 0; i < 90; i++) {
      const el = document.createElement("div")
      el.className = "sc-piece"
      el.style.left = Math.random() * 100 + "vw"
      el.style.animationDuration = 2.5 + Math.random() * 2.5 + "s"
      el.style.animationDelay = Math.random() * 0.8 + "s"
      el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)]
      el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px"
      el.style.width = el.style.height = 6 + Math.random() * 6 + "px"
      container.appendChild(el)
    }
  }, [showConfetti])

  return (
    <>
      <style>{`
        .sc-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 16px;
          background: #fff;
          position: relative;
        }

        /* ── Loader ── */
        .sc-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .sc-spinner {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 3px solid #f3f4f6;
          border-top-color: #16a34a;
          animation: sc-spin 0.8s linear infinite;
        }

        @keyframes sc-spin {
          to { transform: rotate(360deg); }
        }

        .sc-loader-text {
          font-size: 0.82rem;
          color: #9ca3af;
          letter-spacing: 0.04em;
        }

        /* ── Content ── */
        .sc-card {
          text-align: center;
          max-width: 460px;
          width: 100%;
          animation: sc-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes sc-pop {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ── Checkmark ── */
        .sc-check-wrap {
          width: 88px;
          height: 88px;
          margin: 0 auto 28px;
          position: relative;
        }

        .sc-check-bg {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #f0fdf4;
          border: 2px solid #bbf7d0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: sc-ring 0.4s ease;
        }

        @keyframes sc-ring {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .sc-checkmark {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: sc-draw 0.55s 0.3s forwards ease-out;
        }

        @keyframes sc-draw {
          to { stroke-dashoffset: 0; }
        }

        .sc-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          letter-spacing: 0.06em;
          color: #111827;
          margin-bottom: 10px;
        }

        .sc-sub {
          font-size: 0.88rem;
          color: #6b7280;
          line-height: 1.65;
          margin-bottom: 32px;
          max-width: 320px;
          margin-left: auto;
          margin-right: auto;
        }

        .sc-divider {
          height: 1px;
          background: #f3f4f6;
          margin-bottom: 28px;
        }

        .sc-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sc-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 12px 24px;
          background: #16a34a;
          color: #fff;
          border-radius: 10px;
          border: 2px solid #16a34a;
          transition: all 0.2s;
        }

        .sc-btn-primary:hover {
          background: transparent;
          color: #16a34a;
        }

        .sc-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 12px 24px;
          background: transparent;
          color: #9ca3af;
          border-radius: 10px;
          border: 2px solid #f3f4f6;
          transition: all 0.2s;
        }

        .sc-btn-secondary:hover {
          border-color: #e5e7eb;
          color: #374151;
        }

        /* ── Confetti ── */
        #sc-confetti {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          overflow: hidden;
        }

        .sc-piece {
          position: absolute;
          top: -12px;
          opacity: 0.85;
          animation-name: sc-fall;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }

        @keyframes sc-fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0.85; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(105vh) rotate(540deg); opacity: 0; }
        }
      `}</style>

      <div id="sc-confetti" />

      <div className="sc-root">
        {loading ? (
          <div className="sc-loader">
            <div className="sc-spinner" />
            <p className="sc-loader-text">Confirmation en cours...</p>
          </div>
        ) : (
          <div className="sc-card">

            {/* Checkmark */}
            <div className="sc-check-wrap">
              <div className="sc-check-bg">
                <svg width="40" height="40" viewBox="0 0 52 52" fill="none">
                  <path
                    className="sc-checkmark"
                    stroke="#16a34a"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 27l7 7 16-16"
                  />
                </svg>
              </div>
            </div>

            <h1 className="sc-title">Commande confirmée !</h1>
            <p className="sc-sub">
              Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
            </p>

            <div className="sc-divider" />

            <div className="sc-actions">
              <Link to="/orders" className="sc-btn-primary">
                <FaReceipt size={12} /> Voir mes commandes
              </Link>
              <Link to="/" className="sc-btn-secondary">
                Continuer mes achats <FaArrowRight size={11} />
              </Link>
            </div>

          </div>
        )}
      </div>
    </>
  )
}