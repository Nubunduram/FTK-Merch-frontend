import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postOrder } from "../api/orders";
import { getUserAddresses } from "../api/users";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    postal_code: "",
  });
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!user) return;

    const fetchAddresses = async () => {
      try {
        const data = await getUserAddresses();
        setAddresses(data);
      } catch (err) {
        console.error("Erreur chargement adresses :", err);
      }
    };

    fetchAddresses();
  }, [user]);

  useEffect(() => {
    if (selectedAddressId) {
      const addr = addresses.find(a => a.id === selectedAddressId);
      if (addr) setAddressForm(addr);
    } else {
      setAddressForm({ street: "", city: "", postal_code: "" });
    }
  }, [selectedAddressId, addresses]);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const { street, city, postal_code } = addressForm;

    if (!street || !city || !postal_code) {
      alert("Veuillez remplir l'adresse complète.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cart.map(item => ({
          product_variants_id: item.product_variants_id,
          quantity: item.quantity,
        })),
        address: {
          street,
          city,
          postal_code,
        }
      };
      
      const order = await postOrder(orderData);

      clearCart();

      navigate(`/order/${order.id}`, { state: { order } });

    } catch (err) {
      console.error("Erreur lors de la commande:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cart.map(item => (
              <li
                key={`${item.id}-${item.color}-${item.size}`}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>{item.color} - {item.size}</p>
                  <p>{item.price.toFixed(2)} €</p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e =>
                      updateQuantity(item, parseInt(e.target.value))
                    }
                    className="border rounded w-16 p-1"
                  />
                  <button
                    onClick={() => removeFromCart(item)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Adresse */}
          <div className="mb-6">
            {addresses.length > 0 && (
              <div className="mb-4">
                <label className="font-semibold mb-2 block">
                  Choisir une adresse :
                </label>

                <select
                  value={selectedAddressId || ""}
                  onChange={e =>
                    setSelectedAddressId(Number(e.target.value) || null)
                  }
                  className="border rounded p-2 w-full"
                >
                  <option value="">-- Nouvelle adresse --</option>
                  {addresses.map(addr => (
                    <option key={addr.id} value={addr.id}>
                      {addr.label} - {addr.street}, {addr.city} (
                      {addr.postal_code})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={addressForm.street}
                onChange={e =>
                  setAddressForm({
                    ...addressForm,
                    street: e.target.value,
                  })
                }
                placeholder="Rue"
                className="border rounded p-2 w-full"
              />

              <input
                value={addressForm.city}
                onChange={e =>
                  setAddressForm({
                    ...addressForm,
                    city: e.target.value,
                  })
                }
                placeholder="Ville"
                className="border rounded p-2 w-full"
              />

              <input
                value={addressForm.postal_code}
                onChange={e =>
                  setAddressForm({
                    ...addressForm,
                    postal_code: e.target.value,
                  })
                }
                placeholder="Code postal"
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          {/* TOTAL */}
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">
              Total : {totalPrice.toFixed(2)} €
            </p>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {loading ? "Traitement..." : "Passer la commande"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}