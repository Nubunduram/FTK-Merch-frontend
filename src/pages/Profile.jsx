import { useEffect, useState } from "react";
import { updateUser, updatePassword } from "../api/users";
import { getMe } from "../api/auth";
import {
    getUserAddresses,
    createAddress,
    updateAddress,
    deleteAddress
} from "../api/users";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);

    const [editingUser, setEditingUser] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);

    const [formUser, setFormUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    const [formPassword, setFormPassword] = useState({
        old_password: "",
        new_password: "",
    });

    const [formAddress, setFormAddress] = useState({
        label: "",
        street: "",
        city: "",
        postal_code: "",
    });

    useEffect(() => {
        async function fetchData() {
            const me = await getMe();
            setUser(me);
            setFormUser({
                first_name: me.first_name,
                last_name: me.last_name,
                email: me.email,
            });

            const addr = await getUserAddresses();
            setAddresses(addr);
        }

        fetchData();
    }, []);

    async function handleUpdateUser(e) {
        e.preventDefault();
        await updateUser(formUser);
        const me = await getMe();
        setUser(me);
        setFormUser({
            first_name: me.first_name,
            last_name: me.last_name,
            email: me.email,
        });
        alert("Profil mis à jour !");
        setEditingUser(false);
    }

    async function handleUpdatePassword(e) {
        e.preventDefault();
        await updatePassword(formPassword);
        alert("Mot de passe mis à jour !");
        setEditingPassword(false);
    }

    async function handleSaveAddress(e) {
        e.preventDefault();
        if (editingAddressId) {
            await updateAddress(editingAddressId, formAddress);
        } else {
            await createAddress(formAddress);
        }

        const addr = await getUserAddresses();
        setAddresses(addr);

        setEditingAddressId(null);
        setFormAddress({ label: "", street: "", city: "", postal_code: "" });
    }

    async function handleDeleteAddress(id) {
        if (!confirm("Supprimer cette adresse ?")) return;
        await deleteAddress(id);
        setAddresses(await getUserAddresses());
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Mon Compte</h1>

            {/* --- TABS --- */}
            <div className="flex justify-center mb-8 border-b">
                {[
                    { id: "profile", label: "Profil" },
                    { id: "security", label: "Sécurité" },
                    { id: "addresses", label: "Adresses" },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 text-lg font-medium 
                            ${activeTab === tab.id
                                ? "border-b-4 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* --- TAB CONTENT --- */}
            {activeTab === "profile" && (
                <section className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h2 className="text-xl font-semibold">Informations personnelles</h2>

                    {!editingUser ? (
                        <div className="space-y-2">
                            <p><span className="font-medium">Prénom :</span> {user?.first_name}</p>
                            <p><span className="font-medium">Nom :</span> {user?.last_name}</p>
                            <p><span className="font-medium">Email :</span> {user?.email}</p>

                            <button
                                onClick={() => setEditingUser(true)}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Modifier
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <input
                                type="text"
                                value={formUser.first_name}
                                onChange={e => setFormUser({ ...formUser, first_name: e.target.value })}
                                className="w-full border p-2 rounded"
                                placeholder="Prénom"
                            />
                            <input
                                type="text"
                                value={formUser.last_name}
                                onChange={e => setFormUser({ ...formUser, last_name: e.target.value })}
                                className="w-full border p-2 rounded"
                                placeholder="Nom"
                            />
                            <input
                                type="email"
                                value={formUser.email}
                                onChange={e => setFormUser({ ...formUser, email: e.target.value })}
                                className="w-full border p-2 rounded"
                                placeholder="Email"
                            />

                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
                                <button type="button" onClick={() => setEditingUser(false)} className="px-4 py-2 bg-gray-300 rounded">
                                    Annuler
                                </button>
                            </div>
                        </form>
                    )}
                </section>
            )}

            {activeTab === "security" && (
                <section className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h2 className="text-xl font-semibold">Sécurité</h2>

                    {!editingPassword ? (
                        <button
                            onClick={() => setEditingPassword(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Changer le mot de passe
                        </button>
                    ) : (
                        <form onSubmit={handleUpdatePassword} className="space-y-4">
                            <input
                                type="password"
                                placeholder="Ancien mot de passe"
                                value={formPassword.old_password}
                                onChange={e => setFormPassword({ ...formPassword, old_password: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="password"
                                placeholder="Nouveau mot de passe"
                                value={formPassword.new_password}
                                onChange={e => setFormPassword({ ...formPassword, new_password: e.target.value })}
                                className="w-full border p-2 rounded"
                            />

                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded">Mettre à jour</button>
                                <button type="button" onClick={() => setEditingPassword(false)} className="px-4 py-2 bg-gray-300 rounded">
                                    Annuler
                                </button>
                            </div>
                        </form>
                    )}
                </section>
            )}

            {activeTab === "addresses" && (
                <section className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Mes adresses</h2>

                    <ul className="space-y-4 mb-8">
                        {addresses.map(addr => (
                            <li key={addr.id} className="border p-4 rounded bg-gray-50">
                                <p className="font-medium">{addr.label}</p>
                                <p>{addr.street}</p>
                                <p>{addr.city} {addr.postal_code}</p>

                                <div className="flex gap-3 mt-3">
                                    <button
                                        onClick={() => {
                                            setEditingAddressId(addr.id);
                                            setFormAddress(addr);
                                        }}
                                        className="px-3 py-1 bg-blue-600 text-white rounded"
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        onClick={() => handleDeleteAddress(addr.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">
                        {editingAddressId ? "Modifier l'adresse" : "Ajouter une adresse"}
                    </h3>

                    <form onSubmit={handleSaveAddress} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Label (ex : Maison)"
                            value={formAddress.label}
                            onChange={e => setFormAddress({ ...formAddress, label: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Rue"
                            value={formAddress.street}
                            onChange={e => setFormAddress({ ...formAddress, street: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Ville"
                            value={formAddress.city}
                            onChange={e => setFormAddress({ ...formAddress, city: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Code postal"
                            value={formAddress.postal_code}
                            onChange={e => setFormAddress({ ...formAddress, postal_code: e.target.value })}
                            className="w-full border p-2 rounded"
                        />

                        <button className="px-4 py-2 bg-blue-600 text-white rounded">
                            {editingAddressId ? "Mettre à jour" : "Ajouter"}
                        </button>
                    </form>
                </section>
            )}
        </div>
    );
}
