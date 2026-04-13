import { getHeaders, handleResponse } from "./helpers";

const API_URL = "http://localhost:3001/api";

// GET orders list by user
export async function getUserOrders() {
  const res = await fetch(`${API_URL}/orders`, {
    headers: getHeaders(false, true), // true = besoin du token
  });
  return handleResponse(res);
}

// GET order by ID
export async function getOrderById(orderId) {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: getHeaders(false, true),
  });
  return handleResponse(res);
}

// POST orders
export async function postOrder(orderData) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: getHeaders(true, true),
    body: JSON.stringify(orderData),
  });
  return handleResponse(res);
}
