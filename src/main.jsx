import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {CartProvider} from "./State/CartContext.jsx";
import {BrowserRouter} from "react-router-dom";
import OrderProvider from "./State/OrderContext.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </OrderProvider>
    </BrowserRouter>
  </StrictMode>,
)

