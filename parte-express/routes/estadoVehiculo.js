var express = require('express');
var {consultarVehiculo, editarVehiculo} = require('../controladores/CRUDvehiculos');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculo(req.query.placa.toUpperCase(), req.query.servicio, req.query.fecha, parseInt(req.query.mecanico));
    res.send(consultar);
  } catch (error) {
    res.send({error});
  }
});

router.put('/estado', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculo(req.body.placa.toUpperCase());
    const vehiculo = {};
    vehiculo.placa = req.body.placa.toUpperCase();
    vehiculo.set = {};
    vehiculo.set.asignaciones = [];
    for(const asignacion of consultar.asignaciones) {
      let asig = asignacion;
      if(asignacion.servicio === req.body.servicioDB && (new Date(asignacion.fecha)).getTime() === (new Date(req.body.fecha)).getTime() && asignacion.usuario === req.body.usuarioDB) {
        asig.reparado = !asig.reparado;
      }
      vehiculo.set.asignaciones.push(asig);
    }
    await editarVehiculo(vehiculo);
    res.send(req.body);
  } catch (error) {
    res.send({error});
  }
});

router.put('/comentario', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculo(req.body.vehiculo.toUpperCase());
    const vehiculo = {};
    vehiculo.placa = req.body.vehiculo.toUpperCase();
    vehiculo.set = {};
    vehiculo.set.comentarios = consultar.comentarios;
    vehiculo.set.comentarios.push({id: req.body.usuario, hora: new Date(req.body.hora), mensaje: req.body.comentario});
    await editarVehiculo(vehiculo);
    res.send(req.body);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;

