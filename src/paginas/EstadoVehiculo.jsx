import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';
import InputText from '../componentes/InputText';

export default function ListadoAsignaciones(props) {
  return (
    <section className="container mt-3" style={{margin:'100px 2px',}}>
      <div className="container col-10 backgroundNav">
        <HeaderInfo titulo="Estado del vehiculo" usuarioNombre={props.usuario.nombre} usuarioImagen={props.usuario.img} />
        <div className="row">
          <div className="card col-3">
            <div className="card-body" >
              <h4 className="card-tittle text-center">Información</h4>
              <div className="card-text text-center">
                <div className="col">
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
          <div className="card col-3">
            <div className="card-body">
              <h4 className="card-tittle text-center">Servicios</h4>
              <div className="card-text text-center">
                <div className="row">
                  <div className="col-md-auto">
                    <input type="checkbox" />
                  </div>
                  <div className="col">
                    <label>Revicion de frenos</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-auto">
                    <input type="checkbox" />
                  </div>
                  <div className="col">
                    <label>Amortiguadores</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card col-6">
            <div className="card-body">
              <h4 className="card-tittle text-center">Comentarios</h4>
              <div className="row">
                <div className="card-text text-center">[Comentarios realizados]</div>
              </div>
              <div className="row">
                <input className="col-8" />
                <button className="btn btn-success col-4">Comentar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

