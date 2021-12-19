var express = require('express');
var {consultarVehiculos, consultarVehiculo, agregarVehiculo, editarVehiculo, eliminarVehiculo} = require('../controladores/CRUDvehiculos');
var {consultarUsuario} = require('../controladores/CRUDusuarios');
var {cambioNombre} = require('../miscelaneos/misc');

var router = express.Router();

router.post('/registro', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculo(req.body.placa.toUpperCase());
    const vehiculo = {};
    vehiculo.placa = req.body.placa.toUpperCase();
    if(!consultar) {
      vehiculo.modelo = req.body.modelo;
      vehiculo.marca = req.body.marca;
      vehiculo.combustible = req.body.combustible;
      vehiculo.transmision = req.body.transmision;
      vehiculo.motor = req.body.motor;
      vehiculo.imagen = req.body.imagen;
      vehiculo.asignaciones = [];
      vehiculo.comentarios = [];
      await agregarVehiculo(vehiculo);
      vehiculo.mongo = 'Insert';
      res.send(vehiculo);
    } else {
      vehiculo.set = {};
      for(const [key, value] of Object.entries(req.body)) {
        if(key === 'placa' || value === '' || value === [])
          continue;
        vehiculo.set[key] = value;
      }
      await editarVehiculo(vehiculo);
      vehiculo.mongo = 'Update';
      res.send(vehiculo);
    }
  } catch (error) {
    res.send({error});
  }
});

router.delete('/registro', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculo(req.query.placa);
    if(consultar) {
      await eliminarVehiculo({placa: req.query.placa});
      res.send({placa: req.query.placa});
    } else
      res.send({placa: 'Not found'});
  } catch (error) {
    res.send({error});
  }
});

router.get('/agenda', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculos();
    let agenda = [];
    for(const consulta of consultar) {
      if(consulta.asignaciones.length > 0) {
        for(const asignacion of consulta.asignaciones) {
          const a = {};
          a.fecha = asignacion.fecha.toString();
          a.servicio = cambioNombre(asignacion.servicio);
          a.mecanico = await consultarUsuario(asignacion.usuario);
          a.mecanico = a.mecanico.nombre;
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
