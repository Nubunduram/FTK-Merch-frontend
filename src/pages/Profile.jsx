import { useEffect, useState } from "react";
import { updateUser, updatePassword, getUserAddresses, createAddress, updateAddress, deleteAddress } from "../api/users";
import { getMe } from "../api/auth";
import { FaUser, FaLock, FaMapMarkerAlt, FaPencilAlt, FaTrash, FaCheck, FaTimes, FaPlus } from "react-icons/fa";

const TABS = [
  { id: "profile",   label: "Profil",    icon: FaUser },
  { id: "security",  label: "Sécurité",  icon: FaLock },
  { id: "addresses", label: "Adresses",  icon: FaMapMarkerAlt },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [editingUser, setEditingUser] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formUser, setFormUser] = useState({ first_name: "", last_name: "", email: "" });
  const [formPassword, setFormPassword] = useState({ old_password: "", new_password: "" });
  const [formAddress, setFormAddress] = useState({ label: "", street: "", city: "", postal_code: "" });

  useEffect(() => {
    async function fetchData() {
      const me = await getMe();
      setUser(me);
      setFormUser({ first_name: me.first_name, last_name: me.last_name, email: me.email });
      const addr = await getUserAddresses();
      setAddresses(addr);
    }
    fetchData();
  }, []);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  async function handleUpdateUser(e) {
    e.preventDefault();
    await updateUser(formUser);
    const me = await getMe();
    setUser(me);
    setFormUser({ first_name: me.first_name, last_name: me.last_name, email: me.email });
    setEditingUser(false);
    showSuccess("Profil mis à jour !");
  }

  async function handleUpdatePassword(e) {
    e.preventDefault();
    await updatePassword(formPassword);
    setEditingPassword(false);
    setFormPassword({ old_password: "", new_password: "" });
    showSuccess("Mot de passe mis à jour !");
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
    setShowAddressForm(false);
    setFormAddress({ label: "", street: "", city: "", postal_code: "" });
    showSuccess(editingAddressId ? "Adresse mise à jour !" : "Adresse ajoutée !");
  }

  async function handleDeleteAddress(id) {
    if (!confirm("Supprimer cette adresse ?")) return;
    await deleteAddress(id);
    setAddresses(await getUserAddresses());
  }

  const initials = user ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() : "?";

  return (
    <>
      <style>{`
        .prf-root {
          font-family: 'DM Sans', sans-serif;
          background: #f9fafb;
          min-height: 60vh;
          padding: 40px 32px 64px;
        }

        .prf-inner { max-width: 860px; margin: 0 auto; }

        /* ── Header ── */
        .prf-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 32px;
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 16px;
          padding: 20px 24px;
        }

        .prf-avatar {
          width: 56px; height: 56px;
          border-radius: 14px;
          background: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.06em;
          color: #22c55e;
          flex-shrink: 0;
        }

        .prf-header-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0.06em;
          color: #111827;
          line-height: 1;
          margin-bottom: 3px;
        }

        .prf-header-email {
          font-size: 0.78rem;
          color: #9ca3af;
        }

        /* ── Toast ── */
        .prf-toast {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 0.82rem;
          color: #15803d;
          font-weight: 500;
          margin-bottom: 20px;
          animation: prf-fade 0.2s ease;
        }

        @keyframes prf-fade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Tabs ── */
        .prf-tabs {
          display: flex;
          gap: 4px;
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 12px;
          padding: 5px;
          margin-bottom: 20px;
        }

        .prf-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 9px 12px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.18s;
          color: #9ca3af;
          background: transparent;
        }

        .prf-tab:hover { color: #374151; background: #f9fafb; }

        .prf-tab.active {
          background: #111827;
          color: #fff;
        }

        /* ── Card ── */
        .prf-card {
          background: #fff;
          border: 1.5px solid #f3f4f6;
          border-radius: 16px;
          overflow: hidden;
        }

        .prf-card-header {
          padding: 16px 24px;
          border-bottom: 1px solid #f9fafb;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .prf-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.08em;
          color: #111827;
        }

        .prf-card-body { padding: 20px 24px; }

        /* ── Info rows ── */
        .prf-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f9fafb;
        }

        .prf-info-row:last-child { border-bottom: none; }

        .prf-info-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          min-width: 80px;
        }

        .prf-info-value {
          font-size: 0.88rem;
          font-weight: 500;
          color: #111827;
          flex: 1;
          padding: 0 16px;
        }

        /* ── Buttons ── */
        .prf-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 7px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.18s;
          border: 1.5px solid transparent;
        }

        .prf-btn-primary {
          background: #16a34a;
          color: #fff;
          border-color: #16a34a;
        }

        .prf-btn-primary:hover { background: #15803d; }

        .prf-btn-outline {
          background: transparent;
          color: #374151;
          border-color: #e5e7eb;
        }

        .prf-btn-outline:hover { border-color: #9ca3af; color: #111827; }

        .prf-btn-danger {
          background: transparent;
          color: #ef4444;
          border-color: #fecdd3;
        }

        .prf-btn-danger:hover { background: #fff1f2; }

        .prf-btn-ghost {
          background: transparent;
          color: #6b7280;
          border-color: #e5e7eb;
        }

        .prf-btn-ghost:hover { color: #374151; border-color: #9ca3af; }

        /* ── Inputs ── */
        .prf-input {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 9px 12px;
          color: #111827;
          background: #fff;
          outline: none;
          transition: border-color 0.18s;
          box-sizing: border-box;
        }

        .prf-input:focus { border-color: #16a34a; }

        .prf-input-label {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #374151;
          margin-bottom: 5px;
        }

        .prf-field { margin-bottom: 12px; }

        .prf-form-actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        /* ── Addresses ── */
        .prf-addr-card {
          background: #f9fafb;
          border: 1.5px solid #f3f4f6;
          border-radius: 10px;
          padding: 14px 16px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .prf-addr-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #16a34a;
          margin-bottom: 4px;
        }

        .prf-addr-line {
          font-size: 0.82rem;
          color: #374151;
          line-height: 1.5;
        }

        .prf-addr-actions { display: flex; gap: 6px; flex-shrink: 0; }

        .prf-addr-icon-btn {
          width: 30px; height: 30px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          cursor: pointer;
          color: #9ca3af;
          transition: all 0.15s;
        }

        .prf-addr-icon-btn:hover { border-color: #111827; color: #111827; }
        .prf-addr-icon-btn.del:hover { border-color: #ef4444; color: #ef4444; background: #fff1f2; }

        /* ── Address form ── */
        .prf-addr-form {
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          border-radius: 12px;
          padding: 16px;
          margin-top: 12px;
          animation: prf-fade 0.2s ease;
        }

        .prf-addr-form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.08em;
          color: #15803d;
          margin-bottom: 12px;
        }

        .prf-addr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 12px;
        }

        @media (max-width: 560px) {
          .prf-addr-grid { grid-template-columns: 1fr; }
          .prf-root { padding: 24px 16px 48px; }
          .prf-tab span { display: none; }
        }
      `}</style>

      <div className="prf-root">
        <div className="prf-inner">

          {/* ── Header ── */}
          <div className="prf-header">
            <div className="prf-avatar">{initials}</div>
            <div>
              <p className="prf-header-name">{user?.first_name} {user?.last_name}</p>
              <p className="prf-header-email">{user?.email}</p>
            </div>
          </div>

          {/* ── Toast ── */}
          {successMsg && (
            <div className="prf-toast">
              <FaCheck size={12} /> {successMsg}
            </div>
          )}

          {/* ── Tabs ── */}
          <div className="prf-tabs">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`prf-tab ${activeTab === tab.id ? "active" : ""}`}
                >
                  <Icon size={12} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ══════════════════════════════
              TAB — PROFIL
          ══════════════════════════════ */}
          {activeTab === "profile" && (
            <div className="prf-card">
              <div className="prf-card-header">
                <p className="prf-card-title">Informations personnelles</p>
                {!editingUser && (
                  <button className="prf-btn prf-btn-outline" onClick={() => setEditingUser(true)}>
                    <FaPencilAlt size={10} /> Modifier
                  </button>
                )}
              </div>
              <div className="prf-card-body">
                {!editingUser ? (
                  <>
                    <div className="prf-info-row">
                      <span className="prf-info-label">Prénom</span>
                      <span className="prf-info-value">{user?.first_name}</span>
                    </div>
                    <div className="prf-info-row">
                      <span className="prf-info-label">Nom</span>
                      <span className="prf-info-value">{user?.last_name}</span>
                    </div>
                    <div className="prf-info-row">
                      <span className="prf-info-label">Email</span>
                      <span className="prf-info-value">{user?.email}</span>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleUpdateUser}>
                    <div className="prf-field">
                      <label className="prf-input-label">Prénom</label>
                      <input type="text" value={formUser.first_name} onChange={e => setFormUser({ ...formUser, first_name: e.target.value })} className="prf-input" />
                    </div>
                    <div className="prf-field">
                      <label className="prf-input-label">Nom</label>
                      <input type="text" value={formUser.last_name} onChange={e => setFormUser({ ...formUser, last_name: e.target.value })} className="prf-input" />
                    </div>
                    <div className="prf-field">
                      <label className="prf-input-label">Email</label>
                      <input type="email" value={formUser.email} onChange={e => setFormUser({ ...formUser, email: e.target.value })} className="prf-input" />
                    </div>
                    <div className="prf-form-actions">
                      <button type="submit" className="prf-btn prf-btn-primary"><FaCheck size={10} /> Enregistrer</button>
                      <button type="button" className="prf-btn prf-btn-ghost" onClick={() => setEditingUser(false)}><FaTimes size={10} /> Annuler</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ══════════════════════════════
              TAB — SÉCURITÉ
          ══════════════════════════════ */}
          {activeTab === "security" && (
            <div className="prf-card">
              <div className="prf-card-header">
                <p className="prf-card-title">Mot de passe</p>
              </div>
              <div className="prf-card-body">
                {!editingPassword ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>••••••••••••</p>
                    <button className="prf-btn prf-btn-outline" onClick={() => setEditingPassword(true)}>
                      <FaPencilAlt size={10} /> Modifier
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleUpdatePassword}>
                    <div className="prf-field">
                      <label className="prf-input-label">Mot de passe actuel</label>
                      <input type="password" placeholder="••••••••" value={formPassword.old_password} onChange={e => setFormPassword({ ...formPassword, old_password: e.target.value })} className="prf-input" />
                    </div>
                    <div className="prf-field">
                      <label className="prf-input-label">Nouveau mot de passe</label>
                      <input type="password" placeholder="••••••••" value={formPassword.new_password} onChange={e => setFormPassword({ ...formPassword, new_password: e.target.value })} className="prf-input" />
                    </div>
                    <div className="prf-form-actions">
                      <button type="submit" className="prf-btn prf-btn-primary"><FaCheck size={10} /> Mettre à jour</button>
                      <button type="button" className="prf-btn prf-btn-ghost" onClick={() => setEditingPassword(false)}><FaTimes size={10} /> Annuler</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ══════════════════════════════
              TAB — ADRESSES
          ══════════════════════════════ */}
          {activeTab === "addresses" && (
            <div className="prf-card">
              <div className="prf-card-header">
                <p className="prf-card-title">Mes adresses</p>
                <button
                  className="prf-btn prf-btn-primary"
                  onClick={() => {
                    setShowAddressForm(!showAddressForm);
                    setEditingAddressId(null);
                    setFormAddress({ label: "", street: "", city: "", postal_code: "" });
                  }}
                >
                  <FaPlus size={10} /> Ajouter
                </button>
              </div>

              <div className="prf-card-body">
                {addresses.length === 0 && !showAddressForm && (
                  <p style={{ fontSize: "0.82rem", color: "#9ca3af" }}>Aucune adresse enregistrée.</p>
                )}

                {addresses.map(addr => (
                  <div key={addr.id} className="prf-addr-card">
                    <div>
                      <p className="prf-addr-label">{addr.label}</p>
                      <p className="prf-addr-line">{addr.street}<br />{addr.postal_code} {addr.city}</p>
                    </div>
                    <div className="prf-addr-actions">
                      <button
                        className="prf-addr-icon-btn"
                        onClick={() => {
                          setEditingAddressId(addr.id);
                          setFormAddress(addr);
                          setShowAddressForm(true);
                        }}
                        title="Modifier"
                      >
                        <FaPencilAlt size={11} />
                      </button>
                      <button className="prf-addr-icon-btn del" onClick={() => handleDeleteAddress(addr.id)} title="Supprimer">
                        <FaTrash size={11} />
                      </button>
                    </div>
                  </div>
                ))}

                {showAddressForm && (
                  <div className="prf-addr-form">
                    <p className="prf-addr-form-title">
                      {editingAddressId ? "Modifier l'adresse" : "Nouvelle adresse"}
                    </p>
                    <form onSubmit={handleSaveAddress}>
                      <div className="prf-field">
                        <label className="prf-input-label">Label</label>
                        <input type="text" placeholder="ex : Maison" value={formAddress.label} onChange={e => setFormAddress({ ...formAddress, label: e.target.value })} className="prf-input" />
                      </div>
                      <div className="prf-field">
                        <label className="prf-input-label">Rue</label>
                        <input type="text" placeholder="12 rue des Fleurs" value={formAddress.street} onChange={e => setFormAddress({ ...formAddress, street: e.target.value })} className="prf-input" />
                      </div>
                      <div className="prf-addr-grid">
                        <div>
                          <label className="prf-input-label">Ville</label>
                          <input type="text" placeholder="Paris" value={formAddress.city} onChange={e => setFormAddress({ ...formAddress, city: e.target.value })} className="prf-input" />
                        </div>
                        <div>
                          <label className="prf-input-label">Code postal</label>
                          <input type="text" placeholder="75001" value={formAddress.postal_code} onChange={e => setFormAddress({ ...formAddress, postal_code: e.target.value })} className="prf-input" />
                        </div>
                      </div>
                      <div className="prf-form-actions">
                        <button type="submit" className="prf-btn prf-btn-primary">
                          <FaCheck size={10} /> {editingAddressId ? "Mettre à jour" : "Ajouter"}
                        </button>
                        <button
                          type="button"
                          className="prf-btn prf-btn-ghost"
                          onClick={() => { setShowAddressForm(false); setEditingAddressId(null); }}
                        >
                          <FaTimes size={10} /> Annuler
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}