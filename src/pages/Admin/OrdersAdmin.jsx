import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/admin";

const ORDER_STATUSES = [
  "en attente",
  "payé",
  "envoyé",
  "livré",
  "annulé",
];

const statusColor = {
  "en attente": "bg-yellow-100",
  "payé": "bg-purple-100",
  "envoyé": "bg-blue-100",
  "livré": "bg-green-100",
  "annulé": "bg-red-100",
};


export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await getAllOrders();
    setOrders(data);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
  };

  const filteredOrders = filterStatus
    ? orders.filter((o) => o.status === filterStatus)
    : orders;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Gestion des commandes
      </h1>

      {/* Filtre */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="">Tous les statuts</option>
        {ORDER_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">ID</th>
            <th>Date</th>
            <th>Adresse</th>
            <th>Total</th>
            <th>Statut</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className={`border-t ${statusColor[order.status]}`}>
              <td className="p-2 font-mono">{order.id}</td>

              <td>
                {new Date(order.created_at).toLocaleDateString()}
              </td>

              <td>
                {order.street}, {order.postal_code} {order.city}
              </td>

              <td>
                {(order.total_amount_in_cents / 100).toFixed(2)} €
              </td>

              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  className="border p-1"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
