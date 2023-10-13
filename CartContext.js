import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) { 
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    // Find the first item with the specified name and remove it
    const indexOfItemToRemove = cartItems.findIndex((cartItem) => cartItem.name === item.name);
    if (indexOfItemToRemove !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(indexOfItemToRemove, 1);
      setCartItems(updatedCart);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
