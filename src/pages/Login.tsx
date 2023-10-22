import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import EnvConfig from '../env/EnvConfig'
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Login = () => {
    let navigate = useNavigate();
    const BASE_URL = EnvConfig().BASE_URL;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const login = (data: any) => {
        let params = {
            username: data.user,
            clave: data.clave,
        };

        axios
            .post(BASE_URL + '/login', params)
            .then(function (response) {

                //   IF EMAIL ALREADY EXISTS
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
                    localStorage.setItem("auth", response.data.token);
                    localStorage.setItem("id_user", response.data.result._id);
                    localStorage.setItem("user", response.data.result.user);
                    localStorage.setItem("rol", response.data.result.rol);
                    localStorage.setItem("nombre", response.data.result.nombres + " " + response.data.result.apellidos);
                    localStorage.setItem("dpi", response.data.result.dpi);
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
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
                    <div className="card mb-3" style={{ maxWidth: "460px", height: "380px" }}>
                        <div className="col-md-12">
                            <div className="card-body">
                                <h3 className="card-title text-center text-secondary mt-3">
                                    Iniciar Sesión
                                </h3>
                                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                                    <div className="mb-3 mt-4">
                                        <label className="form-label">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control shadow-none"
                                            id="exampleFormControlInput1"
                                            {...register("user", { required: "User is required!" })}
                                        />
                                        {errors.user && (
                                            <p className="text-danger" style={{ fontSize: 14 }}>
                                                Usuario Requerido
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control shadow-none"
                                            id="exampleFormControlInput2"
                                            {...register("clave", {
                                                required: "Password is required!",
                                            })}
                                        />
                                        {errors.clave && (
                                            <p className="text-danger" style={{ fontSize: 14 }}>
                                                Contraseña Requerida
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-center mt-4 ">
                                        <button
                                            className="btn btn-outline-primary text-center shadow-none mb-3"
                                            type="submit"
                                        >
                                            Iniciar sesión
                                        </button>
                                        <p className="card-text pb-2">

                                            ¿No tienes una cuenta? {" "}
                                            <Link style={{ textDecoration: "none", color: "blue" }} to={"/register"}>
                                                Registro
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
export default Login;