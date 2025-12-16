// src/pages/Admin/AdminLayout.jsx
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Administration</h1>
      
      <nav className="mb-6 flex gap-4">
        <Link to="products" className="px-2 py-1 bg-blue-600 text-white rounded">Produits</Link>
        <Link to="orders" className="px-2 py-1 bg-green-600 text-white rounded">Commandes</Link>
      </nav>

      <Outlet />
    </div>
  );
}
