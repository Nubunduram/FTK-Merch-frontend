// src/pages/ProductPage.jsx
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProductsByCategory, getCategories } from "../api/products";

export default function ProductPage() {
  const { productId, categoryName: paramCategoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const { filters, sort, currentPage } = state;

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize("");
  };

  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Charger les catégories pour récupérer le slug si besoin
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Erreur categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Charger le produit depuis l'API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // On récupère tous les produits de la catégorie
        const cat = categories.find(c => c.slug === paramCategoryName);
        if (!cat) return;

        const data = await getProductsByCategory(cat.id);
        const prod = data.find(p => p.id === parseInt(productId));
        if (prod) {
          setProduct(prod);
          // Initialiser sélection sur la première variante dispo
          if (prod._product_variants_of_products?.length > 0) {
            const firstVariant = prod._product_variants_of_products.find(v => v.stock > 0);
            if (firstVariant) {
              setSelectedColor(firstVariant.color);
            }
          }
        }
      } catch (err) {
        console.error("Erreur produit:", err);
      }
    };
    if (categories.length > 0) fetchProduct();
  }, [categories, paramCategoryName, productId]);

  if (!product) return <p>Chargement du produit...</p>;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Veuillez sélectionner une taille et une couleur.");
      return;
    }
    alert(`Produit ajouté au panier ! (${selectedSize}, ${selectedColor})`);
  };

  const handleAddComment = () => {
    if (!user) {
      alert("Vous devez être connecté pour commenter.");
      return;
    }
    if (!newComment.trim()) return;

    const comment = { id: comments.length + 1, user: user.name, text: newComment };
    setComments(prev => [...prev, comment]);
    setNewComment("");
  };

  const handleGoBack = () => {
    if (state.categoryName) {
      navigate(`/category/${state.categoryName}`, { state: { filters, sort, currentPage } });
    } else {
      navigate(-1);
    }
  };

  const variants = product._product_variants_of_products || [];
  const availableSizes = [...new Set(variants.map(v => v.size))];
  const availableColors = [...new Set(variants.map(v => v.color))];

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
            src={product.img_url}
            alt={product.name}
            className="w-full h-auto rounded shadow"
          />
        </div>

        {/* Détails produit */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.price_in_cents / 100} €</p>
          <p className="mb-4">{product.description}</p>

          {/* Sélection couleur */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Couleur :</p>
            <div className="flex space-x-2">
              {availableColors.map(color => {
                const inStock = variants.some(v => v.color === color && v.stock > 0);
                return (
                  <button
                    key={color}
                    disabled={!inStock}
                    onClick={() => handleColorChange(color)}
                    className={`px-3 py-1 border rounded ${selectedColor === color ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                      } ${!inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sélection taille */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Taille :</p>
            <div className="flex space-x-2">
              {availableSizes.map(size => {
                const inStock = variants.some(v => v.size === size && v.color === selectedColor && v.stock > 0);
                return (
                  <button
                    key={size}
                    disabled={!inStock}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded ${selectedSize === size
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                      } ${!inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {size}
                  </button>
                );
              })}
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
                {comments.map(c => (
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
                  onChange={e => setNewComment(e.target.value)}
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
