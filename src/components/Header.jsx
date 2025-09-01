import { useState } from "react"
import { Link } from "react-router-dom"
import { HiMenu, HiX, HiShoppingCart } from "react-icons/hi"
import { useAuth } from "../context/AuthContext"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth()
    const cartItemCount = 0 // plus tard ce sera dynamique via un CartContext

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    FTK Merch
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-gray-900">
                        Accueil
                    </Link>
                    <Link to="/category/hommes" className="text-gray-700 hover:text-gray-900">
                        Hommes
                    </Link>
                    <Link to="/category/femmes" className="text-gray-700 hover:text-gray-900">
                        Femmes
                    </Link>
                    <Link to="/category/enfants" className="text-gray-700 hover:text-gray-900">
                        Enfants
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Cart */}
                    <Link to="/cart" className="relative text-gray-700 hover:text-gray-900">
                        <HiShoppingCart size={24} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {cartItemCount > 9 ? "9+" : cartItemCount}
                            </span>
                        )}
                    </Link>

                    {/* Login / Logout */}
                    {!user ? (
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                        >
                            Connexion
                        </Link>
                    ) : (
                        <button
                            onClick={logout}
                            className="px-4 py-2 cursor-pointer bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition"
                        >
                            Déconnexion
                        </button>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-gray-700 hover:text-gray-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <nav className="flex flex-col space-y-2 p-4">
                        <Link to="/" className="text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                            Accueil
                        </Link>
                        <Link to="/category/hommes" className="text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                            Hommes
                        </Link>
                        <Link to="/category/femmes" className="text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                            Femmes
                        </Link>
                        <Link to="/category/enfants" className="text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                            Enfants
                        </Link>

                        <Link to="/cart" className="relative text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                            <HiShoppingCart size={24} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItemCount > 9 ? "9+" : cartItemCount}
                                </span>
                            )}
                        </Link>

                        {!user ? (
                            <Link
                                to="/login"
                                className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition mt-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Connexion
                            </Link>
                        ) : (
                            <button
                                onClick={() => {
                                    logout()
                                    setIsOpen(false)
                                }}
                                className="px-4 py-2 cursor-pointer bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition mt-2"
                            >
                                Déconnexion
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}
