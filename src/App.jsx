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
import { AuthProvider } from './context/AuthContext'

function App() {
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
