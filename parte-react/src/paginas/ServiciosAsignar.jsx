import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';
import MensajeError from '../componentes/MensajeError';
import InputList from '../componentes/InputList';

export default class ServiciosAsignar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servicios: [],
      error: null,
      busqueda: false,
      mecanico: '',
    };
  };

  buscarServicios() {
    if(this.props.servicios.length === 0) {
      this.setState({error: 'No existen mecánicos'});
      return;
    }

    let mecanico;
    if(this.state.mecanico === '')
      mecanico = this.props.servicios[0].mecanico;
    else
      mecanico = this.state.mecanico.split(':')[0];
    mecanico = parseInt(mecanico);

    for(const m of this.props.servicios)
      if(m.mecanico === mecanico) {
        mecanico = m;
        break;
      }

    const serviciosDisponibles = [
      'Revisión de frenos',
      'Pastillas',
      'Discos',
      'Suspensión',
      'Amortiguadores',
      'Cambio de aceite',
      'Alineación',
      'Rotación de llantas',
    ];

    let servicios = [];

    for(const s of serviciosDisponibles) {
      let asignado = false;
      for(const ser of mecanico.servicios)
        if(ser.nombre === s) {
          asignado = true;
          break;
        }
      const ser = {};
      ser.servicio = s;
      ser.asignado = asignado;
      servicios.push(ser);
    }

    this.setState({servicios: servicios, error: null, busqueda: true});
  };

  actualizarAsignacion(index) {
    let actualizacion = this.state.servicios.slice();
    actualizacion[index].asignado = !actualizacion[index].asignado;

    this.setState({servicios: actualizacion});
  };

  guardarCambios() {
    if(!this.state.busqueda) {
      this.setState({error: 'Realiza la búsqueda del mecánico'});
      return;
    }

    let mecanico;
    if(this.state.mecanico === '')
      mecanico = this.props.servicios[0].mecanico;
    else
      mecanico = this.state.mecanico.split(':')[0];
    mecanico = parseInt(mecanico);

    for(const m of this.props.servicios)
      if(m.mecanico === mecanico) {
        mecanico = m;
        break;
      }

    const servicios = {
      'mecanico': mecanico.mecanico,
      'asignados': [],
    };

    let serviciosConfirmados = [];

    const serviciosDisponibles = {
      'Revisión de frenos': 'frenos',
      'Pastillas': 'pastillas',
      'Discos': 'discos',
      'Suspensión': 'suspension',
      'Amortiguadores': 'amortiguadores',
      'Cambio de aceite': 'aceite',
      'Alineación': 'alineacion',
      'Rotación de llantas': 'rotacion',
    };

    for(const servicio of this.state.servicios)
      if(servicio.asignado)
        serviciosConfirmados.push(serviciosDisponibles[servicio.servicio]);
    servicios.asignados = serviciosConfirmados;

    this.props.reasignacionServicios(servicios);

    this.setState({error: null, busqueda: false, servicios: []});
  }

  render() {
    return (
      <section className="container mt-3">
        <div className="container col-10 backgroundNav">
          <HeaderInfo titulo="Asignar servicios" usuarioNombre={this.props.usuario.nombre} usuarioImagen={this.props.usuario.img} />
          <MensajeError error={this.state.error} />
          <div className="row">
            <InputList classInput="col-6" id="id-usuario" label="Mecánico" classLabel="col-3" opciones={this.props.servicios.map((mecanico) => mecanico.mecanico+":"+mecanico.nombre)} obtenerInfo={(dato) => this.setState({mecanico: dato})} />
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

