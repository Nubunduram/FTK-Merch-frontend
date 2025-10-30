import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { productsData } from "./CategoryPage";
import * as AuthContext from "../context/AuthContext"; // Contexte d'authentification
// import { useCart } from "../context/CartContext"

const productsData = {
  homme: [
    { id: 1, name: "T-shirt Homme", type: "T-shirt", price: 19.99, image: "https://placehold.co/100" },
    { id: 2, name: "Jeans Homme", type: "Jeans", price: 49.99, image: "https://placehold.co/100" },
  ],
  femme: [
    { id: 1, name: "Robe Femme", type: "Robe", price: 39.99, image: "https://placehold.co/100" },
  ],
  enfants: [
    { id: 1, name: "Sweat Enfant", type: "Sweat", price: 29.99, image: "https://placehold.co/100" },
  ],
};


const mockComments = {
  1: [
    { id: 1, user: "Alice", text: "Super T-shirt, très confortable !" },
    { id: 2, user: "Bob", text: "Bonne qualité et taille conforme." },
  ],
  2: [{ id: 1, user: "Claire", text: "Jeans parfait pour l’hiver." }],
};

export default function ProductPage() {
  const { productId, categoryName: paramCategoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const { filters, sort, currentPage } = state;

  const { user } = AuthContext.useAuth(); // Récupère l'utilisateur connecté

  // Utiliser categoryName passé via state si présent, sinon param URL
  const categoryName = state.categoryName || paramCategoryName;

  const product = (productsData[categoryName] || []).find(
    (p) => p.id === parseInt(productId)
  );

  const [selectedSize, setSelectedSize] = useState("");
  const [comments, setComments] = useState(mockComments[productId] || []);
  const [newComment, setNewComment] = useState("");

  if (!product) {
    return <p>Produit introuvable.</p>;
  }

  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille.");
      return;
    }
    // addToCart({ ...product, size: selectedSize, quantity: 1 })
    alert("Produit ajouté au panier !");
  };

  const handleAddComment = () => {
    if (!user) {
      alert("Vous devez être connecté pour commenter.");
      return;
    }
    if (!newComment.trim()) return;

    const comment = { id: comments.length + 1, user: user.name, text: newComment };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleGoBack = () => {
    if (state.categoryName) {
      // Retour à CategoryPage avec le contexte
      navigate(`/category/${categoryName}`, { state: { filters, sort, currentPage } });
    } else {
      navigate(-1); // fallback si pas de state
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Retour
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image produit */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded shadow"
          />
        </div>

        {/* Détails produit */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.price.toFixed(2)} €</p>

          {/* Sélection taille */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Taille :</p>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${selectedSize === size
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-fit mt-4"
          >
            Ajouter au panier
          </button>

          {/* Commentaires */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Commentaires</h2>

            {comments.length > 0 ? (
              <ul className="space-y-2 mb-4">
                {comments.map((c) => (
                  <li key={c.id} className="border-b pb-2">
                    <span className="font-semibold">{c.user}:</span> {c.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun commentaire pour ce produit.</p>
            )}

            {user ? (
              <div className="flex flex-col space-y-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  className="border rounded p-2 w-full"
                />
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit"
                >
                  Envoyer
                </button>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Connectez-vous pour ajouter un commentaire.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}