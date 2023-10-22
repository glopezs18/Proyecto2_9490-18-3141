import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

const RestrictedBtn = () => {
    const token = localStorage.getItem("authAdmin");
    const username = localStorage.getItem("userAdmin");
    const auth = token; // determine if authorized, from context or however you're doing it    

    let navigate = useNavigate();
    const logout = () => {
        // localStorage.clear();
        localStorage.removeItem("authAdmin");
        localStorage.removeItem("rolAdmin");
        localStorage.removeItem("userAdmin");
        localStorage.removeItem("id_user_admin");
        navigate("/admin/login");
    };
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return !auth ? <li className="nav-item'">
        <NavLink
            to="/login"
            className={`nav-link px-2 text-white btn`}
        >
            Iniciar Sesión
        </NavLink>
    </li> : <li className="nav-item">
        <Dropdown>
            <Dropdown.Toggle variant="primary" className="btn-logout" id="dropdown-basic">
                {username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {/* <Dropdown.Item href="/profile">Ver Perfil</Dropdown.Item> */}
                <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </li>;
}

export default RestrictedBtn;