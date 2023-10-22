import React, { Fragment, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import DashboardApp from "./DashboardApp";
import LoginAdmin from "./LoginAdmin";
import PrivateRoute from "./auth/PrivateRoute";
import RestrictedRoute from "./auth/RestrictedRoute";

import './styles/app-admin.scss';

function AppAdmin() {

    return (
        <div>
            {/* <BrowserRouter> */}
            <Fragment>
                <Routes>
                    <Route path='/login' element={<RestrictedRoute />}>
                        <Route path='/login' element={<LoginAdmin />} />
                    </Route>
                    <Route path='/' element={<RestrictedRoute />}>
                        <Route path='/' element={<LoginAdmin />} />
                    </Route>
                    <Route path='/*' element={<DashboardApp />} />                    
                </Routes>
            </Fragment>
            {/* </BrowserRouter> */}
        </div>
    );
}

export default AppAdmin;
