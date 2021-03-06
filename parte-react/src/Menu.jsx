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
            {(props.rol === 'planta' || props.rol === 'administrador')?
              <React.Fragment>
                <li onClick={() => props.cargarPagina('dashboard')} className="btn btn-success w-100" style={{margin:'1px 2px',}}>DASHBOARD</li>
                <li>
                  <div className="btn-group dropend w-100" role="group">
                    <button className="btn btn-success dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false" style={{margin:'11px 2px',}}>VEHÍCULOS</button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={() => props.cargarPagina('vehiculosRegistro')}>REGISTRO</li>
                      <li className="dropdown-item" onClick={() => props.cargarPagina('vehiculosCita')}>CITA</li>
                      <li className="dropdown-item" onClick={() => props.cargarPagina('vehiculosAgenda')}>AGENDA</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="btn-group dropend w-100" role="group" style = {{margin:'1px 2px'}}>
                    <button className="btn btn-success dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">SERVICIOS</button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={() => props.cargarPagina('serviciosConfigurar')}>CONFIGURAR</li>
                      <li className="dropdown-item" onClick={() => props.cargarPagina('serviciosAsignar')}>ASIGNAR</li>
                    </ul>
                  </div>
                </li>
              </React.Fragment>:
              <React.Fragment></React.Fragment>
            }
            {(props.rol === 'mecánico' || props.rol === 'administrador')?
              <li className="btn btn-success w-100" onClick={() => props.cargarPagina('listadoAsignaciones')} style={{margin:'11px 2px',}} >LISTADO DE ASIGNACIONES</li>:
              <React.Fragment></React.Fragment>
            }
            {(props.rol === 'administrador')?
              <li className="btn btn-success w-100" onClick={() => props.cargarPagina('usuarios')} style={{margin:'1px 2px',}}>USUARIOS</li>:
              <React.Fragment></React.Fragment>
            }
            <li className="btn btn-success w-100" onClick={() => props.cerrarSesion()} style = {{margin:'11px 2px'}}>CERRAR SESIÓN</li>
          </ul>
        </div>
        <div className="container col-9 backgroundNav" style={{marginLeft: '20px', marginBottom: '20px', textAlign: 'center',}}>{props.actual}</div>
      </div>
    </div>
  );
};

