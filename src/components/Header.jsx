import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX, HiShoppingCart } from "react-icons/hi";
import { FaReceipt, FaUser, FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getCategories } from "../api/products";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const { user, logout } = useAuth();
    const { cart } = useCart();

    const cartItemCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Erreur de chargement des catégories :", err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
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

                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/category/${cat.slug}`}
                            className="text-gray-700 hover:text-gray-900 capitalize"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">

                    {/* Profil */}
                    {user && (
                        <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                            <FaUser size={22} />
                        </Link>
                    )}

                    {/* Historique commandes */}
                    {user && (
                        <Link to="/orders" className="text-gray-700 hover:text-gray-900">
                            <FaReceipt size={22} />
                        </Link>
                    )}

                    {/* Panier */}
                    <Link to="/cart" className="relative text-gray-700 hover:text-gray-900">
                        <HiShoppingCart size={24} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {cartItemCount > 9 ? "9+" : cartItemCount}
                            </span>
                        )}
                    </Link>

                    {/* Connexion / Déconnexion */}
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

                    {user && user.role === "admin" && (
                        <Link
                            to="/admin"
                            className="text-gray-700 hover:text-gray-900 ml-2"
                            title="Administration"
                        >
                            <FaCog size={22} />
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 hover:text-gray-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <nav className="flex flex-col space-y-3 p-4">

                        <Link
                            to="/"
                            className="text-gray-700 hover:text-gray-900"
                            onClick={() => setIsOpen(false)}
                        >
                            Accueil
                        </Link>

                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                                className="text-gray-700 hover:text-gray-900 capitalize"
                                onClick={() => setIsOpen(false)}
                            >
                                {cat.name}
                            </Link>
                        ))}

                        {/* PROFIL en mode label */}
                        {user && (
                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                            >
                                <FaUser /> <span>Mon profil</span>
                            </Link>
                        )}

                        {/* COMMANDES en mode label */}
                        {user && (
                            <Link
                                to="/orders"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                            >
                                <FaReceipt /> <span>Mes commandes</span>
                            </Link>
                        )}

                        {/* PANIER en label */}
                        <Link
                            to="/cart"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 relative"
                        >
                            <HiShoppingCart />
                            <span>Panier</span>

                            {cartItemCount > 0 && (
                                <span className="absolute left-16 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItemCount > 9 ? "9+" : cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* CONNEXION / DECONNEXION */}
                        {!user ? (
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-blue-600 text-white text-center font-semibold rounded hover:bg-blue-700 transition mt-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Connexion
                            </Link>
                        ) : (
                            <button
                                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition mt-2"
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
                            >
                                Déconnexion
                            </button>
                        )}

                        {user && user.role === "admin" && (
                            <Link
                                to="/admin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mt-2"
                            >
                                <FaCog /> <span>Admin</span>
                            </Link>
                        )}

                    </nav>
                </div>
            )}
        </header>
    );
}
