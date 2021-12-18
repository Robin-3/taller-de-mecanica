var express = require('express');
var {consultarServicios} = require('../controladores/CRUDdashboard');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const dashboard = await consultarServicios();
    const servicios = {};
    for(const [key, value] of Object.entries(dashboard)) {
      let newKey = '';
      switch(key) {
        case 'aceite':
          newKey = 'Cambio de aceite';
          break;
        case 'alineacion':
          newKey = 'Alineación';
          break;
        case 'amortiguadores':
          newKey = 'Amortiguadores';
          break;
        case 'discos':
          newKey = 'Cambio de aceite';
          break;
        case 'frenos':
          newKey = 'Revisión de frenos';
          break;
        case 'pastillas':
          newKey = 'Pastillas';
          break;
        case 'rotacion':
          newKey = 'Rotación de llantas';
          break;
        case 'suspension':
          newKey = 'Suspensión';
          break;
      }
      servicios[newKey] = value;
    }
    res.send(servicios);
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;

