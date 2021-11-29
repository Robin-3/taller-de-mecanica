import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';
import MensajeError from '../componentes/MensajeError';
import InputText from '../componentes/InputText';

export default class VehiculosRegistro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placa: '',
      modelo: '',
      marca: '',
      combustible: '',
      transmision: '',
      motor: '',
      imagen: {},
      error: null,
    };
  };

  eliminarVehiculo() {
    if(this.state.placa === '') {
      this.setState({error: 'Debe de ingresar una placa'});
      return;
    }

    const vehiculo = {
      placa: this.state.placa,
    };

    console.log('Eliminando vehículo:');
    console.log(vehiculo);

    this.setState({error: null});
  };

  actualizarVehiculo() {
    if(this.state.placa === '') {
      this.setState({error: 'Debe de ingresar una placa'});
      return;
    }

    const vehiculo = (({error, ...vehiculo}) => vehiculo)(this.state);

    console.log('Actualizando vehículo:');
    console.log(vehiculo);

    this.setState({error: null});
  };

  render() {
    return (
      <section className="container mt-3">
        <div className="container col-10 backgroundNav">
          <HeaderInfo titulo="Registro de vehículos" usuarioNombre={this.props.usuario.nombre} usuarioImagen={this.props.usuario.img} />
          <MensajeError error={this.state.error} />
          <div className="row">
            <InputText classInput="col-8" id="placa-vehiculo" label="Placa" classLabel="col-2" obtenerInfo={(dato) => this.setState({placa: dato})} />
            <button className="btn btn-success col-2" onClick={() => this.eliminarVehiculo()}>Eliminar</button>
          </div>
          <div className="row">
            <InputText type="number" classInput="col-4" id="modelo-vehiculo" label="Modelo" classLabel="col-2" obtenerInfo={(dato) => this.setState({modelo: dato})} />
            <InputText classInput="col-4" id="marca-vehiculo" label="Marca" classLabel="col-2" obtenerInfo={(dato) => this.setState({marca: dato})} />
          </div>
          <div className="row">
            <InputText classInput="col-4" id="combustible-vehiculo" label="Combustible" classLabel="col-2" obtenerInfo={(dato) => this.setState({combustible: dato})} />
            <InputText classInput="col-4" id="transmision-vehiculo" label="Transmisión" classLabel="col-2" obtenerInfo={(dato) => this.setState({transmision: dato})} />
          </div>
          <div className="row">
            <InputText classInput="col-4" id="motor-vehiculo" label="Motor" classLabel="col-2" obtenerInfo={(dato) => this.setState({motor: dato})} />
            <label htmlFor="imagen-vehiculo" className="col-2">Imagen</label>
            <div className="col-4">
              <input type="file" className="form-control-file" accept="image/*" id="imagen-vehiculo" onChange={(e) => this.setState({imagen: e.target.files[0]})} />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="text-center">
              <button className="btn btn-success" onClick={() => this.actualizarVehiculo()}>Crear/Editar Vehículo</button>
            </div>
          </div>
        </div>
      </section>
    );
  };
};

