import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import EnvConfig from '../env/EnvConfig'
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Register: FC = () => {
  const BASE_URL = EnvConfig().BASE_URL;
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const submitData = (data: any) => {
    let params = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      dpi: data.dpi,
      fechaNacimiento: data.fechaNacimiento,
      clave: data.clave,
      validacionClave: data.validacionClave,
      nit: data.nit,
      numeroTelefonico: data.numeroTelefonico,
      correoElectronico: data.correoElectronico,
      rol: "client",
      user: data.user
    };
    // console.log(data);
    axios
      .post(BASE_URL + "/registro", params)
      .then(function (response) {
        if (response.data.success) {
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
          reset();
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
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
        }

      })

      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Formulario de registro
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="col-md-6 mb-3">
                    <div className="">
                      <label className="form-label">Nombres</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("nombres", {
                          required: "Firstname is required!",
                        })}
                      />
                      {errors.nombres && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Nombre Requerido
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="">
                      <label className="form-label">Apellidos</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput2"
                        {...register("apellidos", {
                          required: "Lastname is required!",
                        })}
                      />
                      {errors.apellidos && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Apellido Requerido
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="">
                      <label className="form-label">DPI</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput3"
                        {...register("dpi", {
                          required: "DPI is required!",
                        })}
                      />
                      {errors.dpi && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          DPI Requerido
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="">
                      <label className="form-label">Fecha de nacimiento</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput4"
                        {...register("fechaNacimiento", {
                          required: "Fecha de nacimiento is required!",
                        })}
                      />
                      {errors.fechaNacimiento && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Campo Requerido
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput5"
                        {...register("correoElectronico", { required: "Email is required!" })}
                      />
                      {errors.email && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Email Requerido
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="">
                      <label className="form-label">Nit</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput6"
                        {...register("nit", { required: "Nit is required!" })}
                      />
                      {errors.nit && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Nit Requerido
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="">
                      <label className="form-label">Teléfono</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput7"
                        {...register("numeroTelefonico", { required: "Teléfono is required!" })}
                      />
                      {errors.numeroTelefonico && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Teléfono Requerido
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="">
                      <label className="form-label">Nombre de Usuario</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput8"
                        {...register("user", { required: "User is required!" })}
                      />
                      {errors.user && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Usuario Requerido
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="">
                      <label className="form-label">Contraseña</label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput9"
                        {...register("clave", {
                          required: "Password is required!",
                        })}
                      />
                      {errors.clave && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Campo Requerido
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div>
                      <label className="form-label">Confirmar Contraseña</label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput10"
                        {...register("validacionClave", {
                          required: "Confirm Password is required",

                          validate: (value) =>
                            value === watch("clave") ||
                            "Passwords don't match.",
                        })}
                      />
                      {errors.validacionClave && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          Error en confirmar contraseña
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                    >
                      Submit
                    </button>
                    <p className="card-text">
                      Ya tienes una cuenta?{" "}
                      <Link style={{ textDecoration: "none", color: "blue" }} to={"/login"}>
                        Iniciar Sesión
                      </Link>
                    </p>
                  </div>
                </form>
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

export default Register;