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
import ServiciosConfigurar from './paginas/ServiciosConfigurar';
import ServiciosAsignar from './paginas/ServiciosAsignar';
import ListadoAsignaciones from './paginas/ListadoAsignaciones';
import EstadoVehiculo from './paginas/EstadoVehiculo';
import Usuarios from './paginas/Usuarios';

export class Navegador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actual: 'bienvenida',
      errorUsuario: null,
      registrado: false,
      usuario: {},
      buscarVehiculo: null,
      APIdata: null,
      APIroute: '',
    };
  };

  generarPagina() {
    const usuario = {nombre: this.state.usuario.nombre, img: <img className="user-img" src={process.env.PUBLIC_URL + '/img/usuarios/' + this.state.usuario.imagen} alt={this.state.usuario.nombre} />,};

    //this.setState({APIdata: null});

    if(this.state.usuario.rol === 'planta' || this.state.usuario.rol === 'administrador') {
      if(this.state.actual === 'dashboard') {

        if(this.state.APIroute !== '/dashboard') {
          fetch('http://localhost:9000/dashboard')
            .then(response => response.json())
            .catch(err => console.log(err))
            .then(data => this.setState({APIdata: data, APIroute: '/dashboard'}));
        }

        let valMas = -1;
        let valMenos = Infinity;
        let mas = [];
        let menos = [];

        if(this.state.APIroute === '/dashboard' && this.state.APIdata) {
          for (const [key, value] of Object.entries(this.state.APIdata)) {
            if(value > valMas) {
              valMas = value;
              mas = [key];
            } else if (value === valMas)
              mas.push(key);

            if(value < valMenos) {
              valMenos = value;
              menos = [key];
            } else if (value === valMenos)
              menos.push(key);
          }
        }

        return <Dashboard usuario={usuario} cargarSubpagina={(p) => this.setState({actual: p})} mas={mas} menos={menos} />;
      }
      if(this.state.actual === 'dashboardMecanicos') {

        if(this.state.APIroute !== '/dashboard/mecanicos') {
          fetch('http://localhost:9000/dashboard/mecanicos')
            .then(response => response.json())
            .catch(err => console.log(err))
            .then(data => this.setState({APIdata: data, APIroute: '/dashboard/mecanicos'}));
        }

        let mecanicos = [];

        if(this.state.APIroute === '/dashboard/mecanicos' && this.state.APIdata)
          mecanicos = this.state.APIdata;

        mecanicos.forEach(datos => datos.img = <img className="img-fluid user-img" src={process.env.PUBLIC_URL + '/img/usuarios/' + datos.img} alt={datos.nombre} />);

        return <DashboardMecanicos usuario={usuario} mecanicos={this.listaATabla(mecanicos, 3)} />;
      }
      if(this.state.actual === 'dashboardServicios') {
        if(this.state.APIroute !== '/dashboard/servicios') {
          fetch('http://localhost:9000/dashboard/servicios')
            .then(response => response.json())
            .catch(err => console.log(err))
            .then(data => this.setState({APIdata: data, APIroute: '/dashboard/servicios'}));
        }

        let servicios = {};

        if(this.state.APIroute === '/dashboard/servicios' && this.state.APIdata)
          servicios = this.state.APIdata;

        return <DashboardServicios usuario={usuario} servicios={servicios}/>;
      }
      if(this.state.actual === 'vehiculosRegistro')
        return <VehiculosRegistro usuario={usuario} actualizarVehiculo={(eliminar, vehiculo) => this.actualizarVehiculo(eliminar, vehiculo)} />;
      if(this.state.actual === 'vehiculosCita')
        return <VehiculosCita usuario={usuario} />;
      if(this.state.actual === 'vehiculosAgenda') {
        if(this.state.APIroute !== '/vehiculos/agenda') {
          fetch('http://localhost:9000/vehiculos/agenda')
            .then(response => response.json())
            .catch(err => console.log(err))
            .then(data => this.setState({APIdata: data, APIroute: '/vehiculos/agenda'}));
        }

        let agenda = [];

        if(this.state.APIroute === '/vehiculos/agenda' && this.state.APIdata)
          agenda = this.state.APIdata;

        /*const agenda = [
          {fecha: new Date(2021, 12, 2, 13), servicio: 'Alineación', mecanico: 'L'},
          {fecha: new Date(2021, 12, 2, 13), servicio: 'Alineación', mecanico: 'Kido'},
          {fecha: new Date(2021, 12, 2, 14), servicio: 'Alineación', mecanico: 'Kido'},
          {fecha: new Date(2021, 12, 2, 15), servicio: 'Pastillas', mecanico: 'Usuario'},
          {fecha: new Date(2021, 12, 2, 15), servicio: 'Cambio de aceite', mecanico: 'Juleka'},
          {fecha: new Date(2021, 12, 2, 15), servicio: 'Discos', mecanico: 'L'},
          {fecha: new Date(2021, 12, 2, 16), servicio: 'Suspención', mecanico: 'Juleka'},
          {fecha: new Date(2021, 12, 2, 17), servicio: 'Amortiguadores', mecanico: 'L'},
        ];*/

        return <VehiculosAgenda usuario={usuario} agenda={agenda} />;
      }
      if(this.state.actual === 'serviciosConfigurar') {
        const servicios = [
          {nombre: 'Revisión de frenos', descripcion: 'Revisión descripción', costo: '5000', duracion: '10', disponible: true,},
          {nombre: 'Pastillas', descripcion: 'Pastillas descripción', costo: '6000', duracion: '11', disponible: true,},
          {nombre: 'Discos', descripcion: 'Discos descripción', costo: '7000', duracion: '12', disponible: false,},
          {nombre: 'Suspención', descripcion: 'Suspención descripción', costo: '8000', duracion: '13', disponible: true,},
          {nombre: 'Amortiguadores', descripcion: 'Amortiguadores descripción', costo: '9000', duracion: '14', disponible: true,},
          {nombre: 'Cambio de aceite', descripcion: 'Cambio descripción', costo: '10000', duracion: '15', disponible: true,},
          {nombre: 'Alineación', descripcion: 'Alineación descripción', costo: '11000', duracion: '16', disponible: true,},
          {nombre: 'Rotación de llantas', descripcion: 'Rotación descripción', costo: '12000', duracion: '17', disponible: false,},
        ];

        return <ServiciosConfigurar usuario={usuario} servicios={this.listaATabla(servicios, 2)} configurarServicio={(dato) => console.log('Cambiando datos: ', dato)} />;
      }
      if(this.state.actual === 'serviciosAsignar')
        return <ServiciosAsignar usuario={usuario} />;
    }
    if(this.state.usuario.rol === 'mecánico' || this.state.usuario.rol === 'administrador') {
      if(this.state.actual === 'listadoAsignaciones'){
        const asignaciones = [
          {placa: 'ABC123', servicio: 'Revision de frenos', fecha: new Date(2021, 12, 2, 13), estado: 'Pendiente'},
          {placa: 'ABC234', servicio: 'Alineación', fecha: new Date(2021, 1, 3, 16), estado: 'Pendiente',},
          {placa: 'ABC345', servicio: 'Discos', fecha: new Date(2021, 12, 15, 13), estado: 'Pendiente',},
          {placa: 'ABC456', servicio: 'Discos', fecha: new Date(2021, 12, 20, 11), estado: 'Pendiente',},
          {placa: 'ABC567', servicio: 'Suspención', fecha: new Date(2021, 12, 5, 13), estado: 'Pendiente',},
        ];
        return <ListadoAsignaciones usuario={usuario} asignaciones={asignaciones} cargarSubpagina={(p, vehiculo) => this.setState({actual: p, buscarVehiculo: vehiculo})} />;
      }
      if(this.state.actual === 'estadoVehiculo') {
        const vehiculo = {
          placa: this.state.buscarVehiculo,
          modelo: 'Modelo',
          marca: 'Marca',
          combustible: 'Combustible',
          transmision: 'Transmisión',
          motor: 'Motor',
          imagen: 'Imagen',
          servicios: [
            {servicio: 'Discos', completado: true, asignado: false,},
            {servicio: 'Alineación', completado: false, asignado: true,},
            {servicio: 'Amortiguadores', completado: false, asignado: false,},
          ],
          comentarios: ['Mensajes', 'Para poder', 'Hacer pruebas',],
        };

        return <EstadoVehiculo usuario={usuario} vehiculo={vehiculo} cambiarEstadoServicio={(dato) => console.log('Cambiando datos a: ', dato)} nuevoComentario={(dato) => console.log('Nuevo comentario: ', dato, ' por el usuario: ', this.state.usuario.id)} />;
      }
    }
    if(this.state.usuario.rol === 'administrador') {
      if(this.state.actual === 'usuarios')
        return <Usuarios usuario={usuario} />;
    }

    return <Bienvenida usuarioNombre={this.state.usuario.nombre} usuarioImagen={this.state.usuario.imagen} />
  };

  async validarRegistro(registroDatos) {
    if(registroDatos.identificacion === '' || registroDatos.contrasena === '') {
      this.setState({errorUsuario: 'El campo "Identificación" ni el campo "Contraseña" deben de estar vacios'});
      return;
    }

    let usuarioDB = undefined;

    await fetch('http://localhost:9000/login?id=' + registroDatos.identificacion + '&pass=' + registroDatos.contrasena)
      .then(response => response.json())
      .catch(err => this.setState({errorUsuario: 'El usuario no existe o la contraseña es incorrecta'}))
      .then(data => usuarioDB = data);

    if(!usuarioDB)
      return;

    const usuario = {};
    usuario.imagen = usuarioDB.id + usuarioDB.imagen;
    usuario.nombre = usuarioDB.nombre;
    if(usuarioDB.rol === 'Mecánico')
      usuario.rol = 'mecánico';
    else if(usuarioDB.rol === 'De planta')
      usuario.rol = 'planta';
    else if(usuarioDB.rol === 'Administrador')
      usuario.rol = 'administrador';
    else
      usuario.rol = null;

    this.setState({registrado: true, actual: 'bienvenida', errorUsuario: null, usuario: usuario});
  };

  listaATabla(lista, numeroColumnas) {
    let tabla = [];
    for(let sublistaIndex = 0; sublistaIndex < Math.ceil(lista.length/numeroColumnas); sublistaIndex++)
      tabla.push(lista.slice(sublistaIndex*numeroColumnas, (sublistaIndex+1)*numeroColumnas));
    return tabla;
  };

  actualizarVehiculo(eliminar, vehiculo) {
    if(eliminar) {
      fetch('http://localhost:9000/vehiculos/registro?placa=' + vehiculo.placa, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(data => console.log(data));
    } else {
      fetch('http://localhost:9000/vehiculos/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehiculo)
      })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(data => console.log(data));
    }
  }

  render () {
    const paginaActual = this.state.registrado?
      <Menu actual={this.generarPagina()} cargarPagina={(p) => this.setState({actual: p})} cerrarSesion={() => this.setState({registrado: false})} rol={this.state.usuario.rol} />:
      <Registro validarRegistro={(r) => this.validarRegistro(r)} error={this.state.errorUsuario} />;

    return (
      <React.Fragment>{paginaActual}</React.Fragment>
    );
  };
};

