import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowRight, FaReceipt } from "react-icons/fa"
import styles from './Success.module.css'

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
    if (!container || container.childElementCount > 0) return
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
    return () => { container.innerHTML = "" }
  }, [showConfetti])

  return (
    <>
      <div id="sc-confetti" />

      <div className={styles.scRoot}>
        {loading ? (
          <div className={styles.scLoader}>
            <div className={styles.scSpinner} />
            <p className={styles.scLoaderText}>Confirmation en cours...</p>
          </div>
        ) : (
          <div className={styles.scCard}>

            {/* Checkmark */}
            <div className={styles.scCheckWrap}>
              <div className={styles.scCheckBg}>
                <svg width="40" height="40" viewBox="0 0 52 52" fill="none">
                  <path
                    className={styles.scCheckmark}
                    stroke="#16a34a"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 27l7 7 16-16"
                  />
                </svg>
              </div>
            </div>

            <h1 className={styles.scTitle}>Commande confirmée !</h1>
            <p className={styles.scSub}>
              Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
            </p>

            <div className={styles.scDivider} />

            <div className={styles.scActions}>
              <Link to="/orders" className={styles.scBtnPrimary}>
                <FaReceipt size={12} /> Voir mes commandes
              </Link>
              <Link to="/" className={styles.scBtnSecondary}>
                Continuer mes achats <FaArrowRight size={11} />
              </Link>
            </div>

          </div>
        )}
      </div>
    </>
  )
}
