var express = require('express');
var crypto = require('crypto');
var {consultarUsuario, agregarUsuario, editarUsuario, eliminarUsuario} = require('../controladores/CRUDusuarios');

var router = express.Router();

router.post('/', async function(req, res, next) {
  try {
    const consultar = await consultarUsuario(parseInt(req.body.identificacion));
    const usuario = {};
    usuario.id = parseInt(req.body.identificacion);
    if(!consultar) {
      const hash = crypto.createHash('sha256');
      usuario.contrasena = hash.update(req.body.contrasena).digest('hex');
      usuario.rol = req.body.rol;
      usuario.imagen = req.body.imagen;
      usuario.nombre = req.body.nombre;
      await agregarUsuario(usuario);
      usuario.mongo = 'Insert';
      res.send(usuario);
    } else {
      usuario.set = {};
      for(const [key, value] of Object.entries(req.body)) {
        if(key === 'identificacion' || value === '' || key === 'confirmarContrasena')
          continue;
        if(key === 'contrasena') {
          const hash = crypto.createHash('sha256');
          usuario.set[key] = hash.update(value).digest('hex');
        } else
          usuario.set[key] = value;
      }
      await editarUsuario(usuario);
      usuario.mongo = 'Update';
      res.send(usuario);
    }
  } catch (error) {
    res.send({error});
  }
});

router.delete('/', async function(req, res, next) {
  try {
    const consultar = await consultarUsuario(parseInt(req.query.id));
    if(consultar) {
      await eliminarUsuario({id: parseInt(req.query.id)});
      res.send({id: req.query.id});
    } else
      res.send({id: 'Not found'});
  } catch (error) {
    res.send({error});
  }
});

module.exports = router;

