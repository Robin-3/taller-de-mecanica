import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';

export default function DashboardServicios(props) {
  return (
    <section className="container mt-3">
      <div className="container col-10 backgroundNav">
        <HeaderInfo titulo="Servicios completados" usuarioNombre={props.usuario.nombre} usuarioImagen={props.usuario.img} />
        <div className="row">
          <ul className="list-group list-group-flush">
            {Object.keys(props.servicios).map((servicio) =>
              <li key={servicio} className="list-group-item">{servicio+': '+props.servicios[servicio]}</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

