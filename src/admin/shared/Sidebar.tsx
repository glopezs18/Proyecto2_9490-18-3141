import React, { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import logo from "../assets/logo-mariano-galvez.png";
import "../styles/sidebar.scss";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar-fixed position-fixed">
        <a href="#!" className="logo-wrapper waves-effect" style={{fontWeight: "bold"}}>
          <img alt="MDB React Logo" style={{padding: "0.5rem 0 0"}} className="img-fluid" src={logo} />
          Administrador
        </a>
        <MDBListGroup className="list-group-flush">
          <NavLink to="/admin/dashboard" >
            <MDBListGroupItem>
              <MDBIcon icon="chart-pie" className="mr-3" />
              Dashboard
            </MDBListGroupItem>
          </NavLink>
          <NavLink to="/admin/products" >
            <MDBListGroupItem>
              <MDBIcon icon="table" className="mr-3" />
              Productos
            </MDBListGroupItem>
          </NavLink>
          <NavLink to="/admin/users" >
            <MDBListGroupItem>
              <MDBIcon icon="user" className="mr-3" />
              Usuarios
            </MDBListGroupItem>
          </NavLink>
        </MDBListGroup>
      </div>
    </>
  );
};

export default Sidebar;