# Plataforma Taller de Vehículos

La empresa Taller De Mecánica ofrece servicios de reparación, mantenimiento, entre otros. Últimamente, la empresa Taller De Mecánica se ha encontrado a sí misma con el problema de que no tiene suficiente espacio para que sus clientes puedan parquear sus vehículos. Esto se debe a que no tienen una forma de medir en tiempo real la capacidad de sus instalaciones para dar cabida a vehículos. Por este motivo la empresa Taller De Mecánica lo ha contactado a usted y a su equipo para el desarrollo de una plataforma de agendamiento de citas para los diferentes servicios ofrecidos.

> [ ] [Usuarios](#usuarios)
> [ ] [Requisitos](#requisitos)
> [Comandos](#comandos)

## Usuarios

- [ ] [Usuario de planta](#usuario-de-planta)
- [ ] [Usuario mecánico](#usuario-mecánico)
- [ ] [Administrador](#administrador)

### Usuario de planta

- [ ] Configurar los servicios ofrecidos por el taller:
  - [ ] Revisión de frenos.
  - [ ] Pastillas.
  - [ ] Discos.
  - [ ] Suspensión.
  - [ ] Amortiguadores.
  - [ ] Cambio de aceite.
  - [ ] Alineación.
  - [ ] Rotación de llantas.
- [ ] Para cada uno de los servicios se debe indicar:
  - [ ] Descripción.
  - [ ] Costo.
  - [ ] Duración.
- [ ] Modificar el estado de un servicio (disponible, no disponible).
- [ ] Asignar un servicio a un usuario mecánico.
- [ ] Ver agenda de citas por día de cada servicio.
- [ ] Programar cita para un servicio indicando la placa del vehículo a revisar.
- [ ] Cancelar una cita previamente solicitada (con mínimo 24 horas de antelación).
- [ ] Generar los reportes de:
  - [ ] Servicio más solicitado.
  - [ ] Servicio menos solicitado.
  - [ ] Listado de mecánicos y sus asignaciones por día.
  - [ ] Servicios completados.

### Usuario mecánico

- [ ] Asignar el estado de completado a un servicio.
- [ ] Ver listado de sus asignaciones.
- [ ] Añadir comentarios sobre el estado del vehículo de un servicio.
- [ ] Cambiar estado (pendiente, en reparación, reparado)

### Administrador

- [ ] Gestionar los usuarios de planta y mecánicos.
- [ ] Ejerce control total de la plataforma.

## Requisitos

- [ ] Los datos suministrados por los usuarios deben cumplir la política de privacidad de datos vigente:
  - [ ] Contraseñas de los usuarios deben almacenarse de forma cifrada.
  - [ ] La conexión al servidor debe realizarse de forma segura.
- [ ] La base de datos debe ser no relacional.
- [ ] Se debe utilizar una arquitectura desacoplada
  - [ ] Una API back end
  - [ ] Un front end que consuma dicha API.
- [x] La API back end debe estar desarrollada en Express.js.
- [x] El front end debe estar desarrollado en React.js.
- [x] Se debe utilizar Bootstrap como librería CSS para manejar los estilos de su aplicación.
