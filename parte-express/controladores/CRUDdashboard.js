const {conectar, desconectar} = require('./conexion.js');

async function consultarDashboard() {
  try {
    const db = await conectar();

    const dashboard = await db.collection('dashboard').findOne();
    return dashboard;
  } finally {
    await desconectar();
  }
}

module.exports = {consultarDashboard};

