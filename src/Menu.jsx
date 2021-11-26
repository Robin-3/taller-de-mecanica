import React from 'react';

export default function Menu(props) {
  return (
    <div className="w-100" style={{backgroundColor: '#8c8c8c',}}>
      <div className="row align-items-start w-100">
        <div className="container col-2 sticky-top backgroundNav" style={{marginLeft: '20px', paddingBottom: '20px',}}>
          <br />
          <img className="img-fluid" src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Taller de mecánica" onClick={() => props.cargarPagina('bienvenida')} />
          <br />
          <br />
          <ul className="list-group">
            <li onClick={() => props.cargarPagina('dashboard')} className=" btn btn-success w-100">DASHBOARD</li>
            <li>
              <div className="btn-group dropend w-100" role="group">
                <button className="btn btn-success dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">VEHÍCULOS</button>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => props.cargarPagina('vehiculosRegistro')}>REGISTRO</li>
                  <li className="dropdown-item">CITA</li>
                  <li className="dropdown-item">AGENDA</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="btn-group dropend w-100" role="group">
                <button className="btn btn-success dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">SERVICIOS</button>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">CONFIGURAR</li>
                  <li className="dropdown-item">ASIGNAR</li>
                </ul>
              </div>
            </li>
            <li className="btn btn-success w-100">LISTADO DE ASIGNACIONES</li>
            <li className="btn btn-success w-100">USUARIOS</li>
            <li className="btn btn-success w-100">CERRAR SESIÓN</li>
          </ul>
        </div>
        <div className="container col-9 backgroundNav" style={{marginLeft: '20px', marginBottom: '20px', textAlign: 'center',}}>{props.actual}</div>
      </div>
    </div>
  );
}

