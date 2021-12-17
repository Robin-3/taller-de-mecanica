const {conectar, desconectar} = require('./conexion.js');

async function consultarVehiculos() {
  try {
    const db = await conectar();

    const vehiculos = await db.collection('vehiculos').findOne();
    return vehiculos;
  } finally {
    await desconectar();
  }
}

module.exports = {consultarVehiculos};

