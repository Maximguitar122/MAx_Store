import React from "react";
import "../style/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>MyShop</h2>
          <p>Якість. Швидкість. Довіра.</p>
        </div>


      </div>








      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyShop. Усі права захищені.</p>
      </div>
    </footer>
  );
}
