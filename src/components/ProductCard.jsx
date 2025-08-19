import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-gray-700">${product.price}</p>
      <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;
