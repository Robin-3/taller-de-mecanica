const {conectar, desconectar} = require('./conexion.js');

async function consultarServicios() {
  try {
    const db = await conectar();

    const servicios = await db.collection('servicios').findOne();
    return servicios;
  } finally {
    await desconectar();
  }
}

module.exports = {consultarServicios};

