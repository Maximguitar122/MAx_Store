import React, {useContext,useState, useEffect } from 'react';

import ProductCard from "../components/ProductCard";
import {getProducts} from "../api/api.js";
import "../style/ProductList.css"
import {CartContext} from "../State/CartContext.jsx";


export default function ProductList({ products }) {
  if (!products || products.length === 0) return <p>Товарів поки немає</p>;

  return (
    <div className="productList">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
