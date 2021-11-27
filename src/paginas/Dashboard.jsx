import React from 'react';

export default function Dashboard(props) {
  return (
    <section className="container mt-3">
      <div className="container col-10 backgroundNav">
        <div className="row align-items-center mb-3">
          <h2 className="text-success col">Dashboard</h2>
          <div className="col-md-auto">{props.usuario.nombre}</div>
          <div className="col-md-auto">{props.usuario.img}</div>
        </div>
        <div className="row">
          <div className="card col-6">
            <div className="card-body">
              <h4 className="card-tittle text-center">Servicio más utilizado</h4>
              <div className="card-text text-center">[servicio]</div>
            </div>
          </div>
          <div className="card col-6">
            <div className="card-body">
              <h4 className="card-tittle text-center">Servicio menos utilizado</h4>
              <div className="card-text text-center">[servicio]</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card col-6">
            <div className="card-body">
              <h4 className="card-tittle text-center">Listado de mecánicos y sus asignaciones por día</h4>
            </div>
          </div>
          <div className="card col-6">
            <div className="card-body">
              <h4 className="card-tittle text-center">Servicios completados</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

