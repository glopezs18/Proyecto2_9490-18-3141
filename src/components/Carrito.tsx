import React, { Component, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/carrito.scss'

function Carrito(props: any) {
  
  const cartItems = props.items.map((item: any) => (
    <ListGroup className="lista-carrito" key={item._id}>
      <ListGroup.Item data-id={item._id}>{item.nombre} - Q {item.precio} x {item.quantity}
        <button
          className="btn btn-danger ml-2 button-borrar"
          onClick={() => props.onRemoveFromCart(item)}
        >
          Eliminar
        </button>
      </ListGroup.Item>
    </ListGroup>

  ));

  return (
    <div className="cart">
      <h2>Carrito de compras</h2>
      <ul>{cartItems}</ul>
      <h2>Total: Q {props.total}</h2>
    </div>
  );
}

export default Carrito;