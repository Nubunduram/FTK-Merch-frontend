import { useState } from "react";
import { deleteVariant } from "../api/admin"; // ⬅️ à adapter selon ton path

export default function VariantRow({ variant, onStockChange, onDelete }) {
  const [stock, setStock] = useState(variant.stock);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    onStockChange(variant.id, stock);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer cette variante ?")) return;

    try {
      await deleteVariant(variant.id);
      onDelete(variant.id); // ⬅️ remonte l’action au parent
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression de la variante");
    }
  };

  return (
    <tr className={stock <= 5 ? "bg-red-100" : ""}>
      <td>{variant.color}</td>
      <td>{variant.size}</td>
      <td>{variant.sku}</td>
      <td>
        {editing ? (
          <input
            type="number"
            value={stock}
            min={0}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-20 border rounded p-1"
          />
        ) : (
          stock
        )}
      </td>

      <td className="flex gap-2">
        {editing ? (
          <button
            onClick={handleSave}
            className="px-2 py-1 bg-green-600 text-white rounded"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="px-2 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
