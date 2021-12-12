import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';

export default function DashboardMecanicos(props) {
  return (
    <section className="container mt-3">
      <div className="container col-10 backgroundNav">
        <HeaderInfo titulo="Listado de mecánicos y sus asignaciones por día" usuarioNombre={props.usuario.nombre} usuarioImagen={props.usuario.img} />
        {props.mecanicos.map((filaMecanicos, index) =>
          <div key={index} className="row">
            {filaMecanicos.map((mecanico) =>
              <div key={mecanico.id} className="col">
                <div className="card bg-success">
                  <div className="row">
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {Object.keys(mecanico.servicios).map((servicio) =>
                          <li key={mecanico.id+'-'+servicio} className="list-group-item bg-success">{servicio+': '+mecanico.servicios[servicio]}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="row bg-white mx-2 mb-1">
                    {mecanico.img}
                    <div className="col card-title text-center">{mecanico.nombre}</div>
                  </div>
                </div>
              </div>)
            }
          </div>
        )}
      </div>
    </section>
  );
};

