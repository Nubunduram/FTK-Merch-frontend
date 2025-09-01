import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Cart() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Exemple de panier (plus tard on utilisera un CartContext ou Redux)
  const cartItems = [
    { id: 1, name: "T-shirt FTK", price: 20, quantity: 2, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Hoodie FTK", price: 45, quantity: 1, image: "https://via.placeholder.com/100" }
  ]

  const handleIncrease = (id) => {
    console.log("Augmenter quantité pour", id)
    // Plus tard on update le context
  }

  const handleDecrease = (id) => {
    console.log("Diminuer quantité pour", id)
    // Plus tard on update le context
  }

  const handleRemove = (id) => {
    console.log("Supprimer l'article", id)
    // Plus tard on update le context
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
        <p className="mb-6">Vous devez être connecté pour accéder à votre panier.</p>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Se connecter</Link>
          <Link to="/signup" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Créer un compte</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">Votre panier</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white shadow rounded p-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.price} €</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button onClick={() => handleDecrease(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                </div>
                <button onClick={() => handleRemove(item.id)} className="ml-4 text-red-600 hover:underline">
                  Supprimer
                </button>
              </div>
            ))}
          </div>

          {/* Résumé */}
          <div className="bg-gray-100 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Résumé</h3>
            <p className="flex justify-between mb-2">
              <span>Sous-total :</span> <span>{total} €</span>
            </p>
            <p className="flex justify-between font-bold text-lg">
              <span>Total :</span> <span>{total} €</span>
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Passer la commande
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
