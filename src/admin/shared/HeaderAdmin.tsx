import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "../Dashboard";
import Products from "../Products";
import Users from "../Users";
import SalesHistory from "../SalesHistory";
import Sidebar from "./Sidebar"
import PrivateRoute from "../auth/PrivateRoute";
import RestrictedBtn from '../auth/ResctrictedBtn';


// import RestrictedBtn from '../auth/ResctrictedBtn';
// import RestrictedCartBtn from '../auth/RestrictedCartBtn';
import '../styles/header-admin.scss';

const HeaderAdmin = () => {
    return (
        <div className="flexible-content">
            <nav className="navbar navbar-light navbar-expand-md scrolling-navbar flexible-navbar" role="navigation">                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">                       
                        <RestrictedBtn />
                    </ul>
                </div>
            </nav>
            <Sidebar />
            <main id="content">
                <Routes>
                    <Route path='/dashboard' element={<PrivateRoute />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                    </Route>
                    <Route path='/products' element={<PrivateRoute />}>
                        <Route path='/products' element={<Products />} />
                    </Route>
                    <Route path='/users' element={<PrivateRoute />}>
                        <Route path='/users' element={<Users />} />
                    </Route>
                    {/* <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/sales' element={<SalesHistory />} />
                    <Route path='/users' element={<Users />} /> */}
                </Routes>
            </main>
        </div>
    );
}

export default HeaderAdmin