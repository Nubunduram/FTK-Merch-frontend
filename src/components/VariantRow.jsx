import { useState } from "react";
import { deleteVariant } from "../api/admin";
import { FaTrash, FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";

export default function VariantRow({ variant, onStockChange, onDelete }) {
  const [stock, setStock] = useState(variant.stock);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    onStockChange(variant.id, stock);
    setEditing(false);
  };

  const handleCancel = () => {
    setStock(variant.stock);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer cette variante ?")) return;
    try {
      await deleteVariant(variant.id);
      onDelete(variant.id);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression de la variante");
    }
  };

  const isLowStock = stock <= 5 && stock > 0;
  const isOutOfStock = stock === 0;

  return (
    <>
      <style>{`
        .vrow {
          font-family: 'DM Sans', sans-serif;
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.15s;
        }

        .vrow:hover { background: #fafafa; }
        .vrow.low-stock { background: #fffbeb; }
        .vrow.low-stock:hover { background: #fef3c7; }
        .vrow.out-stock { background: #fff1f2; }
        .vrow.out-stock:hover { background: #ffe4e6; }

        .vrow td {
          padding: 10px 16px;
          font-size: 0.85rem;
          color: #374151;
          vertical-align: middle;
        }

        .vrow-color-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vrow-color-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid #e5e7eb;
          flex-shrink: 0;
        }

        .vrow-sku {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: #9ca3af;
          background: #f9fafb;
          padding: 2px 7px;
          border-radius: 5px;
          border: 1px solid #f3f4f6;
        }

        .vrow-stock-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 999px;
        }

        .vrow-stock-badge.ok {
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .vrow-stock-badge.low {
          background: #fffbeb;
          color: #d97706;
          border: 1px solid #fde68a;
        }

        .vrow-stock-badge.out {
          background: #fff1f2;
          color: #e11d48;
          border: 1px solid #fecdd3;
        }

        .vrow-stock-input {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          border: 1.5px solid #16a34a;
          border-radius: 7px;
          padding: 5px 10px;
          width: 72px;
          outline: none;
          color: #111827;
          background: #f0fdf4;
        }

        .vrow-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .vrow-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.73rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
          border: 1.5px solid transparent;
          white-space: nowrap;
        }

        .vrow-btn-edit {
          background: transparent;
          color: #6b7280;
          border-color: #e5e7eb;
        }

        .vrow-btn-edit:hover {
          border-color: #111827;
          color: #111827;
        }

        .vrow-btn-save {
          background: #16a34a;
          color: #fff;
          border-color: #16a34a;
        }

        .vrow-btn-save:hover { background: #15803d; }

        .vrow-btn-cancel {
          background: transparent;
          color: #9ca3af;
          border-color: #e5e7eb;
        }

        .vrow-btn-cancel:hover {
          color: #374151;
          border-color: #9ca3af;
        }

        .vrow-btn-delete {
          background: transparent;
          color: #ef4444;
          border-color: transparent;
          padding: 5px 7px;
        }

        .vrow-btn-delete:hover {
          background: #fff1f2;
          border-color: #fecdd3;
        }
      `}</style>

      <tr className={`vrow ${isOutOfStock ? "out-stock" : isLowStock ? "low-stock" : ""}`}>

        {/* Couleur */}
        <td>
          <div className="vrow-color-cell">
            <span
              className="vrow-color-dot"
              style={{ backgroundColor: variant.color_hex || variant.color }}

            />
            {variant.color}
          </div>
        </td>

        {/* Taille */}
        <td>{variant.size}</td>

        {/* SKU */}
        <td>
          <span className="vrow-sku">{variant.sku}</span>
        </td>

        {/* Stock */}
        <td>
          {editing ? (
            <input
              type="number"
              value={stock}
              min={0}
              onChange={(e) => setStock(Number(e.target.value))}
              className="vrow-stock-input"
            />
          ) : (
            <span className={`vrow-stock-badge ${isOutOfStock ? "out" : isLowStock ? "low" : "ok"}`}>
              {isOutOfStock ? "Rupture" : isLowStock ? `⚠ ${stock}` : stock}
            </span>
          )}
        </td>

        {/* Actions */}
        <td>
          <div className="vrow-actions">
            {editing ? (
              <>
                <button onClick={handleSave} className="vrow-btn vrow-btn-save">
                  <FaCheck size={9} /> Sauvegarder
                </button>
                <button onClick={handleCancel} className="vrow-btn vrow-btn-cancel">
                  <FaTimes size={9} /> Annuler
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setEditing(true)} className="vrow-btn vrow-btn-edit">
                  <FaPencilAlt size={9} /> Modifier
                </button>
                <button onClick={handleDelete} className="vrow-btn vrow-btn-delete">
                  <FaTrash size={10} />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}