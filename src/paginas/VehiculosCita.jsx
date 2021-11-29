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
    };
  };

  buscarCitas() {
    if(this.state.placa === '') {
      this.setState({error: 'Debe de ingresar una placa'});
      return;
    }

    const cita = {
      'placa': this.state.placa,
      'servicio': document.getElementById('servicio-vehiculo').value,
    };

    console.log('Buscando citas para:');
    console.log(cita);
    const citas = [
      {asignado: true, fecha: new Date(2021, 12, 2), mecanico: 'L',},
      {asignado: false, fecha: new Date(2021, 12, 2), mecanico: 'Usuario',},
      {asignado: false, fecha: new Date(2021, 12, 5), mecanico: 'Juleka',},
      {asignado: false, fecha: new Date(2021, 12, 6), mecanico: 'Usuario',},
      {asignado: false, fecha: new Date(2021, 12, 6), mecanico: 'Kido',},
    ];
    this.setState({citas: citas, error: null, busqueda: true});
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
      'servicio': document.getElementById('servicio-vehiculo').value,
      'asignados': {},
    };

    let citasConfirmadas = [];
    for(const cita of this.state.citas)
      if(cita.asignado)
        citasConfirmadas.push(cita);

    citas.asignados = citasConfirmadas;

    console.log('Cita reservada para:');
    console.log(citas);

    this.setState({error: null, busqueda: false, citas: []});
  }

  render() {
    return (
      <section className="container mt-3">
        <div className="container col-10 backgroundNav">
          <HeaderInfo titulo="Programar/Cancelar citas" usuarioNombre={this.props.usuario.nombre} usuarioImagen={this.props.usuario.img} />
          <MensajeError error={this.state.error} />
          <div className="row">
            <InputText classInput="col-3" id="placa-vehiculo" label="Placa" classLabel="col-2" obtenerInfo={(dato) => this.setState({placa: dato})} />
            <InputList classInput="col-3" id="servicio-vehiculo" label="Servicio" classLabel="col-2" opciones={['revisión-de-frenos', 'pastillas', 'alineación', 'rotación-de-llantas',]} />
            <button className="btn btn-success col-2" onClick={() => this.buscarCitas()}>Buscar</button>
          </div>
          <hr />
          <div className="row">
            <div className="col-4">
              <h4>Asignado</h4>
            </div>
            <div className="col-4">
              <h4>Fecha</h4>
            </div>
            <div className="col-4">
              <h4>Mecánico</h4>
            </div>
          </div>
          {this.state.citas.map((cita, index) =>
            <div key={index} className="row">
              <div className="col-4">
                <input type="checkbox" id={index} checked={cita.asignado} onChange={() => this.actualizarAsignacion(index)} />
              </div>
              <div className="col-4">
                <label htmlFor={index}>{cita.fecha.toString()}</label>
              </div>
              <div className="col-4">
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

