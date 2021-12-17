var express = require('express');
var {consultarUsuario} = require('../controladores/CRUDusuarios');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const consultar = await consultarUsuario();
    res.send(consultar);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;

