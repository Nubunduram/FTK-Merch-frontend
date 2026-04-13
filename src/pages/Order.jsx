import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getOrderById } from "../api/orders"

export default function Order() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id)
        setOrder(data)
      } catch (err) {
        console.error("Erreur lors de la récupération de la commande :", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-orange-200 text-orange-800"
      case "paid": return "bg-green-200 text-green-800"
      case "shipped": return "bg-blue-200 text-blue-800"
      case "delivered": return "bg-teal-200 text-teal-800"
      case "canceled": return "bg-red-200 text-red-800"
      default: return "bg-gray-200 text-gray-800"
    }
  }

  if (loading) return <p className="p-4">Chargement de la commande...</p>
  if (!order) return <p className="p-4">Commande introuvable.</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/orders")}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
      >
        &larr; Retour à l'historique
      </button>

      <h1 className="text-3xl font-bold mb-6">Commande #{order.id}</h1>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Détails adresse & résumé */}
        <div className="lg:w-1/3 border p-6 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
          <p><strong>Date :</strong> {new Date(order.created_at).toLocaleDateString()}</p>
          <p>
            <strong>Status :</strong>
            <span className={`ml-2 px-2 py-0.25 rounded ${getStatusColor(order.status)} capitalize`}>
              {order.status}
            </span>
          </p>
          <p><strong>Montant :</strong> {(order.total_amount_in_cents / 100).toFixed(2)} €</p>
          <p className="mt-4 font-semibold">Adresse de livraison :</p>
          <p>{order.street}</p>
          <p>{order.city} ({order.postal_code})</p>
        </div>

        {/* Liste des produits */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Produits</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Image</th>
                <th className="border p-2 text-left">Produit</th>
                <th className="border p-2 text-left">Couleur</th>
                <th className="border p-2 text-left">Taille</th>
                <th className="border p-2 text-center">Quantité</th>
                <th className="border p-2 text-right">Prix unitaire</th>
              </tr>
            </thead>
            <tbody>
              {/* ✅ order.items au lieu de order._order_items_of_orders */}
              {(order.items ?? []).map(item => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">
                    <img
                      src={item.img_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{item.name}</td>       {/* ✅ */}
                  <td className="p-2">{item.color}</td>      {/* ✅ */}
                  <td className="p-2">{item.size}</td>       {/* ✅ */}
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-right">{(item.unit_price_in_cents / 100).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}