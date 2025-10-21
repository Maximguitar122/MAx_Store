import React, {createContext, useState} from 'react'
import {Cart} from '../class/Cart.js'

export const CartContext = createContext();



export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState((new Cart()));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const removeFromCart = (index) => {
    const newCart = new Cart(cart.userId)
    cart.removeFromCart(index);

    newCart.items = [...cart.items];
    newCart.calculateTotal();
    setCart(newCart);
  }
  return(<CartContext.Provider value={{cart, setCart, openCart, setIsCartOpen,closeCart, isCartOpen,  removeFromCart}}>
    {children}
  </CartContext.Provider>)
}
