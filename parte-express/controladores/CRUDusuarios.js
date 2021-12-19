const {conectar, desconectar} = require('./conexion');

async function consultarUsuario(id, pass = null) {
  try {
    const db = await conectar();
    const query = {};
    query.id = id;
    if(pass)
      query.contraseña = pass;
    const usuario = await db.collection('usuarios').findOne(query);
    return usuario;
  } finally {
    await desconectar();
  }
}

module.exports = {consultarUsuario};

