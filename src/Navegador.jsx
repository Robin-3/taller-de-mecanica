import React from 'react';
import Menu from './Menu';
import Registro from './paginas/Registro';
import Bienvenida from './paginas/Bienvenida';
import Dashboard from './paginas/Dashboard';
import DashboardMecanicos from './paginas/DashboardMecanicos';
import DashboardServicios from './paginas/DashboardServicios';
import VehiculosRegistro from './paginas/VehiculosRegistro';

export class Navegador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actual: 'bienvenida',
      registrado: true,
      usuario: {
        id: 123,
        nombre: 'Kisaragi Momo',
        imagen: 'momo.png',
        rol: 'administrador',
      },
    };
  };

  generarPagina() {
    const usuario = {nombre: this.state.usuario.nombre, img: <img className="user-img" src={process.env.PUBLIC_URL + '/img/usuarios/' + this.state.usuario.imagen} alt={this.state.usuario.nombre} />};

    if(this.state.actual === 'dashboard')
      return <Dashboard usuario={usuario} cargarSubpagina={(p) => this.setState({actual: p})} />;
    if(this.state.actual === 'dashboardMecanicos') {
      const mecanicos = [
        {id: 'M01', nombre: 'L', servicios: {"Pastillas": 12,}, img: 'ele.jpg',},
        {id: 'M02', nombre: 'Usuario', servicios: {}, img: 'usuario.jpg',},
        {id: 'M03', nombre: 'Juleka', servicios: {"Discos": 23, "Suspencion": 34, "Revisión de frenos": 45}, img: 'juleka.jpg',},
        {id: 'M04', nombre: 'Kido', servicios: {"Cambio de aceite": 56,}, img: 'kido.jpg',},
      ];
      mecanicos.forEach(datos => datos.img = <img className="img-fluid user-img" src={process.env.PUBLIC_URL + '/img/usuarios/' + datos.img} alt={datos.nombre} />);

      return <DashboardMecanicos usuario={usuario} mecanicos={this.listaATabla(mecanicos, 3)} />;
    }
    if(this.state.actual === 'dashboardServicios') {
      const servicios = {
        'Revisión de frenos': 45,
        'Pastillas': 12,
        'Discos': 23,
        'Suspención': 34,
        'Amortiguadores': 0,
        'Cambio de aceite': 56,
        'Alineación': 0,
        'Rotación de llantas': 0,
      };

      return <DashboardServicios usuario={usuario} servicios={servicios}/>;
    }
    if(this.state.actual === 'vehiculosRegistro')
      return <VehiculosRegistro usuario={usuario} />;
    return <Bienvenida usuarioNombre={this.state.usuario.nombre} usuarioImagen={this.state.usuario.imagen} />
  };

  validarRegistro(registroDatos) {
    console.log(registroDatos);

    this.setState({registrado: true, actual: 'bienvenida'});
  };

  listaATabla(lista, numeroColumnas) {
    let tabla = [];
    for(let sublistaIndex = 0; sublistaIndex < Math.ceil(lista.length/numeroColumnas); sublistaIndex++)
      tabla.push(lista.slice(sublistaIndex*numeroColumnas, (sublistaIndex+1)*numeroColumnas));
    return tabla;
  };

  render () {
    const paginaActual = this.state.registrado?
      <Menu actual={this.generarPagina()} cargarPagina={(p) => this.setState({actual: p})} cerrarSesion={() => this.setState({registrado: false})}/>:
      <Registro validarRegistro={(r) => this.validarRegistro(r)}/>;

    return (
      <React.Fragment>{paginaActual}</React.Fragment>
    );
  };
};

