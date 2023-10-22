import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";

const RestrictedCartBtn = () => {
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
    return auth ? <li className="nav-item'">
        <NavLink
            to="/shopping-cart"
            className={`nav-link px-2 text-white btn`}
        >
            Carrito
        </NavLink>
    </li> : <li style={{display: "none"}}></li> ;
}

export default RestrictedCartBtn;