import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AuthHeaders from '../auth/AuthHeaders'
import EnvConfig from '../env/EnvConfig'
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/profile.scss";

const Profile = () => {
  const localDpi = localStorage.getItem("dpi");
  const localIdUser = localStorage.getItem("id_user");
  const [fechaNacimiento, setFechaNacimiento]: any = useState([]);
  const [nombres, setNombres]: any = useState([]);
  const [apellidos, setApellidos]: any = useState([]);
  const [dpi, setDpi]: any = useState([]);
  const [numeroTelefonico, setNumeroTelefonico]: any = useState([]);
  const [correoElectronico, setCorreoElectronico]: any = useState([]);
  const [rol, setRol]: any = useState([]);
  const [user, setUser]: any = useState([]);
  const [nit, setNit]: any = useState([]);
  const [clave, setClave]: any = useState();
  const [validacionClave, setValidacionClave]: any = useState();
  const [shoppingList, setShoppingList]: any = useState([]);
  const BASE_URL = EnvConfig().BASE_URL;
  const IMAGE_URL = EnvConfig().IMAGE_URL;

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  axios
    .get(BASE_URL + '/perfil/' + localDpi, { headers: { Authorization: 'Bearer ' + localStorage.getItem("auth") } })
    .then(function (response) {
      // console.log(response);

      if (response.data.success === false) {
        console.log("No se realizó la solicitud");
      } else {

        setNombres(response.data.result.nombres);
        setApellidos(response.data.result.apellidos);
        setFechaNacimiento(response.data.result.fechaNacimiento);
        setFechaNacimiento(new Date(response.data.result.fechaNacimiento).toISOString().substr(0, 10));
        setNumeroTelefonico(response.data.result.numeroTelefonico);
        setCorreoElectronico(response.data.result.correoElectronico);
        setRol(response.data.result.rol);
        setNit(response.data.result.nit);
        setUser(response.data.result.user);
        setDpi(response.data.result.dpi);
        setClave(response.data.result.clave);
        setValidacionClave(response.data.result.validacionClave);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  useEffect(() => {
    axios
      .get(BASE_URL + '/compra/user/' + localIdUser, { headers: { Authorization: 'Bearer ' + localStorage.getItem("auth") } })
      .then(function (response) {
        if (response.data.success === false) {
          console.log("No se realizó la solicitud");
        } else {
          setShoppingList(response.data)
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [])

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
        nombres: target.nombres.value,
        apellidos: target.apellidos.value,
        dpi: target.dpi.value,
        fechaNacimiento: target.fechaNacimiento.value,
        clave: target.clave.value,
        validacionClave: target.validacionClave.value,
        nit: target.nit.value,
        numeroTelefonico: target.numeroTelefonico.value,
        correoElectronico: target.correoElectronico.value,
        rol: target.rol.value,
        user: target.user.value,
      };

      console.log("Formulario para editar");
      axios
        .put(BASE_URL + '/perfil/' + dpi, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("auth") } })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
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
          } else {
            toast.error(res.data.message, {
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
  };

  const listItems = shoppingList.map((item: any, index: any) => (
    <div className="accordion-item" key={item._id}>
      <h2 className="accordion-header" id={`flush-heading${index}`}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
          Id Compra #{item._id}
        </button>
      </h2>
      <div key={item._id} id={`flush-collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${index}`} data-bs-parent="#accordionFlushExample">
        <table className="table" key={item._id}>
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>

            {item.datosCarrito.productos.map((product: any) => (
              <tr key={product._id}>
                <td><img src={IMAGE_URL + product.imagen} alt={product.nombre} width={"100px"} /></td>
                <td>{product.nombre}</td>
                <td>{product.marca}</td>
                <td>Q{product.precio}</td>
                <td>{product.quantity}</td>
                <td>Q{product.precio * product.quantity}</td>
              </tr>
            ))}

            <tr key={item._id}>
              <td colSpan={5}><strong>Total a pagar</strong></td>
              <td>Q{item.datosCarrito.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ))

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 p-0">
            <h2 className="text-left profile-title">Perfil</h2>
          </div>
          <div className="col-md-5">
            <div className="row">
              <div className="col-12 bg-white p-0 px-3 py-3 mb-3">
                <div className="d-flex flex-column align-items-center">
                  <div className="profile-initials">
                    <span>{String(nombres).split('')[0] + "" + String(apellidos).split('')[0]}</span>
                  </div>
                  <p className="fw-bold h4 mt-3">{String(nombres).split(' ')[0] + " " + String(apellidos).split(' ')[0]}</p>
                  <p className="text-muted fw-bold">Rol: {rol}</p>
                  <p className="text-muted mb-3 fw-bold">Usuario: {user}</p>
                  <div className="d-flex ">
                    <div className="btn btn-primary follow me-2" onClick={handleShow}>Editar Perfil</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 ps-md-4">
            <div className="row">
              <div className="col-12 bg-white px-3 mb-3 pb-3">
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="py-2"><strong>Nombre Completo</strong></p>
                  <p className="py-2 text-muted">{nombres + " " + apellidos}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="py-2"><strong>DPI</strong></p>
                  <p className="py-2 text-muted">{dpi}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="py-2"><strong>Email</strong></p>
                  <p className="py-2 text-muted">{correoElectronico}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="py-2"><strong>Fecha de nacimiento</strong></p>
                  <p className="py-2 text-muted">{fechaNacimiento}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="py-2"><strong>Teléfono</strong></p>
                  <p className="py-2 text-muted">{numeroTelefonico}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="py-2"><strong>Nit</strong></p>
                  <p className="py-2 text-muted">{nit}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 bg-white px-3 pb-2">
            <h6 className="d-flex align-items-center mb-3 fw-bold py-3">Compras Realizadas</h6>
            <div className="accordion accordion-flush" id="accordionFlushExample">
              {listItems}
              {/* <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Accordion Item #1
                  </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Accordion Item #2
                  </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom01">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="nombres"
                  placeholder="Escribe tus nombres"
                  autoFocus
                  defaultValue={nombres}
                />
                <Form.Control.Feedback type="invalid">¡Nombre de usuario requerido!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom02">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="apellidos"
                  placeholder="Escribe tus apellidos"
                  autoFocus
                  defaultValue={apellidos}
                />
                <Form.Control.Feedback type="invalid">¡Apellido de usuario requerido!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom03">
                <Form.Label>DPI</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="dpi"
                  placeholder="Escribe tu número de DPI"
                  autoFocus
                  defaultValue={dpi}
                />
                <Form.Control.Feedback type="invalid">¡DPI de usuario requerido!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom04">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="fechaNacimiento"
                  placeholder="Selecciona fecha de nacimiento"
                  autoFocus
                  defaultValue={fechaNacimiento}
                />
                <Form.Control.Feedback type="invalid">Fecha de nacimiento requerida!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom05">
                <Form.Label>Clave</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="clave"
                  placeholder="Escribe una contraseña"
                  autoFocus
                  defaultValue={clave}
                />
                <Form.Control.Feedback type="invalid">Contraseña requerida!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom06">
                <Form.Label>Validar Clave</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="validacionClave"
                  placeholder="Repite la contraseña"
                  autoFocus
                  defaultValue={validacionClave}
                />
                <Form.Control.Feedback type="invalid">Contraseña requerida!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom07">
                <Form.Label>Nit</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="nit"
                  placeholder="Escribe tu nit"
                  autoFocus
                  defaultValue={nit}
                />
                <Form.Control.Feedback type="invalid">Nit de usuario requerido!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom08">
                <Form.Label>Télefono</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="numeroTelefonico"
                  placeholder="Escribe tu número de teléfono"
                  autoFocus
                  defaultValue={numeroTelefonico}
                />
                <Form.Control.Feedback type="invalid">Teléfono de usuario requerido!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom09">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="correoElectronico"
                  placeholder="Escribe tu correo electrónico"
                  autoFocus
                  defaultValue={correoElectronico}
                />
                <Form.Control.Feedback type="invalid">Email de usuario requerido!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom10">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="rol"
                  placeholder="Escribe el rol del usuario"
                  autoFocus
                  readOnly
                  defaultValue={rol}
                />
                <Form.Control.Feedback type="invalid">Rol de usuario requerido!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom11">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="user"
                  placeholder="Escribe un nombre de usuario"
                  autoFocus
                  defaultValue={user}
                />
                <Form.Control.Feedback type="invalid">Nombre de usuario requerido!</Form.Control.Feedback>
              </Form.Group>
              <Modal.Footer>
                <Button variant="blue-grey" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </Modal.Footer>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
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

export default Profile;