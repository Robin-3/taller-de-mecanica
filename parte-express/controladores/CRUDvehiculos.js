const {conectar, desconectar} = require('./conexion.js');
const {consultarUsuario} = require('./CRUDusuarios');
var {cambioNombre} = require('../miscelaneos/misc');

async function consultarVehiculos() {
  try {
    const db = await conectar();
    const vehiculos = await db.collection('vehiculos').find().toArray();
    return vehiculos;
  } finally {
    await desconectar();
  }
}

async function consultarVehiculo(placa, servicio = null, fecha = null, usuario = null) {
  try {
    const db = await conectar();
    const vehiculos = await db.collection('vehiculos').findOne({placa: placa});
    let vehiculo = vehiculos;
    if(servicio && fecha && usuario) {
      vehiculo = {};
      vehiculo.combustible = vehiculos.combustible;
      vehiculo.imagen = vehiculos.imagen;
      vehiculo.modelo = vehiculos.modelo;
      vehiculo.marca = vehiculos.marca;
      vehiculo.motor = vehiculos.motor;
      vehiculo.placa = placa;
      vehiculo.transmision = vehiculos.transmision;
      vehiculo.asignacion = [];
      for(const asignacion of vehiculos.asignaciones) {
        const asig = {};
        asig.seleccionado = (asignacion.servicio === servicio && (new Date(asignacion.fecha)).getTime() === (new Date(fecha)).getTime() && asignacion.usuario === usuario);
        asig.fecha = new Date(fecha);
        asig.reparado = asignacion.reparado;
        asig.servicio = cambioNombre(asignacion.servicio);
        asig.servicioDB = servicio;
        asig.usuario = await consultarUsuario(asignacion.usuario);
        asig.usuario = asig.usuario.nombre;
        asig.usuarioDB = usuario;
        vehiculo.asignacion.push(asig);
      }
      vehiculo.comentarios = [];
      for(const comentario of vehiculos.comentarios) {
        const com = {};
        com.hora = comentario.hora;
        com.id = comentario.id;
        com.mecanico = await consultarUsuario(comentario.id);
        com.mecanico = com.mecanico.nombre;
        com.mensaje = comentario.mensaje;
        vehiculo.comentarios.push(com);
      }
    }
    return vehiculo;
  } finally {
    await desconectar();
  }
}

async function agregarVehiculo(vehiculo) {
  try {
    const db = await conectar();
    await db.collection('vehiculos').insertOne(vehiculo);
  } finally {
    await desconectar();
  }
}

async function editarVehiculo(vehiculo) {
  try {
    const db = await conectar();
    await db.collection('vehiculos').updateOne({placa: vehiculo.placa}, {$set: vehiculo.set, $currentDate: {lastModified: true}}, {});
  } finally {
    await desconectar();
  }
}

async function eliminarVehiculo(vehiculo) {
  try {
    const db = await conectar();
    await db.collection('vehiculos').deleteOne(vehiculo);
  } finally {
    await desconectar();
  }
}

async function editarAsignaciones(vehiculo) {
  try {
    const db = await conectar();
    await db.collection('vehiculos').updateOne({placa: vehiculo.placa}, {$set: vehiculo.set, $currentDate: {lastModified: true}}, {});
  } finally {
    await desconectar();
  }
}

module.exports = {consultarVehiculos, consultarVehiculo, agregarVehiculo, editarVehiculo, eliminarVehiculo, editarAsignaciones};

