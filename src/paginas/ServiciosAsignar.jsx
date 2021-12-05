import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';
import MensajeError from '../componentes/MensajeError';
import InputText from '../componentes/InputText';

export default class ServiciosAsignar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identificacion: '',
      servicios: [],
      error: null,
      busqueda: false,
    };
  };

  buscarServicios() {
    if(this.state.identificacion === '') {
      this.setState({error: 'Debe de ingresar una identificación'});
      return;
    }

    console.log('Buscando servicios para:', this.state.identificacion);

    const servicios = [
      {asignado: true, servicio: 'Revisión de frenos',},
      {asignado: false, servicio: 'Pastillas',},
      {asignado: true, servicio: 'Discos',},
      {asignado: false, servicio: 'Suspensión',},
      {asignado: false, servicio: 'Amortiguadores',},
      {asignado: false, servicio: 'Cambio de aceite',},
      {asignado: false, servicio: 'Alineación',},
      {asignado: true, servicio: 'Rotación de llantas',},
    ];

    this.setState({servicios: servicios, error: null, busqueda: true});
  };

  actualizarAsignacion(index) {
    let actualizacion = this.state.servicios.slice();
    actualizacion[index].asignado = !actualizacion[index].asignado;

    this.setState({servicios: actualizacion});
  };

  guardarCambios() {
    if(this.state.identificacion === '') {
      this.setState({error: 'Debe de ingresar una identificación'});
      return;
    }
    if(!this.state.busqueda) {
      this.setState({error: 'Realiza la búsqueda del mecánico'});
      return;
    }

    const servicios = {
      'identificacion': this.state.identificacion,
      'asignados': [],
    };

    let serviciosConfirmados = [];

    for(const servicio of this.state.servicios)
      if(servicio.asignado)
        serviciosConfirmados.push(servicio.servicio);

    servicios.asignados = serviciosConfirmados;

    console.log('Servicios asignados: ', servicios);

    this.setState({error: null, busqueda: false, servicios: []});
  }

  render() {
    return (
      <section className="container mt-3">
        <div className="container col-10 backgroundNav">
          <HeaderInfo titulo="Asignar servicios" usuarioNombre={this.props.usuario.nombre} usuarioImagen={this.props.usuario.img} />
          <MensajeError error={this.state.error} />
          <div className="row">
            <InputText classInput="col-6" id="placa-vehiculo" label="Identifiación del mecánico" classLabel="col-3" obtenerInfo={(dato) => this.setState({identificacion: dato})} />
            <button className="btn btn-success col-3" onClick={() => this.buscarServicios()}>Buscar</button>
          </div>
          <hr />
          <div className="row">
            <div className="col-4">
              <h4>Asignado</h4>
            </div>
            <div className="col-8">
              <h4>Servicio</h4>
            </div>
          </div>
          {this.state.servicios.map((servicio, index) =>
            <div key={index} className="row border-top border-bottom">
              <div className="col-4 align-self-center">
                <input type="checkbox" id={index} checked={servicio.asignado} onChange={() => this.actualizarAsignacion(index)} />
              </div>
              <div className="col-8 align-self-center">
                <label htmlFor={index}>{servicio.servicio}</label>
              </div>
            </div>
          )}
          <div className="row">
            <div className="text-center">
              <button className="btn btn-success" onClick={() => this.guardarCambios()}>Guardar</button>
            </div>
          </div>
        </div>
      </section>
    );
  };
};

