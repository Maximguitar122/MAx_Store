import React, {useReducer, useRef, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../style/Admin.css"

const initialState = {
  products: JSON.parse(localStorage.getItem("products"))|| [],
  categories: JSON.parse(localStorage.getItem("categories")) || [],
  isAuthenticated: false,
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH': {
      return {...state, isAuthenticated: action.payload};
    }
    case 'ADD_PRODUCT': {
      const updatedProducts = [...state.products,  action.payload];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return {...state, products: updatedProducts};
    }
    case 'DELETE_PRODUCT': {

      const updatedProducts = state.products.filter(p => p.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return {...state, products: updatedProducts};
    }
    case 'ADD_CATEGORY': {
      const updatedCategories = [...state.categories, action.payload];
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return {...state, categories: updatedCategories};
    }
    default:
      return state;
  }
};
export default function Admin() {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const[productForm, setProductForm] = useState({title:'', price:'', category:'', image:''});
  const [categoryForm, setCategoryForm] = useState({name:'',image:''});
  const productTitleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(state.isAuthenticated && productTitleRef.current){
      productTitleRef.current.focus();
    }
  }, [state.isAuthenticated]);
  const handleLogin = () => {
    dispatch({type: 'SET_AUTH', payload: true});
  };
  const handleAddProduct = (a) => {
    a.preventDefault();

 if(!productForm.title || !productForm.price || !productForm.category || !productForm.image){
   alert("Заповнть всі поля");
   return;
 }
    dispatch({
      type: 'ADD_PRODUCT',
      payload: {
        id: Date.now(),
        title: productForm.title,
        price: productForm.price,
        category: productForm.category,
        image: productForm.image,
      },
    });
  setProductForm({title:'', price:'', category:'', image:''});
  };
  const handleAddCategory = (a) => {
    a.preventDefault();
    if (!categoryForm.name || !categoryForm.image) {
      alert("Заповніть всі поля категорії!");
      return;
    }
    dispatch({
      type: 'ADD_CATEGORY',
      payload: {id: Date.now(),  name: categoryForm.name}
    });
    setProductForm({name:''});
  };
  if(!state.isAuthenticated){
    return(
      <div className="admin-container">
        <h1>Адмін-панель</h1>
        <button onClick={handleLogin}>Увійти як адмін</button>
      </div>
    )
  }
  return (
    <div className="admin-container">
      <h1 className="text">Адмін-панель</h1>
      <form onSubmit={handleAddProduct} className="AddProductForm">
        <h2 className="prod-add">Додати товар</h2>
        <input
          ref={productTitleRef}
          type="text"
          placeholder="Назва товару"
          value={productForm.title}
          onChange={(a) => setProductForm({ ...productForm, title: a.target.value })}
          className="change"
        />
        <input
          type="number"
          placeholder="Ціна"
          value={productForm.price}
          onChange={(a) => setProductForm({ ...productForm, price: a.target.value })}
          className="change2"
        />
        <input
          type="text"
          placeholder="Категорія товару"
          value={productForm.category}
          onChange={(a) => setProductForm({ ...productForm, category: a.target.value })}
          className="change3"
        />

        <input
          type="text"
          placeholder="URL зображення"
          value={productForm.image}
          onChange={(a) => setProductForm({ ...productForm, image: a.target.value })}
          className="change4"
        />
        <button type="submit" className="sub">
          Додати товар
        </button>
      </form>


      <form onSubmit={handleAddCategory} className="add-category">
        <h2 className="relase">Додати категорію</h2>
        <input
          type="text"
          placeholder="Назва категорії"
          value={categoryForm.name}
          onChange={(a) => setCategoryForm({ ...categoryForm, name: a.target.value })}
          className="input"
        />

        <button type="submit" className="sub2">
          Додати категорію
        </button>
      </form>


      <h2 className="tovar">Товари</h2>
      <div className="product">
        {state.products.map(product => (
          <div key={product.id} className="id">
            <h3>{product.title}</h3>
            <p>Ціна: ${product.price}</p>
            <p>Категорія: {product.category}</p>
            <img src={product.image} alt={product.title} className="pr-img" />
            <button
              onClick={() => dispatch({ type: 'DELETE_PRODUCT', payload: product.id })}
              className="button remove"
            >
              Видалити
            </button>
            <p>Зачекайте на схвалення</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="button-nav"
      >
        На головну
      </button>
    </div>
  )
}
