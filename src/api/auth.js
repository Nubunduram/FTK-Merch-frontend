// src/api/auth.js
const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:IZ3jdrGj";

async function handleResponse(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function signup(first_name, last_name, email, password) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ first_name, last_name, email, password }),
  });

  const data = await handleResponse(res);
  if (!res.ok) throw new Error(data?.message || "Erreur d'inscription");
  return data;
}

export async function loginRequest(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(res);
  if (!res.ok) throw new Error(data?.message || "Erreur de connexion");
  return data;
}

export async function getMe() {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await handleResponse(res);
  if (!res.ok) throw new Error(data?.message || "Token invalide");
  return data;
}
