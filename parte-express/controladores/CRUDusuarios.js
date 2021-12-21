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
      query.contrasena = pass;
    const usuario = await db.collection('usuarios').findOne(query);
    return usuario;
  } finally {
    await desconectar();
  }
}

async function agregarUsuario(usuario) {
  try {
    const db = await conectar();
    await db.collection('usuarios').insertOne(usuario);
  } finally {
    await desconectar();
  }
}

async function editarUsuario(usuario) {
  try {
    const db = await conectar();
    await db.collection('usuarios').updateOne({id: usuario.id}, {$set: usuario.set, $currentDate: {lastModified: true}}, {});
  } finally {
    await desconectar();
  }
}

async function eliminarUsuario(usuario) {
  try {
    const db = await conectar();
    await db.collection('usuarios').deleteOne(usuario);
  } finally {
    await desconectar();
  }
}

module.exports = {consultarUsuarios, consultarUsuario, agregarUsuario, editarUsuario, eliminarUsuario};

