import React from 'react';
import InputText from '../componentes/InputText.jsx';

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
    };
  };

  render() {
    return (
      <section className="container mt-3">
        <div className="container col-10 backgroundNav">
          <div className="row align-items-center mb-3">
            <h2 className="text-success col">Registro de vehículos</h2>
            <div className="col-md-auto">{this.props.usuario.nombre}</div>
            <div className="col-md-auto">{this.props.usuario.img}</div>
          </div>
          <form action="" method="post" encType="multipart/form-data">
            <div className="row">
              <InputText classInput="col-8" id="placa-vehiculo" label="Placa" classLabel="col-2" obtenerInfo={(dato) => this.setState({placa: dato})} />
              <button className="btn btn-success col-2">Eliminar</button>
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
                <input type="submit" className="btn btn-success" value="Crear/Editar Vehículo" />
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  };
};

