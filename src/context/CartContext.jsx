import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.color === product.color && item.size === product.size);
      if (existing) {
        return prev.map(item =>
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart(prev =>
      prev.filter(item => !(item.id === product.id && item.color === product.color && item.size === product.size))
    );
  };

  const updateQuantity = (product, quantity) => {
    setCart(prev =>
      prev.map(item =>
        item.id === product.id && item.color === product.color && item.size === product.size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
