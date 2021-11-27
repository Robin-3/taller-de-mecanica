import React from 'react';
import Menu from './Menu';
import Registro from './paginas/Registro';
import Bienvenida from './paginas/Bienvenida';
import Dashboard from './paginas/Dashboard';
import VehiculosRegistro from './paginas/VehiculosRegistro';

export class Navegador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actual: 'bienvenida',
      registrado: false,
      usuario: {
        id: 123,
        nombre: 'Kisaragi Momo',
        imagen: 'momo.png',
        rol: 'administrador',
      },
    };
  };

  generarPagina() {
    const usuario = {nombre: this.state.usuario.nombre, img: <img className="user-img" src={process.env.PUBLIC_URL + '/img/usuarios/' + this.state.usuario.imagen} alt={this.state.usuario.nombre}/>};

    if(this.state.actual === 'dashboard')
      return <Dashboard usuario={usuario}/>;
    if(this.state.actual === 'vehiculosRegistro')
      return <VehiculosRegistro usuario={usuario} />;
    return <Bienvenida usuarioNombre={this.state.usuario.nombre} usuarioImagen={this.state.usuario.imagen} />
  };

  validarRegistro(registroDatos) {
    console.log(registroDatos);
    this.setState({registrado: true});
  };

  render () {
    const paginaActual = this.state.registrado? <Menu actual={this.generarPagina()} cargarPagina={(p) => this.setState({actual: p})} cerrarSesion={() => this.setState({registrado: false})}/>: <Registro validarRegistro={(r) => this.validarRegistro(r)}/>;

    return (
      <React.Fragment>{paginaActual}</React.Fragment>
    );
  };
};

