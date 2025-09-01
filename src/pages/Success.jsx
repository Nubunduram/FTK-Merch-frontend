import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Success() {
    const [loading, setLoading] = useState(true)
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
            setShowConfetti(true)
        }, 2000) // 2s loader
        return () => clearTimeout(timer)
    }, [])

    // Confetti simple en CSS
    useEffect(() => {
        if (!showConfetti) return
        const confettiCount = 100
        const confettiContainer = document.getElementById("confetti")
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement("div")
            confetti.className = "confetti"
            confetti.style.left = Math.random() * 100 + "vw"
            confetti.style.animationDuration = 2 + Math.random() * 3 + "s"
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`
            confettiContainer.appendChild(confetti)
        }
    }, [showConfetti])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75 mb-6"></div>
                <p className="text-lg text-gray-600">Confirmation de votre paiement en cours...</p>
            </div>
        )
    }

    return (
        <div className="relative container mx-auto py-12 text-center">
            <div id="confetti" className="fixed inset-0 pointer-events-none"></div>

            {/* Checkmark animé */}
            <div className="inline-block mb-6">
                <svg
                    className="w-24 h-24 text-green-500"
                    viewBox="0 0 52 52"
                >
                    <circle
                        className="stroke-current text-green-500"
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                        strokeWidth="2"
                    />
                    <path
                        className="checkmark"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        d="M14 27l7 7 16-16"
                    />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-green-600 mb-4">Paiement réussi 🎉</h1>
            <p className="mb-6">
                Merci pour votre commande ! Vous recevrez un email de confirmation sous peu.
            </p>
            <Link
                to="/"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Retourner à l’accueil
            </Link>

            {/* Confetti styles */}
            <style>{`
        .confetti {
          position: absolute;
          width: 8px;
          height: 8px;
          opacity: 0.7;
          top: -10px;
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-iteration-count: 1;
        }
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .checkmark {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: draw 0.7s forwards ease-out;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
        </div>
    )
}
