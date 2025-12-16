import VariantRow from "./VariantRow";
import { useState } from "react";
import { FaTrash, FaStar, FaRegStar } from "react-icons/fa";

export default function ProductRow({
  product,
  onVariantStockChange,
  onAddVariant,
  onDeleteProduct,
  onToggleFeatured,
}) {
  const [newVariant, setNewVariant] = useState({
    color: "",
    size: "",
    sku: "",
    stock: 0,
  });
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [rerender, setRerender] = useState(0);

  const handleAdd = () => {
    onAddVariant(product.id, newVariant);
    setNewVariant({ color: "", size: "", sku: "", stock: 0 });
    setShowVariantForm(false);
  };

  const handleDeleteVariant = (variantId) => {
    product._product_variants_of_products = product._product_variants_of_products.filter(
      (v) => v.id !== variantId
    );
    setRerender((prev) => prev + 1);
  };

  return (
    <>
      <tr className="bg-gray-200">
        <td colSpan={5} className="font-bold p-2 flex justify-between items-center">

          {/* NOM PRODUIT */}
          <div className="flex items-center gap-3">
            {product.name}

            {/* BOUTON FEATURED */}
            <button
              onClick={() => onToggleFeatured(product.id, !product.is_featured)}
              className={`text-xl ${product.is_featured ? "text-yellow-500" : "text-gray-400"
                }`}
            >
              {product.is_featured ? <FaStar /> : <FaRegStar />}
            </button>
          </div>

          {/* BOUTON SUPPRIMER (poubelle) */}
          <button
            onClick={() => onDeleteProduct(product.id)}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <FaTrash />
          </button>
        </td>
      </tr>

      {(product._product_variants_of_products || []).map((v) => (
        <VariantRow
          key={v.id}
          variant={v}
          onStockChange={onVariantStockChange}
          onDelete={handleDeleteVariant}
        />
      ))}

      {/* Formulaire ajout variante */}
      {showVariantForm ? (
        <tr className="bg-gray-100">
          <td>
            <input
              type="text"
              placeholder="Couleur"
              value={newVariant.color}
              onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
              className="border p-1"
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="Taille"
              value={newVariant.size}
              onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
              className="border p-1"
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="SKU"
              value={newVariant.sku}
              onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
              className="border p-1"
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Stock"
              value={newVariant.stock}
              onChange={(e) => setNewVariant({ ...newVariant, stock: Number(e.target.value) })}
              className="border p-1 w-20"
            />
          </td>
          <td>
            <button
              onClick={handleAdd}
              className="px-2 py-1 bg-green-600 text-white rounded"
            >
              Ajouter
            </button>
            <button
              onClick={() => {
                setShowVariantForm(false);
                setNewVariant({ color: "", size: "", sku: "", stock: 0 });
              }}
              className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Annuler
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan={5} className="text-center">
            <button
              onClick={() => setShowVariantForm(true)}
              className="px-2 py-1 bg-blue-600 text-white rounded"
            >
              Ajouter une variante
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
