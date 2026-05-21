import VariantRow from "./VariantRow";
import { useState } from "react";
import { FaTrash, FaStar, FaRegStar, FaPlus, FaTimes } from "react-icons/fa";

export default function ProductRow({
  product,
  onVariantStockChange,
  onAddVariant,
  onDeleteProduct,
  onToggleFeatured,
}) {
  const [newVariant, setNewVariant] = useState({
    color: "",
    color_hex: "#000000",
    size: "",
    sku: "",
    stock: 0,
  });
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [rerender, setRerender] = useState(0);

  const handleAdd = () => {
    onAddVariant(product.id, newVariant);
    setNewVariant({ color: "", color_hex: "#000000", size: "", sku: "", stock: 0 });
    setShowVariantForm(false);
  };

  const handleDeleteVariant = (variantId) => {
    product.variants = product.variants.filter((v) => v.id !== variantId);
    setRerender((prev) => prev + 1);
  };

  return (
    <>
      <style>{`
        .prow-header {
          background: #111827;
          font-family: 'DM Sans', sans-serif;
        }

        .prow-header td {
          padding: 10px 16px;
          color: #f9fafb;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.01em;
        }

        .prow-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .prow-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .prow-star-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 4px;
          border-radius: 6px;
          transition: background 0.15s;
          display: flex;
          align-items: center;
          color: #6b7280;
        }

        .prow-star-btn:hover { background: rgba(255,255,255,0.1); }
        .prow-star-btn.featured { color: #fbbf24; }

        .prow-delete-btn {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.3);
          color: #ef4444;
          border-radius: 7px;
          padding: 5px 8px;
          cursor: pointer;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
        }

        .prow-delete-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
        }

        .prow-add-row td {
          background: #f9fafb;
          padding: 8px 16px;
          border-bottom: 1px solid #f3f4f6;
          font-family: 'DM Sans', sans-serif;
        }

        .prow-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          background: transparent;
          color: #16a34a;
          border: 1.5px solid #16a34a;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.18s;
        }

        .prow-add-btn:hover {
          background: #16a34a;
          color: #fff;
        }

        .prow-form-row td {
          background: #f0fdf4;
          padding: 10px 8px;
          border-bottom: 2px solid #bbf7d0;
        }

        .prow-input {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          border: 1.5px solid #d1fae5;
          border-radius: 7px;
          padding: 6px 10px;
          width: 100%;
          background: #fff;
          color: #111827;
          outline: none;
          transition: border-color 0.18s;
        }

        .prow-input:focus {
          border-color: #16a34a;
        }

        .prow-form-actions {
          display: flex;
          gap: 6px;
        }

        .prow-confirm-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 6px 12px;
          background: #16a34a;
          color: #fff;
          border: none;
          border-radius: 7px;
          cursor: pointer;
          transition: background 0.18s;
          white-space: nowrap;
        }

        .prow-confirm-btn:hover { background: #15803d; }

        .prow-cancel-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 6px 12px;
          background: transparent;
          color: #6b7280;
          border: 1.5px solid #e5e7eb;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
        }

        .prow-cancel-btn:hover {
          border-color: #9ca3af;
          color: #374151;
        }
      `}</style>

      {/* ── En-tête produit ── */}
      <tr className="prow-header">
        <td colSpan={5}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <div className="prow-name">
              <span>{product.name}</span>
              <button
                onClick={() => onToggleFeatured(product.id, !product.is_featured)}
                className={`prow-star-btn ${product.is_featured ? "featured" : ""}`}
                title={product.is_featured ? "Retirer de la une" : "Mettre à la une"}
              >
                {product.is_featured ? <FaStar /> : <FaRegStar />}
              </button>
              {product.is_featured && (
                <span style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: "rgba(251,191,36,0.15)",
                  color: "#fbbf24",
                  border: "1px solid rgba(251,191,36,0.3)",
                  borderRadius: "999px",
                  padding: "2px 8px",
                }}>
                  À la une
                </span>
              )}
            </div>

            <div className="prow-actions">
              <button
                onClick={() => onDeleteProduct(product.id)}
                className="prow-delete-btn"
              >
                <FaTrash size={11} /> Supprimer
              </button>
            </div>
          </div>
        </td>
      </tr>

      {/* ── Variantes ── */}
      {(product.variants || []).map((v) => (
        <VariantRow
          key={v.id}
          variant={v}
          onStockChange={onVariantStockChange}
          onDelete={handleDeleteVariant}
        />
      ))}

      {/* ── Formulaire ajout variante ── */}
      {showVariantForm ? (
        <tr className="prow-form-row">
          <td>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="color"
                value={newVariant.color_hex}
                onChange={(e) => setNewVariant({ ...newVariant, color_hex: e.target.value })}
                onInput={(e) => setNewVariant(prev => ({ ...prev, color_hex: e.target.value }))}
                style={{ width: "32px", height: "32px", border: "none", borderRadius: "6px", cursor: "pointer", padding: "2px" }}
              />
              <input
                type="text"
                placeholder="Nom (ex: Rouge)"
                value={newVariant.color}
                onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                className="prow-input"
                style={{ width: "100px" }}
              />
            </div>
          </td>
          <td>
            <input
              type="text"
              placeholder="Taille"
              value={newVariant.size}
              onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
              className="prow-input"
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="SKU"
              value={newVariant.sku}
              onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
              className="prow-input"
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Stock"
              value={newVariant.stock}
              onChange={(e) => setNewVariant({ ...newVariant, stock: Number(e.target.value) })}
              className="prow-input"
              style={{ width: "80px" }}
            />
          </td>
          <td>
            <div className="prow-form-actions">
              <button onClick={handleAdd} className="prow-confirm-btn">
                <FaPlus size={10} /> Ajouter
              </button>
              <button
                onClick={() => {
                  setShowVariantForm(false);
                  setNewVariant({ color: "", color_hex: "#000000", size: "", sku: "", stock: 0 });
                }}
                className="prow-cancel-btn"
              >
                <FaTimes size={10} /> Annuler
              </button>
            </div>
          </td>
        </tr>
      ) : (
        <tr className="prow-add-row">
          <td colSpan={5}>
            <button
              onClick={() => setShowVariantForm(true)}
              className="prow-add-btn"
            >
              <FaPlus size={10} /> Ajouter une variante
            </button>
          </td>
        </tr>
      )}
    </>
  );
}