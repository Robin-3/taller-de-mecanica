var express = require('express');
var {consultarVehiculos, consultarVehiculo, agregarVehiculo, editarVehiculo, eliminarVehiculo, editarAsignaciones} = require('../controladores/CRUDvehiculos');
var {consultarUsuario} = require('../controladores/CRUDusuarios');
var {consultarServicios} = require('../controladores/CRUDservicios');
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

router.get('/citas', async function(req, res, next) {
  try {
    const consultar = await consultarServicios();
    const veh = await consultarVehiculos();
    const hoy = new Date();
    let servicios = [];
    for(servicio of consultar) {
      if(servicio.disponible) {
        const s = {};
        s.nombre = cambioNombre(servicio.nombre);
        s.servicioDB = servicio.nombre;
        s.costo = servicio.costo;
        s.descripcion = servicio.descripcion;
        s.duracion = servicio.duracion + ' minutos';
        s.servicios = []
        for(const m of servicio.mecanico) {
          let existeAsignaciones = [];
          for(const v of veh) {
            for(const asig of v.asignaciones) {
              if(asig.usuario === m && asig.servicio === servicio.nombre) {
                existeAsignaciones.push({hora: asig.fecha, asignacion: v.placa, reparado: asig.reparado});
              }
            }
          }
          let horas = [];
          for(let j = 0; j < parseInt(req.query.dias); j++) {
            for(let i = parseInt(req.query.inicio); i < parseInt(req.query.fin); i += servicio.duracion) {
              const a = {};
              let date = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+(hoy.getDate()+j)+'T';
              let time = ('0'+Math.floor(i/60)).slice(-2) + ':' + ('0'+(i%60)).slice(-2) + ':00.000Z';
              a.hora = new Date(date+time);
              if(existeAsignaciones.length === 0) {
                a.reparado = false;
                a.asignacion = '';
              } else {
                for(const asig of existeAsignaciones) {
                  if((new Date(asig.hora)).getTime() === (new Date(date+time)).getTime()) {
                    a.asignacion = asig.asignacion;
                    a.reparado = asig.reparado;
                    break;
                  } else {
                    a.asignacion = '';
                    a.reparado = false;
                  }
                }
              }
              horas.push(a);
            }
          }
          const mec = await consultarUsuario(m);
          s.servicios.push({mecanico: mec.nombre, horas, id: m});
        }
        servicios.push(s);
      }
    }
    res.send(servicios);
  } catch (error) {
    res.send({error});
  }
});

router.put('/citas', async function(req, res, next) {
  try {
    const consultar = await consultarVehiculo(req.body.placa.toUpperCase());
    if(!consultar)
      res.send({placa: 'Not found'});
    else {
      let asignaciones = [];
      for(const asignado of req.body.asignados) {
        asignaciones.push({servicio: req.body.servicio, fecha: new Date(asignado.fecha), reparado: asignado.reparado, usuario: asignado.mecanico});
      }
      let clone = asignaciones.slice();
      for(const asignado of consultar.asignaciones) {
        if(req.body.servicio !== asignado.servicio)
          asignaciones.push(asignado);
        /*else {
          for(const asig of clone) {
            console.log('comparar', asignado, asig);
            if(_.isEqual(asignado, asig))
              continue;

            const now = Date.now();
            // if it's a firebase timestamp
            const createdAt = (new Date(asignado.fecha).getTime());
            console.log(now, 'hola', createdAt);
            const oneDay = 24 * 60 * 60 * 1000;
            const menosDelDia = (now - createdAt) < oneDay;
            if(menosDelDia) {
              asignaciones.push(asignado);
              break;
            }
          }
        }*/
      }
      const vehiculo = {};
      vehiculo.placa = req.body.placa.toUpperCase();
      vehiculo.set = {asignaciones};
      await editarAsignaciones(vehiculo);
      vehiculo.mongo = 'Update';
      res.send(vehiculo);
    }
  } catch(error) {
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
          a.fecha = (new Date(asignacion.fecha)).toUTCString();
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
