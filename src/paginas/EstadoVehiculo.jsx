import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';
import InputText from '../componentes/InputText';


export default function ListadoAsignaciones(props) {
  return (
    <section className="container mt-3" style = {{margin:'100px 2px'}}>
      <div className="container col-10 backgroundNav">
        <HeaderInfo titulo="Estado del vehiculo" usuarioNombre={props.usuario.nombre} usuarioImagen={props.usuario.img} />
      </div>
      
      <div className="row" >
        <div className="card col-3" style = {{marginRight:'20px'}}>
          <div className="card-body" >
            <h6 className="card-tittle text-center">Informacion</h6>
            <div className="card-text text-center">
              <div className = "col">
                <div className="row">
                  <p>Placa:</p>
                </div>
                <div className="row">
                  <p>Modelo:</p>
                </div>
                <div className="row">
                  <p>Marca:</p>
                </div>
                <div className="row">
                  <p>Combustible:</p>
                </div>
                <div className="row">
                  <p>Motor:</p>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        <div className="card col-3" style = {{marginRight:'20px'}}>
          <div className="card-body">
            <h4 className="card-tittle text-center">Servicios</h4>
            <div className="card-text text-center"> 
              <div className="row">
                <div className="col-2">
                  <input type="checkbox" />
                </div>
                <div className= "col-sm">
                  <p>Revicion de frenos</p>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <input type="checkbox" />
                </div>
                <div className= "col-sm">
                  <p>Amortiguadores</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card col-5">
          <div className="card-body">
            <h4 className="card-tittle text-center">Comentarios</h4>
            <div className="card-text text-center">[Comentarios realizados]</div>
            <InputText  classInput="col-6"/>
            <button className="btn btn-success"  style = {{marginLeft:'6px'}} > Ingresar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

