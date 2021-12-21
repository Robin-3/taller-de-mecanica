const {conectar, desconectar} = require('./conexion.js');

async function consultarServicios() {
  try {
    const db = await conectar();
    const servicios = await db.collection('servicios').find().toArray();
    return servicios;
  } finally {
    await desconectar();
  }
}

async function editarServicio(servicio) {
  try {
    const db = await conectar();
    await db.collection('servicios').updateOne({nombre: servicio.nombre}, {$set: servicio.set, $currentDate: {lastModified: true}}, {});
  } finally {
    await desconectar();
  }
}

async function editarAsignaciones(servicio) {
  try {
    const db = await conectar();
    await db.collection('servicios').updateOne({nombre: servicio.nombre}, {$set: servicio.set, $currentDate: {lastModified: true}}, {});
  } finally {
    await desconectar();
  }
}

module.exports = {consultarServicios, editarServicio, editarAsignaciones};

