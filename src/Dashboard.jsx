import React, {Fragment} from 'react';

export default function Dashboard() {
  return (
    <Fragment>
      <div className="row">
        <h2 className="col-8">Dashboard</h2>
        <p className="col-2">Usuario</p>
        <img className="col-2" src={process.env.PUBLIC_URL + '/img/usuarios/usuario.jpg'} style={{height: '60px', width: 'auto', margin: 'auto'}} />
      </div>
      <div className="container col-10 backgroundNav">
        <div className="row">
          <div className="card col-6">
            <div className="card-body">
              <h5 className="card-tittle text-center">Servicio más utilizado</h5>
              <p className="card-text text-center">[servicio]</p>
            </div>
          </div>
          <div className="card col-6">
            <div className="card-body">
              <h5 className="card-tittle text-center">Servicio menos utilizado</h5>
              <p className="card-text text-center">[servicio]</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card col-6">
            <div className="card-body">
              <h5 className="card-tittle text-center">Listado de mecánicos y sus asignaciones por día</h5>
            </div>
          </div>
          <div className="card col-6">
            <div className="card-body">
              <h5 className="card-tittle text-center">Servicios completados</h5>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

