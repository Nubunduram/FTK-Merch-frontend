const ProductCard = ({ product }) => {
  // Extraire les tailles disponibles et leur stock
  const variants = product?._product_variants_of_products || [];

  const sizes = [...new Set(product.variants?.map(v => v.size) || [])];
  const colors = [...new Set(product.variants?.map(v => v.color) || [])];

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={product.img_url}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-gray-700 font-semibold mb-2">{product.price_in_cents / 100}€</p>

      {/* Tailles */}
      <div className="mb-2">
        <p className="font-semibold text-sm">Tailles :</p>
        <div className="flex gap-2 flex-wrap mt-1">
          {sizes.map(size => {
            const inStock = product.variants?.some(
              v => v.size === size && v.stock > 0
            );
            return (
              <span
                key={size}
                className={`px-2 py-1 border rounded text-sm ${inStock ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-500"
                  }`}
              >
                {size}
              </span>
            );
          })}
        </div>
      </div>

      {/* Couleurs */}
      <div>
        <p className="font-semibold text-sm">Couleurs :</p>
        <div className="flex gap-2 mt-1">
          {colors.map(color => (
            <span
              key={color}
              className="w-5 h-5 rounded-full border"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
