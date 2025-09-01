import { useParams } from "react-router-dom"
import { useState } from "react"

const productsData = {
  hommes: [
    { id: 1, name: "T-shirt Homme", type: "T-shirt", price: 19.99, image: "https://placehold.co/100" },
    { id: 2, name: "Jeans Homme", type: "Jeans", price: 49.99, image: "https://placehold.co/100" },
    { id: 3, name: "Veste Homme", type: "Veste", price: 89.99, image: "https://placehold.co/100" },
    { id: 4, name: "T-shirt Homme 2", type: "T-shirt", price: 29.99, image: "https://placehold.co/100" },
    { id: 5, name: "Jeans Homme 2", type: "Jeans", price: 59.99, image: "https://placehold.co/100" },
    { id: 6, name: "Veste Homme 2", type: "Veste", price: 99.99, image: "https://placehold.co/100" },
    { id: 7, name: "T-shirt Homme 3", type: "T-shirt", price: 39.99, image: "https://placehold.co/100" },
    { id: 8, name: "Jeans Homme 3", type: "Jeans", price: 69.99, image: "https://placehold.co/100" },
    { id: 9, name: "Veste Homme 3", type: "Veste", price: 109.99, image: "https://placehold.co/100" },
  ],
  femmes: [
    { id: 10, name: "Robe Femme", type: "Robe", price: 39.99, image: "https://placehold.co/100" },
    { id: 11, name: "T-shirt Femme", type: "T-shirt", price: 24.99, image: "https://placehold.co/100" },
    { id: 12, name: "Jupe Femme", type: "Jupe", price: 29.99, image: "https://placehold.co/100" },
  ],
  enfants: [
    { id: 13, name: "Sweat Enfant", type: "Sweat", price: 29.99, image: "https://placehold.co/100" },
    { id: 14, name: "T-shirt Enfant", type: "T-shirt", price: 14.99, image: "https://placehold.co/100" },
    { id: 15, name: "Pantalon Enfant", type: "Pantalon", price: 34.99, image: "https://placehold.co/100" },
  ],
}

const CategoryPage = () => {
  const { categoryName } = useParams()
  const [sort, setSort] = useState("asc")
  const [filters, setFilters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  const products = productsData[categoryName] || []

  // Récupérer les types disponibles dans la catégorie
  const availableTypes = [...new Set(products.map((p) => p.type))]

  // Gestion du tri et filtres
  let filteredProducts = [...products]
  if (filters.length > 0) {
    filteredProducts = filteredProducts.filter((p) => filters.includes(p.type))
  }
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  )

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  const toggleFilter = (type) => {
    setFilters((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    )
    setCurrentPage(1) // Reset page si filtre change
  }

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

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
            <p>{filteredProducts.length} produits trouvés</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>

          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Précédent
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default CategoryPage
