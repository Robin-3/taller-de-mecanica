const {conectar, desconectar} = require('./conexion');

async function consultarUsuarios() {
  try {
    const db = await conectar();
    const usuarios = await db.collection('usuarios').find().toArray();
    return usuarios;
  } finally {
    await desconectar();
  }
}

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

module.exports = {consultarUsuarios, consultarUsuario};

