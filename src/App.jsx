import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Header from './components/Header'
import Footer from './components/Footer'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import ProductPage from './pages/ProductPage'
import Order from './pages/Order'
import OrdersHistory from './pages/OrdersHistory'
import Profile from './pages/Profile'
import MentionsLegales from './pages/MentionsLegales'
import Confidentialite from './pages/Confidentialite'
import CGV from './pages/CGV'
import ProductsAdmin from './pages/Admin/ProductsAdmin'
import OrdersAdmin from './pages/Admin/OrdersAdmin'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminRoute from './components/AdminRoute'
import { AuthProvider } from './context/AuthContext'
import { getMe } from './api/auth'
import { useState, useEffect, Navigate } from 'react'
import AdminDashboard from './pages/Admin/AdminDashboard'


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const me = await getMe();
        setUser(me);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/category/:categoryName/product/:productId" element={<ProductPage />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/orders" element={<OrdersHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
          </Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
