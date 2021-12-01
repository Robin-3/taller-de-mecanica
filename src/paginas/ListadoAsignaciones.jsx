import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';


export default function ListadoAsignaciones(props) {
  return (
    <section className="container mt-3" style={{margin:'100px 2px'}}>
      <div className="container col-10 backgroundNav">
        <HeaderInfo titulo="Listado de asignaciones" usuarioNombre={props.usuario.nombre} usuarioImagen={props.usuario.img} />
        <div className="row">
          <div className="col-4">
            <h4>Servicio</h4>
          </div>
          <div className="col-4">
            <h4>Fecha/Hora</h4>
          </div>
          <div className="col-4">
            <h4>Estado</h4>
          </div>
        </div>
        <br />
        {props.asignaciones.map((item, index) =>
          <div key={index} className="row border-top border-bottom" onClick={() => props.cargarSubpagina('estadoVehiculo')}>
            <div className="col-4 align-self-center">
              {item.servicio}
            </div>
            <div className="col-4 align-self-center">
              {item.fecha.toString()}
            </div>
            <div className="col-4 align-self-center">
              {item.estado}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

