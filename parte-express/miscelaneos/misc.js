function renombrarServicios(s) {
  const servicios = {};
  for(const [key, value] of Object.entries(s)) {
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
        newKey = 'Discos';
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
      default:
        newKey = 'Falta :'+key;
    }
    servicios[newKey] = value;
  }
  return servicios;
}

module.exports = {renombrarServicios};

