import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';
import InputText from '../componentes/InputText';

export default class ServiciosConfigurar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  configurarServicio(servicio, caracteristica, dato) {
    console.log('Configurando el servicio: '+servicio+'\nLa característica "'+caracteristica+'" se le ha asignado el valor: '+dato);

    for(const filaServicio of this.props.servicios)
      for(const servicioBusqueda of filaServicio)
        if(servicioBusqueda.nombre === servicio) {
          const servicioModificado = servicioBusqueda;
          servicioModificado[caracteristica] = dato;
          this.props.configurarServicio(servicioModificado);
        }
  };

  render() {
    return (
      <section className="container mt-3">
        <HeaderInfo titulo="Configurar servicios" usuarioNombre={this.props.usuario.nombre} usuarioImagen={this.props.usuario.img} />
        {this.props.servicios.map((filaServicio, index) =>
          <div key={index} className="row">
            {filaServicio.map((servicio) =>
              <div key={servicio.nombre} className="col">
                <div className="card bg-success my-2">
                  <div className="row bg-white mx-2 my-1">{servicio.nombre}</div>
                  <div className="row mx-2">
                    <InputText type="tex" classInput="col-8" id={'descripción-'+servicio.nombre+'-servicio'} label="Descripción" classLabel="col-4" obtenerInfo={(dato) => this.configurarServicio(servicio.nombre, 'descripcion', dato)} defecto={servicio.descripcion} />
                  </div>
                  <div className="row mx-2">
                    <InputText type="number" classInput="col-8" id={'duración-'+servicio.nombre+'-servicio'} label="Duración (min)" classLabel="col-4" obtenerInfo={(dato) => this.configurarServicio(servicio.nombre, 'duracion', dato)} defecto={servicio.duracion} />
                  </div>
                  <div className="row mx-2">
                    <InputText type="number" classInput="col-8" id={'costo-'+servicio.nombre+'-servicio'} label="Costo" classLabel="col-4" obtenerInfo={(dato) => this.configurarServicio(servicio.nombre, 'costo', dato)} defecto={servicio.costo} />
                  </div>
                  <div className="row mx-2">
                    <input type="checkbox" id={'disponibilidad-'+servicio.nombre+'-servicio'} checked={servicio.disponible} onChange={(e) => this.configurarServicio(servicio.nombre, 'disponible', e.target.checked)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    );
  };
};

