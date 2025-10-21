import React, {useContext} from "react";
import { OrderContext } from "../State/OrderContext.jsx";
import "../style/Order.css";
export default function Orders(){
  const{orders} = useContext(OrderContext);
  if(!orders || orders.length === 0){
    return(
      <div className= "orders-container-empty">
        <h2>У вас ще немає замовлень</h2>
        <p>Перейдіть до каталогу, щоб зробити перше замовлення!</p>
      </div>
    )
  }
  return (
    <div className="orders">
      <h1> Мої замовлення</h1>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <h2>Замовлення №{order.id}</h2>
            <span className={`order-status ${order.status}`}>
              {order.status === "pending"
                ? "Очікує підтвердження"
                : order.status === "completed"
                  ?  "Виконано"
                  : "Скасовано"}
            </span>
          </div>
          <p><b>Дата: </b> {new Date(order.createCart).toLocaleString()}</p>
          <p><b>Сума:</b> ${order.total}</p>
          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="orders-item">
                <img
                  src={item.product.image || "https://via.placeholder.com/100"}
                  alt={item.product.title}
                  className="order-item-image"
                />
                <div>
                  <p><b>{item.product.title}</b></p>
                  <p>Кількість: {item.quantity}</p>
                  <p>Ціна: ${item.product.price}</p>
                </div>
              </div>

            ))}
          </div>
        </div>
      ))}

    </div>
  )

}
