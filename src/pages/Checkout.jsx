import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Checkout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Simuler un panier pour l'exemple (plus tard relié au CartContext)
  const cartItems = [
    { id: 1, name: "T-shirt FTK", price: 20, quantity: 2 },
    { id: 2, name: "Hoodie FTK", price: 45, quantity: 1 }
  ]
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Formulaire livraison
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheckout = async () => {
    try {
      // Call back-end crée la session Stripe
      // Exemple (backend route: POST /create-checkout-session)
      /*
      const res = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, form })
      })
      const data = await res.json()
      Redirige vers Stripe Checkout
      */
      console.log("Checkout avec Stripe (à intégrer)")
    } catch (err) {
      console.error("Erreur checkout:", err)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Accès refusé</h2>
        <p className="mb-6">Vous devez être connecté pour passer commande.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Informations de livraison</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="Ville"
            value={form.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Code postal"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </form>
      </div>

      <div className="bg-gray-100 p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Résumé de la commande</h3>
        <ul className="mb-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>{item.price * item.quantity} €</span>
            </li>
          ))}
        </ul>
        <p className="flex justify-between font-bold text-lg">
          <span>Total :</span> <span>{total} €</span>
        </p>
        <button
          onClick={handleCheckout}
          className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Payer
        </button>
      </div>
    </div>
  )
}
