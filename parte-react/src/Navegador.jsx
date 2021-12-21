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
      registrado: true,
      usuario: {imagen: "0.png", nombre: "Kisaragi Momo", rol: "administrador"},
      buscarVehiculo: null,
      APIdata: null,
      APIroute: '',
    };
  };
  // No olvidar borrar el usuario

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
      if(this.state.actual === 'vehiculosCita') {
        if(this.state.APIroute !== '/vehiculos/citas') {
          const horaInicio = 480; //(8am) en minutos
          const horaFin = 1080; //(6pm)
          const diasFuturo = 3;
          fetch('http://localhost:9000/vehiculos/citas?inicio='+horaInicio+'&fin='+horaFin+'&dias='+diasFuturo)
            .then(response => response.json())
            .catch(err => console.log(err))
            .then(data => this.setState({APIdata: data, APIroute: '/vehiculos/citas'}));
        }

        let datos = [];

        if(this.state.APIroute === '/vehiculos/citas' && this.state.APIdata)
          datos = this.state.APIdata;

        return <VehiculosCita usuario={usuario} datos={datos} actualizarAsignaciones={(citas) => this.actualizarAsignaciones(citas)} />;
      }
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

        return <VehiculosAgenda usuario={usuario} agenda={agenda} />;
      }
      if(this.state.actual === 'serviciosConfigurar') {
        if(this.state.APIroute !== '/servicios/configurar') {
          fetch('http://localhost:9000/servicios/configurar')
            .then(response => response.json())
            .catch(err => console.log(err))
            .then(data => this.setState({APIdata: data, APIroute: '/servicios/configurar'}));
        }

        let servicios = [];

        if(this.state.APIroute === '/servicios/configurar' && this.state.APIdata)
          servicios = this.state.APIdata;

        return <ServiciosConfigurar usuario={usuario} servicios={this.listaATabla(servicios, 2)} configurarServicio={(dato) => this.configurarServicios(dato)} />;
      }
      if(this.state.actual === 'serviciosAsignar') {
        if(this.state.APIroute !== '/servicios/asignar') {
          fetch('http://localhost:9000/servicios/asignar')
            .then(response => response.json())
            .catch(err => console.log(err))
            .then(data => this.setState({APIdata: data, APIroute: '/servicios/asignar'}));
        }

        let servicios = [];

        if(this.state.APIroute === '/servicios/asignar' && this.state.APIdata)
          servicios = this.state.APIdata;

        return <ServiciosAsignar usuario={usuario} servicios={servicios} reasignacionServicios={(dato) => this.reasignacionServicios(dato)} />;
      }
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

  actualizarAsignaciones(citas) {
    fetch('http://localhost:9000/vehiculos/citas', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(citas)
    })
    .then(response => response.json())
    .catch(err => console.log(err))
    .then(data => this.setState({APIroute: ''}));
  }

  configurarServicios(servicio) {
    fetch('http://localhost:9000/servicios/configurar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(servicio)
    })
    .then(response => response.json())
    .catch(err => console.log(err))
    .then(data => this.setState({APIroute: ''}));
  }

  reasignacionServicios(dato) {
   fetch('http://localhost:9000/servicios/asignar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dato)
    })
    .then(response => response.json())
    .catch(err => console.log(err))
    .then(data => this.setState({APIroute: ''}));
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

