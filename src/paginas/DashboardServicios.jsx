import React from 'react';

export default function DashboardServicios(props) {
  return (
    <section className="container mt-3">
      <div className="container col-10 backgroundNav">
        <div className="row align-items-center mb-3">
          <h2 className="text-success col">Servicios completados</h2>
          <div className="col-md-auto">{props.usuario.nombre}</div>
          <div className="col-md-auto">{props.usuario.img}</div>
        </div>
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
}

