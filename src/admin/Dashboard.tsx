import React, { FC } from "react";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EnvConfig from '../env/EnvConfig'
import DatatablePage from './components/DatatablePage'
import AdminCardSection from './AdminCardSection'
import axios from "axios";
import "./styles/dashboard.scss";

const Dashboard = () => {
  const BASE_URL = EnvConfig().BASE_URL;
  const IMAGE_URL = EnvConfig().IMAGE_URL;
  const [saleId, setSaleId] = useState([] as any);
  const [sales, setSales] = useState([] as any);
  const [salesDetails, setSalesDetails] = useState([] as any);
  const [saleUser, setSaleUser] = useState([] as any);
  const [saleUserTotal, setSaleUserTotal] = useState([] as any);
  const [saleTotalInfo, setSaleTotalInfo] = useState(0);
  const [products, setProducts] = useState([] as any);
  let sumTotals = 0;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = (_id: any) => {
    // console.log("sale", _id);
    setSaleId(_id);
    axios
      .get(BASE_URL + '/compra/' + _id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
      .then((res) => {

        if (res.data.success) {
          setSaleUser(res.data.result.nombre_usuario)
          setSaleUserTotal(res.data.result.total)
          const rowsSales: Array<any> = [];
          console.log(res);
          setShow(true);
          res.data.result.datosCarrito.productos.map((item: any) => {

            rowsSales.push({
              nombre: item.nombre,
              marca: item.marca,
              disponibilidad: item.disponibilidad,
              descuento: "Q" + item.descuento,
              precio: "Q" + item.precio,
              precioDescuento: "Q" + item.precioDescuento,
              imagen: item.imagen,
              categorias: item.categorias,
              quantity: item.quantity
            })
          })


          setSalesDetails(rowsSales)
        }

      });
  };

  const columnsSalesDetails = {
    columns: [
      {
        label: 'Nombre',
        field: 'nombre',
        sort: 'disabled',
        width: 200
      },
      {
        label: 'Marca',
        field: 'marca',
        sort: 'disabled',
        width: 200
      },
      {
        label: 'Disponibilidad',
        field: 'disponibilidad',
        sort: 'disabled',
        width: 50
      },
      {
        label: 'Descuento',
        field: 'descuento',
        sort: 'disabled',
        width: 50
      },
      {
        label: 'Precio',
        field: 'precio',
        sort: 'disabled',
        width: 50
      },
      {
        label: 'Precio Descuento',
        field: 'precioDescuento',
        sort: 'disabled',
        width: 50
      },
      {
        label: 'Imagen',
        field: 'imagen',
        sort: 'disabled',
        width: 100
      },
      {
        label: 'Categoría',
        field: 'categorias',
        sort: 'disabled',
        width: 100
      },
      {
        label: 'Cantidad',
        field: 'quantity',
        sort: 'disabled',
        width: 100
      }
    ]
  };

  const columnsSales = {
    columns: [
      {
        label: 'Id Compra',
        field: '_id',
        sort: 'disabled',
        width: 200
      },
      {
        label: 'Id Usuario',
        field: 'id_usuario',
        sort: 'disabled',
        width: 200
      },
      {
        label: 'Nombre Cliente',
        field: 'nombre_usuario',
        sort: 'disabled',
        width: 200
      },
      {
        label: 'Total',
        field: 'total_cart',
        sort: 'disabled',
        width: 50
      }
    ]
  };

  useEffect(() => {
    getSalesData();
  }, [sales]);

  useEffect(() => {
    if (salesDetails) {
      salesDetails.map((item: any) => {
        item.imagen = (
          <img
            src={IMAGE_URL + item.imagen}
            alt="image"
            className="someImgClass"
          />
        )
      })
    }
  }, [salesDetails]);

  const checkImage = (path: string) => {
    axios
      .get(path)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  const getSalesData = () => {
    axios
      .get(BASE_URL + '/compra', { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
      .then((res) => {
        const rowsSales: Array<any> = [];

        res.data.map((item: any) => {
          sumTotals += item.total;
          setSaleTotalInfo(sumTotals)
          rowsSales.push({
            _id: item._id,
            id_usuario: item.id_usuario,
            nombre_usuario: item.nombre_usuario,
            total_cart: "Q" + item.total,
            clickEvent: () => handleEdit(item._id)
          })
        })


        setSales(rowsSales)
      });

  };

  useEffect(() => {
    getProductsData();    
  }, [products]);

  const getProductsData = () => {
    axios
      .get(BASE_URL + '/productos', { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
      .then((res) => {        
        setProducts(res.data)
      });
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col sm={8}>
              <h3 className="m-3 text-left fw-bold">Dashboard</h3>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center text-center">
          <AdminCardSection saleTotalInfo={saleTotalInfo} salesLength={sales.length} productsLength={products.length}/>
          <hr />
          <DatatablePage columns={columnsSales} data={sales} />

          <Modal dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Detalle de compra: {saleId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5 className="title-sale-client-detail">Cliente: <strong>{saleUser}</strong></h5>
              <DatatablePage columns={columnsSalesDetails} data={salesDetails} />
              <hr />
              <div className="px-md-0 px-1 text-center" id="footer-font">
                <b className="pl-md-4">TOTAL COMPRADO:<span className="pl-md-4"> Q{saleUserTotal}</span></b>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Dashboard;