import { useEffect, useState } from "react";
import {
  getAllProducts,
  updateVariantStock,
  createProduct,
  createVariant,
  deleteProduct,
  updateProductIsFeatured
} from "../../api/admin";
import { getSubCategories } from "../../api/products";
import ProductRow from "../../components/ProductRow";
import { FaPlus, FaTimes } from "react-icons/fa";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    img_url: "",
    sub_categories_id: "",
    variants: [],
  });

  const handleToggleFeatured = async (productId, isFeatured) => {
    try {
      await updateProductIsFeatured(productId, isFeatured);
      setProducts(prev =>
        prev.map(p => p.id === productId ? { ...p, is_featured: isFeatured } : p)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProducts();
      setProducts(data);
      const subs = await getSubCategories();
      setSubCategories(subs);
    }
    fetchData();
  }, []);

  const handleVariantStockChange = async (variantId, newStock) => {
    await updateVariantStock(variantId, newStock);
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        variants: p.variants.map((v) =>
          v.id === variantId ? { ...v, stock: newStock } : v
        ),
      }))
    );
  };

  const handleCreateProduct = async () => {
    if (!newProduct.sub_categories_id) {
      alert("Veuillez sélectionner une catégorie !");
      return;
    }

    const productToSend = {
      ...newProduct,
      price_in_cents: Math.round(parseFloat(newProduct.price) * 100),
    };
    delete productToSend.price;

    const created = await createProduct(productToSend);
    created.variants = created.variants || [];
    setProducts((prev) => [...prev, created]);
    setNewProduct({ name: "", description: "", price: "", img_url: "", sub_categories_id: "", variants: [] });
    setShowForm(false);
  };

  const handleAddVariant = async (productId, variant) => {
    const newV = await createVariant(productId, variant);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, variants: [...p.variants, newV] } : p
      )
    );
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Supprimer ce produit et toutes ses variantes ?")) return;
    await deleteProduct(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const totalVariants = products.reduce((sum, p) => sum + (p.variants?.length || 0), 0);
  const lowStockCount = products.reduce((sum, p) =>
    sum + (p.variants?.filter(v => v.stock <= 5).length || 0), 0
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .padm-root {
          font-family: 'DM Sans', sans-serif;
        }

        .padm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .padm-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.06em;
          color: #111827;
        }

        .padm-stats {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .padm-stat {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 8px;
          border: 1.5px solid #e5e7eb;
          color: #6b7280;
          background: #fff;
        }

        .padm-stat.warning {
          background: #fffbeb;
          border-color: #fde68a;
          color: #d97706;
        }

        .padm-btn-new {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 8px 18px;
          background: #16a34a;
          color: #fff;
          border: 2px solid #16a34a;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.18s;
        }

        .padm-btn-new:hover {
          background: transparent;
          color: #16a34a;
        }

        /* ── Formulaire ── */
        .padm-form-wrap {
          background: #fff;
          border: 1.5px solid #d1fae5;
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 24px;
          animation: padm-fade 0.2s ease;
        }

        @keyframes padm-fade {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .padm-form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.08em;
          color: #111827;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .padm-form-close {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s;
          display: flex;
          align-items: center;
        }

        .padm-form-close:hover { color: #374151; }

        .padm-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          margin-bottom: 14px;
        }

        .padm-input {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px 12px;
          width: 100%;
          color: #111827;
          background: #fff;
          outline: none;
          transition: border-color 0.18s;
        }

        .padm-input:focus { border-color: #16a34a; }

        .padm-select {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px 12px;
          width: 100%;
          color: #111827;
          background: #fff;
          outline: none;
          cursor: pointer;
          transition: border-color 0.18s;
        }

        .padm-select:focus { border-color: #16a34a; }

        .padm-form-footer {
          display: flex;
          gap: 8px;
        }

        .padm-btn-submit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          padding: 8px 18px;
          background: #16a34a;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.18s;
        }

        .padm-btn-submit:hover { background: #15803d; }

        .padm-btn-cancel-form {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          padding: 8px 18px;
          background: transparent;
          color: #9ca3af;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.18s;
        }

        .padm-btn-cancel-form:hover {
          color: #374151;
          border-color: #9ca3af;
        }

        /* ── Table ── */
        .padm-table-wrap {
          background: #fff;
          border-radius: 12px;
          border: 1.5px solid #f3f4f6;
          overflow: hidden;
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }

        .padm-table {
          width: 100%;
          border-collapse: collapse;
        }

        .padm-table thead tr {
          background: #f9fafb;
          border-bottom: 1.5px solid #f3f4f6;
        }

        .padm-table thead th {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          padding: 10px 16px;
          text-align: left;
        }

        .padm-empty {
          text-align: center;
          padding: 48px 16px;
          color: #9ca3af;
          font-size: 0.875rem;
        }
      `}</style>

      <div className="padm-root">

        {/* ── Header ── */}
        <div className="padm-header">
          <div>
            <h1 className="padm-title">Gestion des produits</h1>
            <div className="padm-stats" style={{ marginTop: "8px" }}>
              <span className="padm-stat">{products.length} produit{products.length > 1 ? "s" : ""}</span>
              <span className="padm-stat">{totalVariants} variante{totalVariants > 1 ? "s" : ""}</span>
              {lowStockCount > 0 && (
                <span className="padm-stat warning">⚠ {lowStockCount} stock{lowStockCount > 1 ? "s" : ""} faible{lowStockCount > 1 ? "s" : ""}</span>
              )}
            </div>
          </div>

          <button className="padm-btn-new" onClick={() => setShowForm(!showForm)}>
            <FaPlus size={11} /> Nouveau produit
          </button>
        </div>

        {/* ── Formulaire ── */}
        {showForm && (
          <div className="padm-form-wrap">
            <div className="padm-form-title">
              <span>Ajouter un produit</span>
              <button className="padm-form-close" onClick={() => setShowForm(false)}>
                <FaTimes size={14} />
              </button>
            </div>

            <div className="padm-form-grid">
              <input
                type="text"
                placeholder="Nom du produit"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="padm-input"
              />
              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="padm-input"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Prix (€)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="padm-input"
              />
              <input
                type="text"
                placeholder="URL de l'image"
                value={newProduct.img_url}
                onChange={(e) => setNewProduct({ ...newProduct, img_url: e.target.value })}
                className="padm-input"
              />
              <select
                value={newProduct.sub_categories_id}
                onChange={(e) => setNewProduct({ ...newProduct, sub_categories_id: Number(e.target.value) })}
                className="padm-select"
              >
                <option value="">Catégorie</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} / {sub.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="padm-form-footer">
              <button onClick={handleCreateProduct} className="padm-btn-submit">
                <FaPlus size={10} /> Créer le produit
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="padm-btn-cancel-form"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* ── Table ── */}
        <div className="padm-table-wrap">
          <table className="padm-table">
            <thead>
              <tr>
                <th>Couleur</th>
                <th>Taille</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="padm-empty">
                    Aucun produit pour l'instant.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onVariantStockChange={handleVariantStockChange}
                    onAddVariant={handleAddVariant}
                    onDeleteProduct={handleDeleteProduct}
                    onToggleFeatured={handleToggleFeatured}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}