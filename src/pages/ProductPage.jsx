import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as AuthContext from "../context/AuthContext";
import { getProductById } from "../api/products";

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = AuthContext.useAuth();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);

        // Si des variantes existent, on pré-sélectionne la première couleur
        if (data._product_variants_of_products?.length > 0) {
          setSelectedColor(data._product_variants_of_products[0].color);
        }

        // Charger les commentaires
        setComments(data._reviews_of_products || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur produit:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Chargement du produit...</p>;
  if (!product) return <p>Produit introuvable.</p>;

  // Récupérer les couleurs disponibles
  const availableColors = [
    ...new Set(product._product_variants_of_products.map(v => v.color)),
  ];

  // Récupérer les tailles disponibles pour la couleur sélectionnée
  const availableSizes = product._product_variants_of_products
    .filter(v => v.color === selectedColor && v.stock > 0)
    .map(v => v.size);

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setSelectedSize(""); // reset taille quand on change de couleur
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille.");
      return;
    }
    alert(`Produit ajouté au panier : ${selectedColor} - ${selectedSize}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
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

          {/* Sélection couleur */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Couleur :</p>
            <div className="flex space-x-2">
              {availableColors.map(color => (
                <button
                  key={color}
                  onClick={() => handleSelectColor(color)}
                  className={`px-3 py-1 cursor-pointer border rounded ${selectedColor === color ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                    }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Sélection taille */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Taille :</p>
            <div className="flex space-x-2">
              {product._product_variants_of_products
                .filter(v => v.color === selectedColor)
                .map((variant) => {
                  const isAvailable = variant.stock > 0;
                  return (
                    <button
                      key={variant.size}
                      onClick={() => isAvailable && setSelectedSize(variant.size)}
                      className={`px-3 py-1 border rounded ${selectedSize === variant.size ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                        } ${!isAvailable ? "cursor-not-allowed line-through text-red-500" : "cursor-pointer"}`}
                      disabled={!isAvailable}
                    >
                      {variant.size}
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
                    <span className="font-semibold">{c._users.first_name} :</span> {c.comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun commentaire pour ce produit.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
