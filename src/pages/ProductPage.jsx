import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as AuthContext from "../context/AuthContext";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = AuthContext.useAuth();
  const { addToCart } = useCart();

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
        if (data._product_variants_of_products?.length > 0) {
          setSelectedColor(data._product_variants_of_products[0].color);
        }
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

  const availableColors = [...new Set(product._product_variants_of_products.map(v => v.color))];
  const availableSizes = product._product_variants_of_products
    .filter(v => v.color === selectedColor)
    .map(v => ({ size: v.size, stock: v.stock }));

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setSelectedSize("");
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille.");
      return;
    }
    const variant = product._product_variants_of_products.find(
      v => v.color === selectedColor && v.size === selectedSize
    );
    addToCart({ ...product, color: selectedColor, size: selectedSize, sku: variant.sku, price: product.price_in_cents / 100 });
    alert("Produit ajouté au panier !");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        ← Retour
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={product.img_url} alt={product.name} className="w-full h-auto rounded shadow" />
        </div>

        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.price_in_cents / 100} €</p>

          {/* Couleur */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Couleur :</p>
            <div className="flex space-x-2">
              {availableColors.map(color => (
                <button
                  key={color}
                  onClick={() => handleSelectColor(color)}
                  className={`px-3 py-1 border rounded ${selectedColor === color ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Taille */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Taille :</p>
            <div className="flex space-x-2">
              {availableSizes.map(({ size, stock }) => (
                <button
                  key={size}
                  onClick={() => stock > 0 && setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-blue-600 text-white" : "bg-white text-gray-700"} ${stock === 0 ? "cursor-not-allowed line-through text-red-500" : "cursor-pointer"}`}
                  disabled={stock === 0}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAddToCart} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-fit mt-4">
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
