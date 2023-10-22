import Productos from './Productos';
import Carrito from './Carrito';
import React, { useState, useEffect } from 'react';
import AuthHeaders from '../auth/AuthHeaders'
import EnvConfig from '../env/EnvConfig'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { log } from 'console';

function Tienda() {
  const [cart, setCart]: any = useState([]);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const BASE_URL = EnvConfig().BASE_URL;
  let listCart: any = [];
  let storageCart: any = localStorage.getItem("shoppCart");
  storageCart = JSON.parse(storageCart);
  
  useEffect(() => {
    if (storageCart) {
      listCart = storageCart[0].productos;
      setCart(storageCart[0].productos);
      setTotal(storageCart[0].total);
    }
  }, []);
  

  const addToCart = (product: any) => {   
    listCart = (listCart.length < 1) ? listCart : [];     
    const existingItem: any = cart.find((item: any) => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      setCart([...cart]);
    } else {
      const newItem = { ...product, quantity: 1 };
      
      setCart([...cart, newItem]);
    }
            
    setTotal(total + product.precio);
    listCart.push({productos: cart, total: total});  
    localStorage.setItem("shoppCart", JSON.stringify(listCart));
  };

  const removeFromCart = (product: any) => {
    const existingItem: any = cart.find((item: any) => item._id === product._id);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        const updatedCart = cart.filter((item: any) => item._id !== product._id);
        setCart(updatedCart);
      }
            
      setTotal(total - product.precio);
      listCart.push({productos: cart, total: (total - product.precio)});
      localStorage.setItem("shoppCart", JSON.stringify(listCart));
    }
  };

  useEffect(() => {
    fetch(BASE_URL + '/productos', {
      method: 'GET'
    }).then(response => {
        return response.json()
    }).then((list) => {
        setList(list)
    })
  }, [])

  const products = list;

  return (
    <div className="container shop-content">
      <div>
        <div className="row">
          {products && products.map((product: any) => (                      
            <Productos
              key={product._id}
              {...product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>

        <Carrito items={cart} total={total} onRemoveFromCart={removeFromCart} />
      </div>


    </div>
  );
}

export default Tienda;