import React, {useContext, useState} from 'react';
import "../style/Header.css"
import { FaShoppingBasket } from "react-icons/fa";
import { TbShoppingBagHeart } from "react-icons/tb";
import { TbShoppingCartQuestion } from "react-icons/tb";
import {CartContext} from "../State/CartContext.jsx";
import OrderModal from "../pages/OrderModal.jsx";
import { useNavigate} from "react-router-dom";


export default function Header({searchTerm, setSearchTerm,setIsCheckoutOpen}) {
  const{openCart} = useContext(CartContext);
  const[isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__logo">
        <img src="public/logo.png" alt="logo" />
      </div>
      <div className="header__search">
        <input type="text"
               placeholder="Пошук"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="header_icon">
        <FaShoppingBasket className="shop__icon" onClick={openCart} />
        <TbShoppingBagHeart  className="shop__icon"   onClick={() => setIsOrderModalOpen(true)}
                             title="Мої замовлення" />
        <TbShoppingCartQuestion className="shop__icon"  onClick={() => navigate('/admin')}
                                title="Адмін-панель"/>


      </div>
      <OrderModal
      isOpen={isOrderModalOpen}
      onClose={() => setIsOrderModalOpen(false)}
      setIsCheckoutOpen={setIsCheckoutOpen}
      />
    </header>
  );
}




