import React, { FC } from "react";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import EnvConfig from '../env/EnvConfig'
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/shopping-cart.scss";

const ShoppingCart = () => {
  const BASE_URL = EnvConfig().BASE_URL;
  const IMAGE_URL = EnvConfig().IMAGE_URL;
  let listCart: any = localStorage.getItem("shoppCart");
  listCart = JSON.parse(listCart);
  const removeToCart = (product_id: any) => {
    console.log(product_id);
  };
  const cartItems = (localStorage.getItem("shoppCart")) ? listCart[0].productos.map((item: any) => (
    <tr key={item._id}>
      <td><img src={IMAGE_URL + item.imagen} alt={item.nombre} width={"100px"} /></td>
      <td>
        <div><h6>{item.nombre}</h6></div>
        <div><strong>Marca:</strong> <span className="pl-2">{item.nombre}</span></div>
        <div><strong>Categoría:</strong> <span className="pl-2">{item.categorias}</span>
        </div>
      </td>
      <td>Q{item.precio}</td>
      <td>{item.quantity}</td>
      <td>Q{item.precio * item.quantity}</td>
    </tr>
  )) : <tr><td colSpan={5}>Carrito vacío</td></tr>;

  const purchase = () => {
    let params = {
      id_usuario: localStorage.getItem("id_user"),
      nombre: localStorage.getItem("nombre"),
      datosCarrito: listCart[0],
      total: listCart[0].total
    };
    console.log(params);

    axios
      .post(BASE_URL + '/carrito/compra', params, { headers: { Authorization: 'Bearer ' + localStorage.getItem("auth") } })
      .then(function (response) {
        console.log(response);

        if (response.data.success === false) {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          localStorage.removeItem("shoppCart");
          setTimeout(() => {
            window.location.href = window.location.href;
          }, 3000);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

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
          <h3 className="m-3">Carrito Detalle</h3>
        </div>
      </div>
      <div className="container bg-white rounded-top mt-5" id="zero-pad">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10 col-12 pt-3">
            <div className="d-flex flex-column pt-4">
              <div><h5 className="text-uppercase font-weight-normal">shopping bag</h5></div>
              <div className="font-weight-normal">{(localStorage.getItem("shoppCart")) ? listCart[0].productos.length : "0"} productos</div>
            </div>
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th></th>
                  <th>PRODUCTOS</th>
                  <th>PRECIO</th>
                  <th>CANTIDAD</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems}
              </tbody>
            </table>

            {/* <div className="d-flex flex-row mx-lg-5 mobile" id="heading">
              <div className="mr-lg-5" id="produc" style={{ paddingLeft: "7.5rem", paddingRight: "2.4rem" }}>PRODUCTS</div>
              <div className="ml-lg-5" id="prc" style={{ paddingLeft: "5rem", paddingRight: "2.4rem" }}>PRICE</div>
              <div className="ml-lg-1" id="quantity" style={{ paddingLeft: "5rem", paddingRight: "2.4rem" }}>QUANTITY</div>
              <div className="ml-lg-3" id="total" style={{ paddingLeft: "5rem", paddingRight: "2.4rem" }}>TOTAL</div>
            </div> */}

          </div>
        </div>
      </div>
      <div className="container bg-light rounded-bottom py-4" id="zero-pad">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div className="px-md-0 px-1" id="footer-font">
                <b className="pl-md-4">TOTAL: <span className="pl-md-4"> Q{(localStorage.getItem("shoppCart")) ? listCart[0].total : 0}</span></b>
              </div>
              <div>
                {(localStorage.getItem("shoppCart")) ? <button className="btn btn-sm bg-dark text-white px-lg-5 px-3" onClick={() => purchase()}>PAGAR</button> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default ShoppingCart;