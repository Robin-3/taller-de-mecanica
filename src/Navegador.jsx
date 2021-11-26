import React from 'react';
import Menu from './Menu';
import Bienvenida from './paginas/Bienvenida';
import Dashboard from './paginas/Dashboard';
import VehiculosRegistro from './paginas/VehiculosRegistro';

export class Navegador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actual: 'vehiculosRegistro',
      registrado: true,
      usuario: {
        id: 123,
        nombre: 'Kisaragi Momo',
        imagen: 'momo.png',
        rol: 'administrador',
      },
    };
  }

  generarPagina() {
    if(!this.state.registrado)
      return <h2>Debe de registrarse</h2>;

    const usuario = {nombre: this.state.usuario.nombre, img: <img className="user-img" src={process.env.PUBLIC_URL + '/img/usuarios/' + this.state.usuario.imagen} alt={this.state.usuario.nombre}/>}
    if(this.state.actual === 'dashboard')
      return <Dashboard usuario={usuario}/>
    if(this.state.actual === 'vehiculosRegistro')
      return <VehiculosRegistro usuario={usuario} />
    return <Bienvenida usuarioNombre={this.state.usuario.nombre} usuarioImagen={this.state.usuario.imagen} />
  };

  render () {
    const paginaActual = this.generarPagina();

    return (
      <Menu actual={paginaActual} cargarPagina={(p) => this.setState({actual: p})} />
    );
  };
}

