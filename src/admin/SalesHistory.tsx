import React, { FC } from "react";
import Tienda from "../components/Tienda";
import "./styles/dashboard.scss";

const SalesHistory = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <div>
          <h3 className="m-3">Historial de Ventas</h3>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center text-center">
          
        </div>
      </div>
    </>
  );
};

export default SalesHistory;