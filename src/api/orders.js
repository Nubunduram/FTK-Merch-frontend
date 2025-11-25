const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:LOlQSlyq";

// GET orders list by user
export async function getUserOrders() {
  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Erreur récupération commandes");
  return res.json();
}

// GET order by ID
export async function getOrderById(orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération de la commande")
  }

  return await res.json()
}



// POST orders
export async function postOrder(orderData) {
    const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
    });

    if (!res.ok) {
        throw new Error("Erreur lors de la création de la commande");
    }

    return await res.json();
}