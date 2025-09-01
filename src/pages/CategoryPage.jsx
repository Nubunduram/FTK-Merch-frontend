// src/pages/CategoryPage.jsx
import { useParams } from "react-router-dom"
import { useState } from "react"

const productsData = {
  hommes: [
    { id: 1, name: "T-shirt Homme", type: "T-shirt", price: 19.99, image: "/images/tshirt-homme.jpg" },
    { id: 2, name: "Jeans Homme", type: "Jeans", price: 49.99, image: "/images/jeans-homme.jpg" },
    { id: 3, name: "Veste Homme", type: "Veste", price: 89.99, image: "/images/veste-homme.jpg" },
  ],
  femmes: [
    { id: 4, name: "Robe Femme", type: "Robe", price: 39.99, image: "/images/robe-femme.jpg" },
    { id: 5, name: "T-shirt Femme", type: "T-shirt", price: 24.99, image: "/images/tshirt-femme.jpg" },
    { id: 6, name: "Jupe Femme", type: "Jupe", price: 29.99, image: "/images/jupe-femme.jpg" },
  ],
  enfants: [
    { id: 7, name: "Sweat Enfant", type: "Sweat", price: 29.99, image: "/images/sweat-enfant.jpg" },
    { id: 8, name: "T-shirt Enfant", type: "T-shirt", price: 14.99, image: "/images/tshirt-enfant.jpg" },
    { id: 9, name: "Pantalon Enfant", type: "Pantalon", price: 34.99, image: "/images/pantalon-enfant.jpg" },
  ],
}

const CategoryPage = () => {
  const { categoryName } = useParams()
  const [sort, setSort] = useState("asc")
  const [filters, setFilters] = useState([])

  const products = productsData[categoryName] || []

  // Récupérer les types disponibles dans la catégorie
  const availableTypes = [...new Set(products.map((p) => p.type))]

  // Gestion du tri
  let filteredProducts = [...products]
  if (filters.length > 0) {
    filteredProducts = filteredProducts.filter((p) => filters.includes(p.type))
  }

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  )

  const toggleFilter = (type) => {
    setFilters((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">Collection {categoryName}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filtres */}
        <aside className="md:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Filtres</h2>
          <div className="space-y-2">
            {availableTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.includes(type)}
                  onChange={() => toggleFilter(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Contenu produits */}
        <main className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p>{sortedProducts.length} produits trouvés</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-700">{product.price.toFixed(2)} €</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun produit ne correspond aux filtres.</p>
          )}
        </main>
      </div>
    </div>
  )
}

export default CategoryPage
