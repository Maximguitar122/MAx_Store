import React, {useContext} from 'react';
import {CartContext} from "../State/CartContext.jsx";
import {useNavigate} from 'react-router-dom';
import '../style/OrderModal.css'
export default function  OrderModal({isOpen, onClose, setIsCheckoutOpen}) {
  const {cart} = useContext(CartContext);
  const navigate = useNavigate();
  if (!isOpen) return null;
  const handleCheckout = () => {
    if (cart && cart.items && cart.items.length > 0) {
      setIsCheckoutOpen(true);
      onClose();
    }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Попередній перегляд замовлень</h2>
        {cart.items.length === 0 ?(
          <p>Кошик порожній</p>
        ) : (
          <>
            {cart.items.map((item, index) => (
              <div key={index} className="order-preview-item">
                <img
                  src={item.product.image} className="ModalImage"/>
                <p>{item.product.title} - {item.quantity} x ${item.product.price}</p>
                <p>Сума: ${item.product.price * item.quantity}</p>
              </div>
            ))}
            <p>Загальна сума: ${cart.totalPrice}</p>
            <button onClick={handleCheckout}>Оформити</button>
            <button onClick={onClose}> Закрити </button>
          </>
        )
        }
      </div>
    </div>
      )
}
