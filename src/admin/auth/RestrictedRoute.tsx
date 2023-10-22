import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";

const RestrictedRoute = (props:any) => {
  // const isAuth  = false

  const token = localStorage.getItem('authAdmin');  
 
  return <>{!token ? <Outlet /> : <Navigate to="/admin/dashboard" />}</>;

};

export default RestrictedRoute;