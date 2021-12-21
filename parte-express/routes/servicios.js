var express = require('express');
var {consultarServicios, editarServicio, editarAsignaciones} = require('../controladores/CRUDservicios');
var {consultarUsuarios} = require('../controladores/CRUDusuarios');
var {cambioNombre} = require('../miscelaneos/misc');

var router = express.Router();

router.get('/configurar', async function(req, res, next) {
  try {
    const consultar = await consultarServicios();
    let servicios = [];
    for(const consulta of consultar) {
      const servicio = {};
      servicio.nombre = cambioNombre(consulta.nombre);
      servicio.nombreDB = consulta.nombre;
      servicio.costo = consulta.costo;
      servicio.descripcion = consulta.descripcion;
      servicio.disponible = consulta.disponible;
      servicio.duracion = consulta.duracion;
      servicios.push(servicio);
    }
    res.send(servicios);
  } catch (error) {
    res.send({error});
  }
});

router.put('/configurar', async function(req, res, next) {
  try {
    const servicio = {};
    servicio.nombre = req.body.nombreDB;
    servicio.set = {};
    servicio.set.costo = req.body.costo;
    servicio.set.descripcion = req.body.descripcion;
    servicio.set.disponible = req.body.disponible;
    servicio.set.duracion = req.body.duracion;
    await editarServicio(servicio);
    servicio.mongo = 'Update';
    res.send(servicio);
  } catch (error) {
    res.send({error});
  }
});

router.get('/asignar', async function(req, res, next) {
  try {
    const usuarios = await consultarUsuarios();
    const servicios = await consultarServicios();
    let mecanicosId = [];
    for(const u of usuarios)
      if(u.rol === 'Mecánico')
        mecanicosId.push({id: u.id, nombre: u.nombre});

    let serviciosM = [];
    for(const id of mecanicosId) {
      const servicio = {};
      servicio.mecanico = id.id;
      servicio.nombre = id.nombre;
      let ser = [];
      for(const s of servicios) {
        if(s.mecanico.includes(id.id))
          ser.push({nombre: cambioNombre(s.nombre), nombreDB: s.nombre});
      }
      servicio.servicios = ser;
      serviciosM.push(servicio);
    }
    res.send(serviciosM);
  } catch (error) {
    res.send({error});
  }
});

router.put('/asignar', async function(req, res, next) {
  try {
    const consultar = await consultarServicios();
    for(const servicio of consultar) {
      const asignado = req.body.asignados.includes(servicio.nombre);
      let mecanicos = servicio.mecanico.filter((val) => val !== req.body.mecanico);
      if(asignado)
        mecanicos.push(req.body.mecanico);
      mecanicos.sort();
      const asignacion = {};
      asignacion.nombre = servicio.nombre;
      asignacion.set = {};
      asignacion.set.mecanico = mecanicos;
      await editarAsignaciones(asignacion);
    }
    res.send({mecanico: req.body.mecanico});
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;
