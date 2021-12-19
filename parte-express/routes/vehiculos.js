var express = require('express');
var {consultarVehiculo, agregarVehiculo, editarVehiculo} = require('../controladores/CRUDvehiculos');

var router = express.Router();

router.post('/registro', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculo(req.body.placa.toUpperCase());
    console.log(!consultar);
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

module.exports = router;
