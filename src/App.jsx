import React, { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import './style/App.css'
import Header from "./components/Header";
import Side from "./components/Side";
import ProductList from "./components/ProductList";
import { getCategories, getProducts,  } from "./api/api.js";
import CartModal from "./pages/CartModal.jsx";
import { CartProvider, CartContext } from "./State/CartContext.jsx";
import OrderProvider from "./State/OrderContext.jsx";
import {Routes, Route} from "react-router-dom";
import Checkout from "./pages/Checkout.jsx";
import Admin from "./pages/Admin.jsx";
import Footer from "./components/Footer.jsx";

function AppContent() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isCartOpen, closeCart } = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    })
  .catch((error) => {
      console.error("Помилка завантаження категорій:", error);
      setLoading(false);
    });
  }, [])
  useEffect(() => {
    if (!selectedCategory) return;
    getProducts(selectedCategory.name).then((data) => setProducts(data))

      .finally(() => setLoadingProducts(false));


  }, [selectedCategory]);
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="App">
      <Header  searchTerm = {searchTerm} setSearchTerm={setSearchTerm} setIsCheckoutOpen={setIsCheckoutOpen}/>
      <div className="main">
        {loading ? (
          <p className="loading">Завантаження...</p>
        ) : (
          <Side

            categories={categories}
            oneSelectCategory={setSelectedCategory}
          />
        )}

        <div className="content">
          {loadingProducts && (
            <p className="loading">Завантаження товарів...</p>
          )}

          {!loadingProducts && selectedCategory && (
            <>
              <h1>{selectedCategory.name}</h1>

              <ProductList products={filteredProducts}  />
            </>
          )}
          <Toaster position="top-right" reverseOrder={false} />
          {isCartOpen && <CartModal />}
          {isCheckoutOpen && (
            <div className="checkout-overlay">
              <div className="checkout-modal">
                <button
                  className="checkout-close"
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  ✕
                </button>
                <Checkout onClose={() => setIsCheckoutOpen(false)} />
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>

    </div>
  );
}
function App() {
  return (
    <OrderProvider>
    <CartProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path = "/admin" element={<Admin />} />
      </Routes>

    </CartProvider>
      </OrderProvider>
  );
}

export default App
