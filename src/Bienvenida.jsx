import React from 'react';

export function Bienvenida() {
  return (
    <div className="container col-10 backgroundNav">
      <h1 className="display-7 text-center">Bienvenido [Nombre del usuario]</h1>
      <img className="img-fluid" style={{maxHeight: '80vh', margin: 'auto', display: 'block'}} src={process.env.PUBLIC_URL + '/img/usuarios/usuario.jpg'} alt="[Nombre del usuario]"/>
    </div>
  );
}

