import React, { useContext } from 'react';
import '../style/ProductCard.css';
import { CartContext } from "../State/CartContext";
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { cart, setCart, openCart } = useContext(CartContext);

  const handleAdd = () => {

    cart.addToCart(product, 1);


    setCart(cart);

    toast.success(`${product.title} додано у кошик!`);
    openCart();
  };


  return (
    <div className='product-card'>
      <img src={product.image || "https://via.placeholder.com/150"} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <button className="add-to-cart" onClick={handleAdd}>
        🛒 Додати в кошик
      </button>
    </div>
  );
}
