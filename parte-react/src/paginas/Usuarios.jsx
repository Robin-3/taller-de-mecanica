import React from 'react';
import HeaderInfo from '../componentes/HeaderInfo';
import MensajeError from '../componentes/MensajeError';
import InputText from '../componentes/InputText';
import InputList from '../componentes/InputList';

export default class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identificacion: '',
      contrasena: '',
      confirmarContrasena: '',
      rol: '',
      imagen: '',
      nombre: '',
      error: null,
    };
  };

  eliminarUsuario() {
    if(this.state.identificacion === '') {
      this.setState({error: 'Debe de ingresar una identificación'});
      return;
    }

    this.props.actualizarUsuario(true, {id: this.state.identificacion});

    this.setState({error: null});
  };

  actualizarUsuario() {
    if(this.state.identificacion === '') {
      this.setState({error: 'Debe de ingresar una identificacion'});
      return;
    }

    if(this.state.contrasena !== this.state.confirmarContrasena) {
      this.setState({error: 'Las contraseñas deben ser iguales'});
      return;
    }

    const usuario = (({error, ...usuario}) => usuario)(this.state);
    if(this.state.rol === '')
      usuario.rol = 'Mecánico';

    this.props.actualizarUsuario(false, usuario);

    this.setState({error: null});
  };

  imagenUpload(e) {
    const imagen = e.target.files[0];
    this.getBase64(imagen).then(base64 => {
      this.setState({imagen: base64});
    });
  }

  getBase64(file) {
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <section className="container mt-3">
        <div className="container col-11 backgroundNav" >
          <HeaderInfo titulo="Usuarios" usuarioNombre={this.props.usuario.nombre} usuarioImagen={this.props.usuario.img} />
          <MensajeError error={this.state.error} />
          <div className="row" style={{margin:'10px 2px'}}>
            <InputText type="number" classInput="col-7" id="identificacion-usuario" label="Identificación" classLabel="col-2" obtenerInfo={(dato) => this.setState({identificacion: dato})} />
            <button className="btn btn-success col-2" onClick={() => this.eliminarUsuario()} style={{marginLeft:'10px'}}>Eliminar</button>
          </div>
          <div className="row" style={{margin:'10px 2px'}}>
            <InputText type="password" classInput="col-4" id="contrasena-usuario" label="Contraseña" classLabel="col-2" obtenerInfo={(dato) => this.setState({contrasena: dato})} />
            <InputText type="password" classInput="col-4" id="confirmar-usuario" label="Confirmar contraseña" classLabel="col-2" obtenerInfo={(dato) => this.setState({confirmarContrasena: dato})} />
          </div>
          <div className="row" style={{margin:'0px 2px'}}>
            <InputList classInput="col-4" id="rol-usuario" label="Rol" classLabel="col-2" opciones={['Mecánico', 'De planta', 'Administrador',]} obtenerInfo={(dato) => this.setState({rol: dato})} />
            <label htmlFor="imagen-usuario" className="col-2" >Imagen</label>
            <div className="col-4" >
              <input type="file" className="form-control-file" accept="image/*" id="imagen-usuario" onChange={(e) => this.imagenUpload(e)} />
            </div>
            <div className="row" style={{margin:'10px 2px'}}>
              <InputText classInput="col-4" id="nombre-usuario" label="Nombre" classLabel="col-2" obtenerInfo={(dato) => this.setState({nombre: dato})} />
            </div>
          </div>
          <br />
          <div className="row" style={{margin:'10px 2px'}}>
            <div className="text-center">
              <button className="btn btn-success" onClick={() => this.actualizarUsuario()}>Crear/Editar Usuario</button>
            </div>
          </div>
        </div>
      </section>
    );
  };
};

