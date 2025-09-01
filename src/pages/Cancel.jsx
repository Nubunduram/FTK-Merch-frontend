import { Link } from "react-router-dom"

export default function Cancel() {
  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Paiement annulé ❌</h1>
      <p className="mb-6">
        Votre transaction a été annulée. Vous pouvez réessayer ou revenir à la boutique.
      </p>
      <Link
        to="/cart"
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        Retourner au panier
      </Link>
    </div>
  )
}
