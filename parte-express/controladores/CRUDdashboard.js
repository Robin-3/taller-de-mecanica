const {conectar, desconectar} = require('./conexion');
const {consultarUsuario} = require('./CRUDusuarios');
const {renombrarServicios} = require('../miscelaneos/misc');

async function consultarServicios() {
  try {
    const db = await conectar();

    const dashboard = await db.collection('dashboard').findOne();
    return (({mecanicos, _id, ...servicios}) => servicios)(dashboard);
  } finally {
    await desconectar();
  }
}

async function consultarMecanicos() {
  try {
    const db = await conectar();

    const dashboard = await db.collection('dashboard').findOne();
    let mecanicos = [];
    for(const mec of dashboard.mecanicos) {
      const usuario = await consultarUsuario(mec.id);
      const m = {};
      m.nombre = usuario.nombre;
      m.servicios = renombrarServicios(mec.asignaciones);
      m.img = usuario.id + usuario.imagen;
      m.id = usuario.id;
      mecanicos.push(m);
    }
    return mecanicos;
  } finally {
    await desconectar();
  }
}

module.exports = {consultarServicios, consultarMecanicos};

