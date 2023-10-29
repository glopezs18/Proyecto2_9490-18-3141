import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";

const RestrictedCartBtn = (props) => {
    const token = localStorage.getItem("auth");
    const username = localStorage.getItem("user");
    const auth = token; // determine if authorized, from context or however you're doing it    

    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <button className="btn btn-primary" onClick={props.onAddToCart}>
    Agregar al carrito
  </button> : <></>;
}

export default RestrictedCartBtn;