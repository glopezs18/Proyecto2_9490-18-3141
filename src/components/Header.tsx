import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import RestrictedBtn from '../auth/ResctrictedBtn';
import RestrictedCartBtn from '../auth/RestrictedCartBtn';
import '../styles/header.scss';

const Header = () => {    
    return (
        <div>
            <header className="p-3 bg-header text-white">
                <div className="container">
                    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                            <span className="fs-4 text-white">Proyecto #2</span>
                        </a>

                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className={`nav-link px-2 text-white btn`}
                                >
                                    Inicio
                                </NavLink>
                            </li>
                            <RestrictedCartBtn />
                            <RestrictedBtn />                            
                        </ul>
                    </header>
                </div>
            </header>
        </div>
    );
}

export default Header