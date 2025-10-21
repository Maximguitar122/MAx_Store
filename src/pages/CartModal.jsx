import React, {useContext} from 'react';
import  "../style/Cart.css";
import { CartContext } from "../State/CartContext";
import {useNavigate} from "react-router-dom";
export default function CartModal ()  {
  const{cart, closeCart} = useContext(CartContext);
  const navigate = useNavigate();
  const removeItem = (index) => {
    cart.removeFromCart(index);
    cart.calculateTotal();
  }
  if(!cart || cart.items.length === 0){
    return (
      <div className="CartModalAll" onClick={closeCart}>
        <div className="CartModa" onClick={(e)  => e.stopPropagation()}>
          <h1>Ваш кошик порожній</h1>
          <button onClick={closeCart}>Закрити</button>
        </div>
      </div>
    );
  }
  return (
    <div className="CartModalAll" onClick={closeCart}>
      <div className="CartModa" onClick={(e) => e.stopPropagation()}>
        <h1>Ваш кошик</h1>
        {cart.items.map((item, index) => (
          <div key={index} className="CartItem">
            <img
              src={item.product.image || "https://via.placeholder.com/150"}
              alt={item.product.title}
              className="CartModalImage"
            />
            <p>{item.product.title}</p>
            <p>Кількість:{item.quantity}</p>
            <p>Сума: ${item.product.price * item.quantity}</p>
            <button onClick={() => removeItem(index)}>❌</button>
          </div>
        ))}

        <p>Загальна сума: ${cart.totalPrice}</p>
        <button onClick={() =>{
          closeCart();
          navigate("/checkout");
        }}>
          Оформити замовлення
        </button>
        <button onClick={closeCart}>Закрити</button>

      </div>
    </div>
  )
}

