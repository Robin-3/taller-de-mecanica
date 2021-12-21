var express = require('express');
var {consultarVehiculos} = require('../controladores/CRUDvehiculos');
var {cambioNombre} = require('../miscelaneos/misc');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculos();
    let agenda = [];
    for(const consulta of consultar) {
      for(const asignacion of consulta.asignaciones) {
        if(asignacion.usuario === parseInt(req.query.id)) {
          const a = {};
          a.fecha = new Date(asignacion.fecha);
          a.estado = asignacion.reparado? 'Reparado': 'Pendiente';
          a.placa = consulta.placa;
          a.servicio = cambioNombre(asignacion.servicio);
          a.servicioDB = asignacion.servicio;
          agenda.push(a);
        }
      }
    }
    res.send(agenda);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;

