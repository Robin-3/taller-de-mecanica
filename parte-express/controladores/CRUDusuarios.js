const {conectar, desconectar} = require('./conexion.js');

async function consultarUsuarios() {
  try {
    const db = await conectar();
    const usuarios = await db.collection('usuarios').find().toArray();
    return usuarios;
  } finally {
    await desconectar();
  }
}

async function consultarUsuario(id, pass) {
  try {
    const db = await conectar();
    const usuario = await db.collection('usuarios').findOne({'id': id, 'contraseña': pass});
    return usuario;
  } finally {
    await desconectar();
  }
}

module.exports = {consultarUsuarios, consultarUsuario};

