# Plataforma Taller de Vehículos

La empresa Taller De Mecánica ofrece servicios de reparación, mantenimiento, entre otros. Últimamente, la empresa Taller De Mecánica se ha encontrado a sí misma con el problema de que no tiene suficiente espacio para que sus clientes puedan parquear sus vehículos. Esto se debe a que no tienen una forma de medir en tiempo real la capacidad de sus instalaciones para dar cabida a vehículos. Por este motivo la empresa Taller De Mecánica lo ha contactado a usted y a su equipo para el desarrollo de una plataforma de agendamiento de citas para los diferentes servicios ofrecidos.

> - [ ] [Usuarios](#usuarios)
> - [ ] [Requisitos](#requisitos)
> - [Comandos](https://github.com/Robin-3/taller-de-mecanica/blob/main/Comandos.md)
> - [Rutas](https://github.com/Robin-3/taller-de-mecanica/blob/main/Rutas.md)

## Usuarios

- [ ] [Usuario de planta](#usuario-de-planta)
- [ ] [Usuario mecánico](#usuario-mecánico)
- [ ] [Administrador](#administrador)

### Usuario de planta

- [x] Configurar los servicios ofrecidos por el taller:
  - [x] Revisión de frenos.
  - [x] Pastillas.
  - [x] Discos.
  - [x] Suspensión.
  - [x] Amortiguadores.
  - [x] Cambio de aceite.
  - [x] Alineación.
  - [x] Rotación de llantas.
- [x] Para cada uno de los servicios se debe indicar:
  - [x] Descripción.
  - [x] Costo.
  - [x] Duración.
- [x] Modificar el estado de un servicio (disponible, no disponible).
- [x] Asignar un servicio a un usuario mecánico.
- [x] Ver agenda de citas por día de cada servicio.
- [x] Programar cita para un servicio indicando la placa del vehículo a revisar.
- [ ] \(Falta: 24 horas de antelación) Cancelar una cita previamente solicitada (con mínimo 24 horas de antelación).
- [ ] \(Falta: Actualizar al asignar citas) Generar los reportes de:
  - [x] Servicio más solicitado.
  - [x] Servicio menos solicitado.
  - [x] Listado de mecánicos y sus asignaciones por día.
  - [x] Servicios completados.

### Usuario mecánico

- [x] Asignar el estado de completado a un servicio.
- [x] Ver listado de sus asignaciones.
- [x] Añadir comentarios sobre el estado del vehículo de un servicio.
- [x] Cambiar estado (pendiente, reparado)

### Administrador

- [ ] Gestionar los usuarios de planta y mecánicos.
- [ ] Ejerce control total de la plataforma.

## Requisitos

- [ ] Los datos suministrados por los usuarios deben cumplir la política de privacidad de datos vigente:
  - [ ] Contraseñas de los usuarios deben almacenarse de forma cifrada.
  - [ ] La conexión al servidor debe realizarse de forma segura.
- [x] La base de datos debe ser no relacional.
- [x] Se debe utilizar una arquitectura desacoplada
  - [x] Una API back end
  - [x] Un front end que consuma dicha API.
- [x] La API back end debe estar desarrollada en Express.js.
- [x] El front end debe estar desarrollado en React.js.
- [x] Se debe utilizar Bootstrap como librería CSS para manejar los estilos de su aplicación.

