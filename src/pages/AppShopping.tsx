import React, { Fragment, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import ShoppingCart from './ShoppingCart'
import PrivateRoute from "../auth/PrivateRoute";
import RestrictedRoute from "../auth/RestrictedRoute";

import '../App.scss';

function AppShopping() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Fragment>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<RestrictedRoute />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route path='/register' element={<RestrictedRoute />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/shopping-cart' element={<PrivateRoute />}>
            <Route path='/shopping-cart' element={<ShoppingCart />} />
          </Route>

        </Routes>
        <Footer />
      </Fragment>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default AppShopping;
