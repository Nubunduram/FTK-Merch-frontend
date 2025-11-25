const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:zJjPxf0u";

// GET adresses d'un utilisateur
export async function getUserAddresses() {
    try {
        const res = await fetch(`${API_URL}/addresses`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des adresses");
        return await res.json();
    } catch (err) {
        console.error("getUserAddresses:", err);
        return [];
    }
}

// POST new address
export async function createAddress(data) {
    const res = await fetch(`${API_URL}/addresses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur création adresse");
    return res.json();
}

// PATCH update address
export async function updateAddress(id, data) {
    const res = await fetch(`${API_URL}/addresses/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur modification adresse");
    return res.json();
}

// DELETE address
export async function deleteAddress(id) {
    const res = await fetch(`${API_URL}/addresses/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!res.ok) throw new Error("Erreur suppression adresse");
    return res.json();
}

// PATCH update user
export async function updateUser(data) {
    const res = await fetch(`${API_URL}/users/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur mise à jour");
    return res.json();
}

// PATCH change password (séparé pour éviter d'envoyer password à chaque update)
export async function updatePassword(data) {
    const res = await fetch(`${API_URL}/users/change_password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur changement mot de passe");
    return res.json();
}