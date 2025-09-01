import React from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const featuredProducts = [
  { id: 1, name: 'T-shirt Homme', price: 25, image: 'https://placehold.co/100', category: 'hommes' },
  { id: 2, name: 'Robe Femme', price: 40, image: 'https://placehold.co/100', category: 'femmes' },
  { id: 3, name: 'Veste Enfant', price: 30, image: 'https://placehold.co/100', category: 'enfants' },
];

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="mb-12 bg-gray-200 rounded-lg flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur FTK Merch Shop</h1>
        <p className="text-gray-700 max-w-xl">
          Découvrez nos collections exclusives pour hommes, femmes et enfants. 
          Trouvez des vêtements tendance, confortables et adaptés à chaque style. 
          Profitez d’une expérience d’achat simple et rapide avec nos promotions et nouveautés chaque semaine.
        </p>
      </div>

      {/* Produits à la une */}
      <h2 className="text-2xl font-semibold mb-6">Produits à la une</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredProducts.map(product => (
          <Link 
            key={product.id} 
            to={`/category/${product.category}/product/${product.id}`}
            className="block"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
