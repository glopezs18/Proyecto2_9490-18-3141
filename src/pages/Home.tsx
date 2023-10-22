import React, { FC } from "react";
import Tienda from "../components/Tienda";
import "../styles/home.scss";

const Home = () => {
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
          <h3 className="m-3">Inicio</h3>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center text-center">
          <Tienda />
        </div>
      </div>
    </>
  );
};

export default Home;