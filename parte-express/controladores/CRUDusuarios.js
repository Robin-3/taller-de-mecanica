const {conectar, desconectar} = require('./conexion.js');

async function consultarUsuario() {
  try {
    const db = await conectar();

    const usuarios = await db.collection('usuarios').findOne();
    return usuarios;
  } finally {
    await desconectar();
  }
}

module.exports = {consultarUsuario};

