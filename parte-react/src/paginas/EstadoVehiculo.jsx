import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';

export default class EstadoVehiculo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: '',
    };
  };

  cambioEstadoServicio(servicio) {
    if(servicio.seleccionado) {
      servicio.reparado = !servicio.reparado;
      this.props.cambiarEstadoServicio(servicio);
    }
  };

  render() {
    return (
      <section className="container mt-3" style={{margin:'100px 2px',}}>
        <div className="container col-10 backgroundNav">
          <HeaderInfo titulo="Estado del vehiculo" usuarioNombre={this.props.usuario.nombre} usuarioImagen={this.props.usuario.img} />
          <div className="row">
            <div className="card col-4">
              <div className="card-body" >
                <h4 className="card-tittle text-center">Información</h4>
                <div className="card-text text-center">
                  <div className="col">
                    <div className="row">
                      <img className="img-fluid" src={this.props.vehiculo.imagen} alt={this.props.vehiculo.placa} />
                    </div>
                    <div className="row">
                      <p>Placa: {this.props.vehiculo.placa}</p>
                    </div>
                    <div className="row">
                      <p>Modelo: {this.props.vehiculo.modelo}</p>
                    </div>
                    <div className="row">
                      <p>Marca: {this.props.vehiculo.marca}</p>
                    </div>
                    <div className="row">
                      <p>Combustible: {this.props.vehiculo.combustible}</p>
                    </div>
                    <div className="row">
                      <p>Motor: {this.props.vehiculo.motor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card col-4">
              <div className="card-body">
                <h4 className="card-tittle text-center">Servicios</h4>
                <div className="card-text text-center">
                  {this.props.vehiculo.asignacion.map((servicio, index) =>
                    <div key={index} className="row">
                      <div className="col-md-auto">
                        <input type="checkbox" id={index} onChange={() => this.cambioEstadoServicio(servicio)} checked={servicio.reparado} />
                      </div>
                      <div className="col">
                        <label htmlFor={index}>{servicio.servicio}:{servicio.usuario}:{(new Date(servicio.fecha)).toUTCString()}</label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card col-4">
              <div className="card-body">
                <h4 className="card-tittle text-center">Comentarios</h4>
                <div className="row">
                  <textarea value={this.props.vehiculo.comentarios.map((val) => (new Date(val.hora)).toUTCString() + ':' + val.mecanico + ': ' + val.mensaje).join('\n')} rows="10" className="form-control bg-white" readOnly />
                </div>
                <div className="row">
                  <input className="col" onChange={(e) => this.setState({comentario: e.target.value})} value={this.state.comentario} />
                  <button className="btn btn-success col-md-auto" onClick={() => this.props.nuevoComentario({comentario: this.state.comentario, hora: new Date(Date.now()), vehiculo: this.props.vehiculo.placa})}>⌅</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
};

