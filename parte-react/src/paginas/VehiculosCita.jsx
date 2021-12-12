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
      servicios: ['revisión-de-frenos', 'pastillas', 'alineación', 'rotación-de-llantas',],
      servicio: 0,
      servicioDescripcion: ['Es una técnica de conducción deportiva que hace más eficaz la frenada, además de evitar el desgaste y el sobrecalentamiento del sistema de frenos.', 'El promedio de duración de las pastillas es de 75.000 km dependiendo del uso y la marca, a estos dos factores hay que agregarle otras variables como el tipo de material (orgánico, semimetálico, metálico, sintético) o el modelo de vehículo.', 'En términos simples, la alineación de un vehículo es un proceso que permite ajustar los ángulos de las ruedas, manteniéndolas perpendiculares al suelo y paralelas entre sí.', 'A grandes rasgos la rotación de llantas hace referencia al tener que intercambiar la posición de las ruedas para asegurar que su desgaste sea uniforme, lo que propicia que la vida útil de las mismas se prolongue.',],
      servicioCosto: ['8000', '35000', '40000', '5000',],
      servicioDuracion: ['10 min', '30 min', '55 min', '5 min',],
    };
  };

  cargarServicio(servicio) {
    const servicioIndex = this.state.servicios.indexOf(servicio);

    this.setState({servicio: servicioIndex});
  };

  buscarCitas() {
    if(this.state.placa === '') {
      this.setState({error: 'Debe de ingresar una placa'});
      return;
    }

    const cita = {
      'placa': this.state.placa,
      'servicio': this.state.servicios[this.state.servicio],
    };

    console.log('Buscando citas para:', cita);

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
      'servicio': this.state.servicios[this.state.servicio],
      'asignados': [],
    };

    let citasConfirmadas = [];

    for(const cita of this.state.citas)
      if(cita.asignado)
        citasConfirmadas.push(cita.fecha);

    citas.asignados = citasConfirmadas;

    console.log('Cita reservada para: ', citas);

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
            <div key={index} className="row border-top border-bottom">
              <div className="col-4 align-self-center">
                <input type="checkbox" id={index} checked={cita.asignado} onChange={() => this.actualizarAsignacion(index)} />
              </div>
              <div className="col-4 align-self-center">
                <label htmlFor={index}>{cita.fecha.toString()}</label>
              </div>
              <div className="col-4 align-self-center">
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

