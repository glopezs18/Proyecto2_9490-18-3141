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
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "./styles/pages.scss";
import "./styles/users.scss";

const Users = () => {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([] as any);
  const [validated, setValidated] = useState(false);

  const [idUsuario, setIdUsuario]: any = useState();
  const [nombreUsuario, setNombreUsuario]: any = useState();
  const [apellidosUsuario, setApellidosUsuario]: any = useState();
  const [dpiUsuario, setDpiUsuario]: any = useState();
  const [fechaNacimientoUsuario, setFechaNacimientoUsuario]: any = useState();
  const [claveUsuario, setClaveUsuario]: any = useState();
  const [validacionClaveUsuario, setValidacionClaveUsuario]: any = useState();
  const [nitUsuario, setNitUsuario]: any = useState();
  const [numeroTelefonicoUsuario, setNumeroTelefonicoUsuario]: any = useState();
  const [correoElectronicoUsuario, setCorreoElectronicoUsuario]: any = useState();
  const [rolUsuario, setRolUsuario]: any = useState();
  const [userName, setUserName]: any = useState();

  const BASE_URL = EnvConfig().BASE_URL;

  const handleClose = () => {
    setShow(false)
    clearForm()
    setEdit(false)
  };

  const handleShow = () => setShow(true);
  const handleEdit = (_dpi: any) => {
    console.log("user", _dpi);
    axios
      .get(BASE_URL + '/perfil/' + _dpi, { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
      .then((res) => {
        // console.log(res);

        if (res.data.success) {
          setEdit(true);
          setShow(true);
          setIdUsuario(_dpi);
          setNombreUsuario(res.data.result.nombres);
          setApellidosUsuario(res.data.result.apellidos);
          setDpiUsuario(res.data.result.dpi);
          setFechaNacimientoUsuario(new Date(res.data.result.fechaNacimiento).toISOString().substr(0, 10));
          setClaveUsuario(res.data.result.clave);
          setValidacionClaveUsuario(res.data.result.validacionClave);
          setNitUsuario(res.data.result.nit);
          setNumeroTelefonicoUsuario(res.data.result.numeroTelefonico);
          setCorreoElectronicoUsuario(res.data.result.correoElectronico);
          setRolUsuario(res.data.result.rol);
          setUserName(res.data.result.user);
        }
      })
      .catch(er => console.log(er))
  };

  const handleDelete = (_dpi: any) => {
    console.log("delete user", _dpi);
    axios
      .delete(BASE_URL + '/perfil/' + _dpi, { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
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

      if (!edit) {
        axios
          .post(BASE_URL + '/registro', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              setShow(false);
              toast.success("Usuario agregado con éxito.", {
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
      } else {
        console.log("Formulario para editar");
        axios
          .put(BASE_URL + '/perfil/' + idUsuario, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("authAdmin") } })
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
            }
          })
          .catch(er => console.log(er))
      }
    }
  };

  const clearForm = () => {
    setNombreUsuario("");
    setApellidosUsuario("");
    setDpiUsuario("");
    setFechaNacimientoUsuario("");
    setClaveUsuario("");
    setValidacionClaveUsuario("");
    setNitUsuario("");
    setNumeroTelefonicoUsuario("");
    setCorreoElectronicoUsuario("");
    setRolUsuario("");
    setUserName("");
  }

  const columnsUsers = {
    columns: [
      {
        label: 'Nombre',
        field: 'nombres',
        sort: 'disabled',
        width: 200
      },
      {
        label: 'Apellido',
        field: 'apellidos',
        sort: 'disabled',
        width: 200
      },
      {
        label: 'dpi',
        field: 'dpi',
        sort: 'disabled',
        width: 100
      },
      {
        label: 'Fecha Nacimiento',
        field: 'fechaNacimiento',
        sort: 'disabled',
        width: 150
      },
      {
        label: 'Nit',
        field: 'nit',
        sort: 'disabled',
        width: 50
      },
      {
        label: 'Teléfono',
        field: 'numeroTelefonico',
        sort: 'disabled',
        width: 50
      },
      {
        label: 'Email',
        field: 'correoElectronico',
        sort: 'disabled',
        width: 100
      },
      {
        label: 'Rol',
        field: 'rol',
        sort: 'disabled',
        width: 50
      },
      {
        label: 'Usuario',
        field: 'user',
        sort: 'disabled',
        width: 100
      }
    ]
  };

  useEffect(() => {
    getUserData();
  }, [users]);

  const getUserData = () => {
    axios
      .get(BASE_URL + '/usuarios')
      .then((res) => {
        const rowsUsers: Array<any> = [];

        res.data.map((item: any) => {
          rowsUsers.push({
            nombres: item.nombres,
            apellidos: item.apellidos,
            dpi: item.dpi,
            fechaNacimiento: item.fechaNacimiento,
            nit: item.nit,
            numeroTelefonico: item.numeroTelefonico,
            correoElectronico: item.correoElectronico,
            rol: item.rol,
            user: item.user,
            clickEvent: () => handleEdit(item.dpi)
          })
        })


        setUsers(rowsUsers)
      });
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col sm={8}>
              <h3 className="m-3 text-left fw-bold">Usuarios</h3>
            </Col>
            <Col sm={4}>
              <Button className="float-right" variant="primary" onClick={handleShow}>
                Agregar nuevo usuario
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center text-center">
          <hr />
          <DatatablePage columns={columnsUsers} data={users} />
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{(edit) ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</Modal.Title>
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
                      defaultValue={nombreUsuario}
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
                      defaultValue={apellidosUsuario}
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
                      defaultValue={dpiUsuario}
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
                      defaultValue={fechaNacimientoUsuario}
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
                      defaultValue={claveUsuario}
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
                      defaultValue={validacionClaveUsuario}
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
                      defaultValue={nitUsuario}
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
                      defaultValue={numeroTelefonicoUsuario}
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
                      defaultValue={correoElectronicoUsuario}
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
                      defaultValue={rolUsuario}
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
                      defaultValue={userName}
                    />
                    <Form.Control.Feedback type="invalid">Nombre de usuario requerido!</Form.Control.Feedback>
                  </Form.Group>
                  <Modal.Footer style={{ display: "block" }}>
                    {
                      (edit) ? <Button variant="danger" onClick={() => handleDelete(idUsuario)}> Eliminar </Button> : <Button variant="blue-grey" onClick={handleClose}> Cerrar </Button>
                    }
                    <Button style={{ float: "right" }} variant="primary" type="submit">
                      Guardar
                    </Button>
                  </Modal.Footer>
                </Row>
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

export default Users;