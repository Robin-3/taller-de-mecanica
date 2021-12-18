const {conectar, desconectar} = require('./conexion.js');

async function consultarServicios() {
  try {
    const db = await conectar();

    const dashboard = await db.collection('dashboard').findOne();
    return (({mecanicos, _id, ...servicios}) => servicios)(dashboard);
  } finally {
    await desconectar();
  }
}

module.exports = {consultarServicios};

