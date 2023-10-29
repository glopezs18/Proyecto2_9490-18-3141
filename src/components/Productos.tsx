import EnvConfig from '../env/EnvConfig'
import RestrictedCartBtnUser from '../auth/RestrictedCartBtnUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/productos.scss'

function Productos(props: any) {
  // const IMAGE_URL = "http://localhost:3000/images/";
  const IMAGE_URL = EnvConfig().IMAGE_URL;
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={props._id} data-id={props._id}>
      <div className="card" style={{minHeight: "304px", padding: "20px"}}>
        <img src={IMAGE_URL + props.imagen} className="card-img-top" style={{borderRadius: 0}} alt={props.nombre} />
        <div className="card-body">
          <h5 className="card-title">{props.nombre}</h5>
          <p className="card-text">Q{props.precio}</p>
          <RestrictedCartBtnUser props={props} />
          {/* <button className="btn btn-primary" onClick={props.onAddToCart}>
            Agregar al carrito
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Productos