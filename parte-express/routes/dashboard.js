var express = require('express');
var {consultarServicios, consultarMecanicos} = require('../controladores/CRUDdashboard');
var {renombrarServicios} = require('../miscelaneos/misc');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const servicios = await consultarServicios();
    res.send(renombrarServicios(servicios));
  } catch (error) {
    res.send({error});
  }
});

router.get('/mecanicos', async function(req, res, next) {
  try {
    const mecanicos = await consultarMecanicos();
    res.send(mecanicos);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;

