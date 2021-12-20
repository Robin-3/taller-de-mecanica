import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';
import MensajeError from '../componentes/MensajeError';
import InputText from '../componentes/InputText';
import InputList from '../componentes/InputList';

export default class VehiculosCita extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placa: '',
      citas: [],
      error: null,
      busqueda: false,
      servicios: [],
      servicio: 0,
      servicioDescripcion: [],
      servicioCosto: [],
      servicioDuracion: [],
    };
  };

  cargarServicio(servicio) {
    const servicioIndex = this.state.servicios.indexOf(servicio);

    this.setState({servicio: servicioIndex});
  };

  buscarCitas() {
    if(this.state.servicios.length === 0) {
      this.setState({error: 'No hay servicios disponibles, intente más tarde.'});
      return;
    }

    if(this.state.placa === '') {
      this.setState({error: 'Debe de ingresar una placa'});
      return;
    }

    let citas = [[], []];

    for(const servicio of this.props.datos[this.state.servicio].servicios) {
      for(const hora of servicio.horas) {
        if(hora.asignacion === this.state.placa.toUpperCase())
          citas[0].push({asignado: true, fecha: hora.hora, mecanico: servicio.mecanico, id: servicio.id, reparado: hora.reparado});
        else if(hora.asignacion === '')
          citas[1].push({asignado: false, fecha: hora.hora, mecanico: servicio.mecanico, id: servicio.id, reparado: hora.reparado});
      }
    }

    citas[0].sort((a, b) => a.fecha > b.fecha? 1: -1);
    citas[1].sort((a, b) => a.fecha > b.fecha? 1: -1);

    this.setState({citas: citas[0].concat(citas[1]), error: null, busqueda: true});
  };

  actualizarAsignacion(index) {
    let actualizacion = this.state.citas.slice();
    actualizacion[index].asignado = !actualizacion[index].asignado;

    this.setState({citas: actualizacion});
  };

  guardarCambios() {
    if(this.state.placa === '') {
      this.setState({error: 'Debe de ingresar una placa'});
      return;
    }

    if(!this.state.busqueda) {
      this.setState({error: 'Realiza la búsqueda del servicio'});
      return;
    }

    const citas = {
      'placa': this.state.placa,
      'servicio': this.props.datos[this.state.servicio].servicioDB,
      'asignados': [],
    };

    let citasConfirmadas = [];

    for(const cita of this.state.citas)
      if(cita.asignado)
        citasConfirmadas.push({fecha: cita.fecha, mecanico: cita.id, reparado: cita.reparado});

    citas.asignados = citasConfirmadas;

    this.props.actualizarAsignaciones(citas);

    this.setState({error: null, busqueda: false, citas: []});
  }

  generarOpciones() {
    let servicios = [];
    let servicioCosto = [];
    let servicioDescripcion = [];
    let servicioDuracion = [];
    for(const dato of this.props.datos) {
      servicios.push(dato.nombre);
      servicioCosto.push(dato.costo);
      servicioDescripcion.push(dato.descripcion);
      servicioDuracion.push(dato.duracion);
    }
    this.setState({servicios, servicioCosto, servicioDescripcion, servicioDuracion});
  }

  render() {
    if(this.props.datos.length > 0)
      if(this.state.servicios.length === 0)
        this.generarOpciones();

    return (
      <section className="container mt-3">
        <div className="container col-10 backgroundNav">
          <HeaderInfo titulo="Programar/Cancelar citas" usuarioNombre={this.props.usuario.nombre} usuarioImagen={this.props.usuario.img} />
          <MensajeError error={this.state.error} />
          <div className="row">
            <InputText classInput="col-3" id="placa-vehiculo" label="Placa" classLabel="col-2" obtenerInfo={(dato) => this.setState({placa: dato})} />
            <InputList classInput="col-3" id="servicio-vehiculo" label="Servicio" classLabel="col-2" opciones={this.state.servicios} obtenerInfo={(dato) => this.cargarServicio(dato)} />
            <button className="btn btn-success col-2" onClick={() => this.buscarCitas()}>Buscar</button>
          </div>
          <div className="row">
            <div className="col">{this.state.servicioDescripcion[this.state.servicio]}</div>
            <div className="col-md-auto">{new Intl.NumberFormat("es-CO", {style: "currency", currency: "COP"}).format(this.state.servicioCosto[this.state.servicio])}</div>
            <div className="col-md-auto">{this.state.servicioDuracion[this.state.servicio]}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-2">
              <h4>Asignado</h4>
            </div>
            <div className="col-5">
              <h4>Fecha</h4>
            </div>
            <div className="col-5">
              <h4>Mecánico</h4>
            </div>
          </div>
          {this.state.citas.map((cita, index) =>
            <div key={index} className="row border-top border-bottom">
              <div className="col-2 align-self-center">
                <input type="checkbox" id={index} checked={cita.asignado} onChange={() => this.actualizarAsignacion(index)} />
              </div>
              <div className="col-5 align-self-center">
                <label htmlFor={index}>{(new Date(cita.fecha)).toUTCString()}</label>
              </div>
              <div className="col-5 align-self-center">
                <label htmlFor={index}>{cita.mecanico}</label>
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

