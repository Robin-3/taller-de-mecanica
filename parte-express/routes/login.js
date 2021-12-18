var express = require('express');
var {consultarUsuario} = require('../controladores/CRUDusuarios');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const usuario = await consultarUsuario(parseInt(req.query.id), req.query.pass);
    res.send(usuario);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;

