import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { getUserOrders } from "../api/orders" // <-- à créer dans orders.js

export default function OrdersHistory() {
    const { user } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        const fetchOrders = async () => {
            try {
                const data = await getUserOrders(user.id)
                setOrders(data)
            } catch (err) {
                console.error("Erreur lors de la récupération des commandes :", err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [user])

    const getStatusColor = (status) => {
        switch (status) {
            case "en attente": return "bg-orange-200 text-orange-800"
            case "payé": return "bg-green-200 text-green-800"
            case "envoyé": return "bg-blue-200 text-blue-800"
            case "livré": return "bg-teal-200 text-teal-800"
            case "annulé": return "bg-red-200 text-red-800"
            default: return "bg-gray-200 text-gray-800"
        }
    }

    if (loading) return <p className="p-4">Chargement des commandes...</p>
    if (!orders.length) return <p className="p-4">Vous n'avez pas encore passé de commandes.</p>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Historique des commandes</h1>
            <ul className="space-y-4">
                {orders.map(order => (
                    <li
                        key={order.id}
                        className="border p-4 rounded hover:shadow-md transition"
                    >
                        <Link to={`/order/${order.id}`} className="flex justify-between items-center">
                            <div>
                                <p><strong>Commande #{order.id}</strong></p>
                                <p>Date : {new Date(order.created_at).toLocaleDateString()}</p>
                                <p>Montant : {(order.total_amount_in_cents / 100).toFixed(2)} €</p>
                                <p>Status : <span className={`ml-2 px-2 py-0.25 rounded ${getStatusColor(order.status)} capitalize`}>{order.status}</span></p>
                            </div>
                            <div className="text-gray-500 hover:text-gray-800">→</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
