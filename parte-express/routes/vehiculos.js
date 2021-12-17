var express = require('express');
var {consultarVehiculos} = require('../controladores/CRUDvehiculos');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculos();
    res.send(consultar);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;
