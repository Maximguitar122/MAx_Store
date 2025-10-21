import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {CartContext} from "../State/CartContext.jsx";
import {OrderContext} from "../State/OrderContext.jsx";
import {useNavigate} from "react-router-dom";
import "../style/Checkout.css"
export default function Checkout({ onClose }) {
  const cartContext = useContext(CartContext);
  const orderContext = useContext(OrderContext);
  const navigate = useNavigate();
  const{register, handleSubmit, } = useForm();
  const onSubmit = async (data) => {
    try {

      const orderData = {
        customer: data,
        items: cartContext.cart.items,
        total: cartContext.cart.totalPrice
      };


      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error("Помилка при створенні замовлення");

      const newOrder = await response.json();


      cartContext.cart.items = [];
      cartContext.cart.calculateTotal();
      cartContext.setCart({ ...cartContext.cart });


      if (onClose) onClose();


      alert(`Замовлення успішно створено! Номер: ${newOrder.id}`);

    } catch (error) {
      console.error(error);
      alert("Сталася помилка при відправці замовлення");
    }

  }

  return (
    <div className="checkout-container">
      <h1>Оформлення замовлення</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
        <input {...register("name")} placeholder="Ім'я" required />
        <input {...register("email")} type="email" placeholder="Email" required />

        <input {...register("phone")} placeholder="Телефон" required />
        <input {...register("city")} placeholder="Місто" required />
        <input {...register("post")} placeholder="Відділення пошти" required />
        <p>Загальна сума: ${cartContext.cart.totalPrice}</p>
        <button type="submit">Підтвердити замовлення</button>
      </form>

    </div>

  )

}
