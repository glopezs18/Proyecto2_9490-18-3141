import React, { FC } from "react";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatatablePage from './components/DatatablePage'
import AuthHeaders from '../auth/AuthHeaders'
import EnvConfig from '../env/EnvConfig'
import { ToastContainer, toast, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "./styles/pages.scss";
import axios from "axios";

const Products = () => {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([] as any);
  const [validated, setValidated] = useState(false);
  const [file, setFile]: any = useState();

  const [idProducto, setIdProducto]: any = useState();
  const [nombreProducto, setNombreProducto]: any = useState();
  const [marcaProducto, setMarcaProducto]: any = useState();
  const [dispProducto, setDispProducto]: any = useState();
  const [descProducto, setDescProducto]: any = useState();
  const [precioProducto, setPrecioProducto]: any = useState();
  const [precioDescProducto, setPrecioDescProducto]: any = useState();
  const [imagenProducto, setImagenProducto]: any = useState();
  const [descripcionProducto, setDescripcionProducto]: any = useState();
  const [categoriaProducto, setCategoriaProducto]: any = useState();

  const BASE_URL = EnvConfig().BASE_URL;
  const IMAGE_URL = EnvConfig().IMAGE_URL;

  const handleClose = () => {
    setShow(false)
    clearForm()
    setEdit(false)
  };
  const handleShow = () => setShow(true);


  const handleEdit = (_id: any) => {
    console.log("product", _id);
    axios
      .get(BASE_URL + '/producto/' + _id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          setEdit(true);
          setShow(true);
          setIdProducto(_id);
          setNombreProducto(res.data.result.nombre);
          setMarcaProducto(res.data.result.marca);
          setDispProducto(res.data.result.disponibilidad);
          setDescProducto(res.data.result.descuento);
          setPrecioProducto(res.data.result.precio);
          setPrecioDescProducto(res.data.result.precioDescuento);
          setImagenProducto(res.data.result.imagen);
          setDescripcionProducto(res.data.result.descripcion);
          setCategoriaProducto(res.data.result.categorias);
        }
      })
      .catch(er => console.log(er))
  };
  const handleDelete = (_id: any) => {
    console.log("delete product", _id);
    axios
      .delete(BASE_URL + '/producto/' + _id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
      .then((res) => {
        setShow(false);
        if (res.data.success) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        }
      })
      .catch(er => console.log(er))
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (validated) {
      const target = event.target;

      const data = {
        nombre: target.nombre.value,
        marca: target.marca.value,
        disponibilidad: target.disponibilidad.value,
        descuento: target.descuento.value,
        precio: target.precio.value,
        imagen: target.imagen.files[0].name,
        descripcion: target.descripcion.value,
        categorias: target.categorias.value
      };
      setFile(target.imagen.files[0])
      if (!edit) {
        axios
          .post(BASE_URL + '/productos', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              const formData = new FormData();
              formData.append('file', file);
              axios
                .post(BASE_URL + '/productos/upload', formData)
                .then((res) => {
                  console.log("upload image", res);
                  setShow(false);
                  if (res.data.success) {
                    toast.success("Producto agregado con éxito.", {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: 0,
                      toastId: "my_toast",
                    });
                  }
                })
                .catch(er => console.log(er))
            }
          })
          .catch(er => console.log(er))
      } else {
        console.log("Formulario para editar");
        axios
          .put(BASE_URL + '/producto/' + idProducto, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              if (imagenProducto != target.imagen.files[0].name) {
                const formData = new FormData();
                formData.append('file', file);
                axios
                  .post(BASE_URL + '/productos/upload', formData)
                  .then((res) => {
                    console.log("upload image", res);
                    setShow(false);
                    if (res.data.success) {
                      toast.success("Producto editado con éxito.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: 0,
                        toastId: "my_toast",
                      });
                    }
                  })
                  .catch(er => console.log("error", er))
              } else {
                setShow(false);
                toast.success(res.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: 0,
                  toastId: "my_toast",
                })
              }

            }
          })
          .catch(er => console.log(er))
      }

    }
  };

  const columnsProducts = {
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
        label: 'Descripcion',
        field: 'descripcion',
        sort: 'disabled',
        width: 100
      },
      {
        label: 'Categoría',
        field: 'categorias',
        sort: 'disabled',
        width: 100
      }
    ]
  };

  const clearForm = () => {
    setNombreProducto("");
    setMarcaProducto("");
    setDispProducto("");
    setDescProducto("");
    setPrecioProducto("");
    setPrecioDescProducto("");
    setImagenProducto("");
    setDescripcionProducto("");
    setCategoriaProducto("");
  }

  useEffect(() => {
    getAgreementsData();
    if (products) {
      products.map((item: any) => {
        item.imagen = (
          <img
            src={IMAGE_URL + item.imagen}
            alt="image"
            className="someImgClass"
          />
        )
      })
    }
  }, [products]);

  const getAgreementsData = () => {
    axios
      .get(BASE_URL + '/productos', { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
      .then((res) => {
        const rowsProducts: Array<any> = [];

        res.data.map((item: any) => {
          rowsProducts.push({
            nombre: item.nombre,
            marca: item.marca,
            disponibilidad: item.disponibilidad,
            descuento: item.descuento,
            precio: item.precio,
            precioDescuento: item.precioDescuento,
            imagen: item.imagen,
            descripcion: item.descripcion,
            categorias: item.categorias,
            clickEvent: () => handleEdit(item._id)
          })
        })


        setProducts(rowsProducts)
      });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col sm={8}>
              <h3 className="m-3 text-left fw-bold">Productos</h3>
            </Col>
            <Col sm={4}>
              <Button className="float-right" variant="primary" onClick={handleShow}>
                Agregar nuevo producto
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center text-center">
          <hr />
          <DatatablePage columns={columnsProducts} data={products} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{(edit) ? 'Editar producto' : 'Agregar Nuevo Producto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="nombre"
                    placeholder="Nombre de Producto"
                    autoFocus
                    defaultValue={nombreProducto}
                  />
                  <Form.Control.Feedback type="invalid">¡Nombre de producto requerido!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom02">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="marca"
                    placeholder="Nombre de Marca"
                    autoFocus
                    defaultValue={marcaProducto}
                  />
                  <Form.Control.Feedback type="invalid">¡Nombre de marca requerida!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom03">
                  <Form.Label>Disponibilidad</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="disponibilidad"
                    placeholder="Cantidad disponible"
                    autoFocus
                    defaultValue={dispProducto}
                  />
                  <Form.Control.Feedback type="invalid">¡Disponibilidad de producto requerido!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom04">
                  <Form.Label>Descuento</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="descuento"
                    placeholder="Descuento de producto"
                    autoFocus
                    defaultValue={descProducto}
                  />
                  <Form.Control.Feedback type="invalid">Descuento de producto requerido!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom05">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="precio"
                    placeholder="Precio de producto"
                    autoFocus
                    defaultValue={precioProducto}
                  />
                  <Form.Control.Feedback type="invalid">Precio de producto requerido!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom06">
                  <Form.Label>Imagen de producto</Form.Label>
                  <Form.Control required name="imagen" type="file" />
                  <Form.Control.Feedback type="invalid">Imagen de producto requerida!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom07">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control required name="descripcion" as="textarea" defaultValue={descripcionProducto} rows={3} />
                  <Form.Control.Feedback type="invalid">Descripción de producto requerido!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom08">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="categorias"
                    placeholder="Categoría de producto"
                    defaultValue={categoriaProducto}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">Categoría de producto requerido!</Form.Control.Feedback>
                </Form.Group>
                <Modal.Footer style={{ display: "block" }}>

                  {
                    (edit) ? <Button variant="danger" onClick={() => handleDelete(idProducto)}> Eliminar </Button> : <Button variant="blue-grey" onClick={handleClose}> Cerrar </Button>
                  }

                  <Button style={{ float: "right" }} variant="primary" type="submit">
                    Guardar
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
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

export default Products;