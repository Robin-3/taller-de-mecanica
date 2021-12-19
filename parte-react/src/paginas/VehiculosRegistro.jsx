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

    this.props.actualizarVehiculo(true, {placa: this.state.placa});

    this.setState({error: null});
  };

  actualizarVehiculo() {
    if(this.state.placa === '') {
      this.setState({error: 'Debe de ingresar una placa'});
      return;
    }

    /*if(this.state.imagen !== {}) {
      const imagen = this.state.imagen.name.split('.');
      fs.writeFile(process.env.PUBLIC_URL + '/img/vehiculos' + this.state.placa + '.' + imagen[imagen.length - 1], this.state.imagen);
    }*/
    const vehiculo = (({error, ...vehiculo}) => vehiculo)(this.state);
    try {
      const imagen = this.state.imagen.name.split('.');
      vehiculo.imagen = '.' + imagen[imagen.length - 1];
    } catch {
      vehiculo.imagen = '';
    }
    this.props.actualizarVehiculo(false, vehiculo);

    this.setState({error: null});
  };

  imagenUpload(e) {
    const imagen = e.target.files[0];
    /*this.getBase64(imagen).then(base64 => {
      const element = document.createElement("a");
      const file = new Blob([base64], {type: imagen.type});
      element.href = URL.createObjectURL(file);
      const ext = this.state.imagen.name.split('.');
      const filename = this.state.placa + '.' + ext[ext.length - 1];
      element.download = filename;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      element.remove();
      //localStorage["fileBase64"] = base64;
      console.log("file stored");
    });*/
    this.setState({imagen: imagen});
  }

  /*getBase64(file) {
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }*/

  render() {
    return (
      <section className="container mt-3">
        <div className="container col-11 backgroundNav" >
          <HeaderInfo titulo="Registro de vehículos" usuarioNombre={this.props.usuario.nombre} usuarioImagen={this.props.usuario.img} />
          <MensajeError error={this.state.error} />
          <div className="row" style={{margin:'10px 2px'}}>
            <InputText classInput="col-7" id="placa-vehiculo" label="Placa" classLabel="col-2" obtenerInfo={(dato) => this.setState({placa: dato})} />
            <button className="btn btn-success col-2" onClick={() => this.eliminarVehiculo()} style={{marginLeft:'10px'}}>Eliminar</button>
          </div>
          <div className="row" style={{margin:'10px 2px'}}>
            <InputText type="number" classInput="col-4" id="modelo-vehiculo" label="Modelo" classLabel="col-2" obtenerInfo={(dato) => this.setState({modelo: dato})} />
            <InputText classInput="col-4" id="marca-vehiculo" label="Marca" classLabel="col-2" obtenerInfo={(dato) => this.setState({marca: dato})} />
          </div>
          <div className="row" style={{margin:'10px 2px'}}>
            <InputText classInput="col-4" id="combustible-vehiculo" label="Combustible" classLabel="col-2" obtenerInfo={(dato) => this.setState({combustible: dato})} />
            <InputText classInput="col-4" id="transmision-vehiculo" label="Transmisión" classLabel="col-2" obtenerInfo={(dato) => this.setState({transmision: dato})} />
          </div>
          <div className="row" style={{margin:'0px 2px'}}>
            <InputText classInput="col-4" id="motor-vehiculo" label="Motor" classLabel="col-2" obtenerInfo={(dato) => this.setState({motor: dato})} />
            <label htmlFor="imagen-vehiculo" className="col-2" >Imagen</label>
            <div className="col-4" >
              <input type="file" className="form-control-file" accept="image/*" id="imagen-vehiculo" onChange={(e) => this.imagenUpload(e)} />
            </div>
          </div>
          <br />
          <div className="row" style={{margin:'10px 2px'}}>
            <div className="text-center">
              <button className="btn btn-success" onClick={() => this.actualizarVehiculo()}>Crear/Editar Vehículo</button>
            </div>
          </div>
        </div>
      </section>
    );
  };
};

