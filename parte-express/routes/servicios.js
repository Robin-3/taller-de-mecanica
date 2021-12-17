var express = require('express');
var {consultarServicios} = require('../controladores/CRUDservicios');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const consultar = await consultarServicios();
    res.send(consultar);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;
