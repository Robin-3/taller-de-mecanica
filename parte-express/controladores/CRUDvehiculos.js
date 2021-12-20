const {conectar, desconectar} = require('./conexion.js');

async function consultarVehiculos() {
  try {
    const db = await conectar();
    const vehiculos = await db.collection('vehiculos').find().toArray();
    return vehiculos;
  } finally {
    await desconectar();
  }
}

async function consultarVehiculo(placa) {
  try {
    const db = await conectar();
    const vehiculos = await db.collection('vehiculos').findOne({placa: placa});
    return vehiculos;
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

