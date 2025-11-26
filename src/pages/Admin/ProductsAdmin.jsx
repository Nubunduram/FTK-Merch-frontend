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

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
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
        prev.map(p =>
          p.id === productId ? { ...p, is_featured: isFeatured } : p
        )
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
        _product_variants_of_products: p._product_variants_of_products.map((v) =>
          v.id === variantId ? { ...v, stock: newStock } : v
        ),
      }))
    );
  };

  const handleCreateProduct = async () => {
    if (!newProduct.sub_categories_id) {
      alert("Veuillez sélectionner une sub-category !");
      return;
    }

    const productToSend = {
      ...newProduct,
      price_in_cents: Math.round(parseFloat(newProduct.price) * 100),
    };

    // On enlève "price" pour ne pas envoyer un champ en trop
    delete productToSend.price;

    const created = await createProduct(productToSend);
    created._product_variants_of_products = created._product_variants_of_products || [];
    setProducts((prev) => [...prev, created]);

    setNewProduct({
      name: "",
      description: "",
      price: "",
      img_url: "",
      sub_categories_id: "",
      variants: [],
    });
  };

  const handleAddVariant = async (productId, variant) => {
    const newV = await createVariant(productId, variant);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, _product_variants_of_products: [...p._product_variants_of_products, newV] }
          : p
      )
    );
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Supprimer ce produit et toutes ses variantes ?")) return;
    await deleteProduct(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestion des produits</h1>

      {/* Formulaire ajout produit */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="font-bold mb-2">Ajouter un produit</h2>
        <input
          type="text"
          placeholder="Nom"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-1 mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-1 mr-2 mb-2"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Prix (€)"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-1 mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.img_url}
          onChange={(e) => setNewProduct({ ...newProduct, img_url: e.target.value })}
          className="border p-1 mr-2 mb-2"
        />

        {/* Sub-category select */}
        <select
          value={newProduct.sub_categories_id}
          onChange={(e) => setNewProduct({ ...newProduct, sub_categories_id: Number(e.target.value) })}
          className="border p-1 mr-2 mb-2"
        >
          <option value="" >Catégorie</option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name} / {sub._categories.name}
            </option>
          ))}
        </select>


        <button onClick={handleCreateProduct} className="px-2 py-1 bg-green-600 text-white rounded">
          Ajouter
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-300">
            <th>Couleur</th>
            <th>Taille</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              product={product}
              onVariantStockChange={handleVariantStockChange}
              onAddVariant={handleAddVariant}
              onDeleteProduct={handleDeleteProduct}
              onToggleFeatured={handleToggleFeatured}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
