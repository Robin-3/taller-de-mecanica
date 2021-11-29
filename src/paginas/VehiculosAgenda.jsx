import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';

export default function VehiculosAgenda(props) {
  return (
    <section className="container mt-3">
      <div className="container col-10 backgroundNav">
        <HeaderInfo titulo="Ver agenda" usuarioNombre={props.usuario.nombre} usuarioImagen={props.usuario.img} />
        <div className="row">
          <div className="col-4">
            <h4>Fecha</h4>
          </div>
          <div className="col-4">
            <h4>Servicio</h4>
          </div>
          <div className="col-4">
            <h4>Mecánico</h4>
          </div>
        </div>
        {props.agenda.map((item, index) =>
          <div key={index} className="row">
            <div className="col-4">
              {item.fecha.toString()}
            </div>
            <div className="col-4">
              {item.servicio}
            </div>
            <div className="col-4">
              {item.mecanico}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

