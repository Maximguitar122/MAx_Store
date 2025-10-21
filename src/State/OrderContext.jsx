import React, {createContext, useState} from "react";
import {Order} from "../class/Order.js";
export const OrderContext = createContext();
export default function OrderProvider({children}) {
  const [orders, setOrder] = useState([]);
  const createOrder = (cart,customer) => {
    const newOrder = new Order(cart);
    newOrder.customer = customer;
    setOrder([...orders, newOrder]);
    return newOrder;
  }
  return (
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
