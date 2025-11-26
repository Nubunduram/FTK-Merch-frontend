// users.js
import { getHeaders, handleResponse } from './helpers';

const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:zJjPxf0u";

// GET adresses d'un utilisateur
export async function getUserAddresses() {
    try {
        const res = await fetch(`${API_URL}/addresses`, {
            method: 'GET',
            headers: getHeaders(false, true),
        });
        return await handleResponse(res);
    } catch (error) {
        console.error('Erreur getUserAddresses:', error);
        return [];
    }
}

// POST nouvelle adresse
export async function createAddress(data) {
    const res = await fetch(`${API_URL}/addresses`, {
        method: 'POST',
        headers: getHeaders(true, true),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

// PATCH update adresse
export async function updateAddress(id, data) {
    const res = await fetch(`${API_URL}/addresses/${id}`, {
        method: 'PATCH',
        headers: getHeaders(true, true),
        body: JSON.stringify({
            ...data,
            adresses_id: id
        }),
    });
    return handleResponse(res);
}

// DELETE adresse
export async function deleteAddress(id) {
    const res = await fetch(`${API_URL}/addresses/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true, true),
        body: JSON.stringify({ adresses_id: id }),
    });
    return handleResponse(res);
}

// PATCH update user
export async function updateUser(data) {
    const res = await fetch(`${API_URL}/users/me`, {
        method: 'PATCH',
        headers: getHeaders(true, true),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

// PATCH change password
export async function updatePassword(data) {
    const res = await fetch(`${API_URL}/users/change_password`, {
        method: 'PATCH',
        headers: getHeaders(true, true),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}
