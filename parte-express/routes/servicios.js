var express = require('express');
var {consultarServicios, editarServicio} = require('../controladores/CRUDservicios');
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
    console.log(req.body);
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

module.exports = router;
