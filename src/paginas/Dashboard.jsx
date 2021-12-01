import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';

export default function Dashboard(props) {
  return (
    <section className="container mt-3">
      <div className="container col-10 backgroundNav">
        <HeaderInfo titulo="Dashboard" usuarioNombre={props.usuario.nombre} usuarioImagen={props.usuario.img} />
        <div className="row">
          <div className="card col-6">
            <div className="card-body">
              <h4 className="card-tittle text-center">{'Servicio'+(props.mas.length===1? '': 's')+' más utilizado'+(props.mas.length===1? '': 's')}</h4>
              <div className="card-text text-center">{props.mas.join(', ')}</div>
            </div>
          </div>
          <div className="card col-6">
            <div className="card-body">
              <h4 className="card-tittle text-center">{'Servicio'+(props.menos.length===1? '': 's')+' menos utilizado'+(props.menos.length===1? '': 's')}</h4>
              <div className="card-text text-center">{props.menos.join(', ')}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card col-6">
            <div className="card-body">
              <h4 className="card-tittle text-center" onClick={() => props.cargarSubpagina('dashboardMecanicos')} style={{cursor: 'pointer'}}>Listado de mecánicos y sus asignaciones por día</h4>
            </div>
          </div>
          <div className="card col-6">
            <div className="card-body">
              <h4 className="card-tittle text-center" onClick={() => props.cargarSubpagina('dashboardServicios')} style={{cursor: 'pointer'}}>Servicios completados</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

