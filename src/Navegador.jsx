import React from 'react';
import Menu from './Menu';
import Registro from './paginas/Registro';
import Bienvenida from './paginas/Bienvenida';
import Dashboard from './paginas/Dashboard';
import DashboardMecanicos from './paginas/DashboardMecanicos';
import DashboardServicios from './paginas/DashboardServicios';
import VehiculosRegistro from './paginas/VehiculosRegistro';
import VehiculosCita from './paginas/VehiculosCita';
import VehiculosAgenda from './paginas/VehiculosAgenda';
import ListadoAsignaciones from './paginas/ListadoAsignaciones';

export class Navegador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actual: 'bienvenida',
      errorUsuario: null,
      registrado: true,
      usuario: {
        id: 'A123',
        nombre: 'Kisaragi Momo',
        imagen: 'momo.png',
        rol: 'administrador',
      },
    };
  };

  generarPagina() {
    const usuario = {nombre: this.state.usuario.nombre, img: <img className="user-img" src={process.env.PUBLIC_URL + '/img/usuarios/' + this.state.usuario.imagen} alt={this.state.usuario.nombre} />,};

    if(this.state.usuario.rol === 'planta' || this.state.usuario.rol === 'administrador') {
      if(this.state.actual === 'dashboard')
        return <Dashboard usuario={usuario} cargarSubpagina={(p) => this.setState({actual: p})} />;
      if(this.state.actual === 'dashboardMecanicos') {
        const mecanicos = [
          {id: 'M01', nombre: 'L', servicios: {'Pastillas': 12,}, img: 'ele.jpg',},
          {id: 'M02', nombre: 'Usuario', servicios: {}, img: 'usuario.jpg',},
          {id: 'M03', nombre: 'Juleka', servicios: {'Discos': 23, 'Suspencion': 34, 'Revisión de frenos': 45}, img: 'juleka.jpg',},
          {id: 'M04', nombre: 'Kido', servicios: {'Pastillas': 56,'Cambio de aceite': 67,}, img: 'kido.jpg',},
        ];
        mecanicos.forEach(datos => datos.img = <img className="img-fluid user-img" src={process.env.PUBLIC_URL + '/img/usuarios/' + datos.img} alt={datos.nombre} />);

        return <DashboardMecanicos usuario={usuario} mecanicos={this.listaATabla(mecanicos, 3)} />;
      }
      if(this.state.actual === 'dashboardServicios') {
        const servicios = {
          'Revisión de frenos': 45,
          'Pastillas': 68,
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
      if(this.state.actual === 'vehiculosCita')
        return <VehiculosCita usuario={usuario} />;
      if(this.state.actual === 'vehiculosAgenda') {
        const agenda = [
          {fecha: new Date(2021, 12, 2, 13), servicio: 'Alineación', mecanico: 'L'},
          {fecha: new Date(2021, 12, 2, 13), servicio: 'Alineación', mecanico: 'Kido'},
          {fecha: new Date(2021, 12, 2, 14), servicio: 'Alineación', mecanico: 'Kido'},
          {fecha: new Date(2021, 12, 2, 15), servicio: 'Alineación', mecanico: 'Usuario'},
          {fecha: new Date(2021, 12, 2, 15), servicio: 'Alineación', mecanico: 'Juleka'},
          {fecha: new Date(2021, 12, 2, 15), servicio: 'Alineación', mecanico: 'L'},
          {fecha: new Date(2021, 12, 2, 16), servicio: 'Alineación', mecanico: 'Juleka'},
          {fecha: new Date(2021, 12, 2, 17), servicio: 'Alineación', mecanico: 'L'},
        ];

        return <VehiculosAgenda usuario={usuario} agenda={agenda} />;
      }
      if(this.state.actual === 'ListadoAsignaciones'){
        const asignaciones = [
          {servicio: 'Revision de frenos' ,fecha: new Date(2021, 12, 2, 13), estado: 'Pendiente'},
          {servicio: 'Alineación' ,fecha: new Date(2021, 1, 3, 16), estado: 'Pendiente'},
          {servicio: 'Discos' ,fecha: new Date(2021, 12, 15, 13), estado: 'Pendiente'},
          {servicio: 'Discos' ,fecha: new Date(2021, 12, 20, 11), estado: 'Pendiente'},
          {servicio: 'Suspención' ,fecha: new Date(2021, 12, 5, 13), estado: 'Pendiente'},
        ];
        return <ListadoAsignaciones usuario={usuario} asignaciones={asignaciones} />;
      }
    }

    return <Bienvenida usuarioNombre={this.state.usuario.nombre} usuarioImagen={this.state.usuario.imagen} />
  };

  validarRegistro(registroDatos) {
    if(registroDatos.identificacion === '' || registroDatos.contrasena === '') {
      this.setState({errorUsuario: 'El campo "Identificación" ni el campo "Contraseña" deben de estar vacios'});
      return;
    }

    const usuario = this.state.usuario;
    usuario.id = registroDatos.identificacion.toUpperCase();

    if(usuario.id[0] === 'M')
      usuario.rol = 'mecánico';
    else if(usuario.id[0] === 'P')
      usuario.rol = 'planta';
    else if(usuario.id[0] === 'A')
      usuario.rol = 'administrador';
    else
      usuario.rol = null;

    console.log('Datos suministrados:');
    console.log(registroDatos);
    console.log('Ingresando como:');
    console.log(usuario);

    this.setState({registrado: true, actual: 'bienvenida', errorUsuario: null, usuario: usuario});
  };

  listaATabla(lista, numeroColumnas) {
    let tabla = [];
    for(let sublistaIndex = 0; sublistaIndex < Math.ceil(lista.length/numeroColumnas); sublistaIndex++)
      tabla.push(lista.slice(sublistaIndex*numeroColumnas, (sublistaIndex+1)*numeroColumnas));
    return tabla;
  };

  render () {
    const paginaActual = this.state.registrado?
      <Menu actual={this.generarPagina()} cargarPagina={(p) => this.setState({actual: p})} cerrarSesion={() => this.setState({registrado: false})} rol={this.state.usuario.rol} />:
      <Registro validarRegistro={(r) => this.validarRegistro(r)} error={this.state.errorUsuario} />;

    return (
      <React.Fragment>{paginaActual}</React.Fragment>
    );
  };
};

