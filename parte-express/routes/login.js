var express = require('express');
var {consultarDashboard} = require('../controladores/CRUDdashboard');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const consultar = await consultarDashboard();
    res.send(consultar);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;

