import React, {Fragment} from 'react';

export default function Bienvenida() {
  return (
    <Fragment>
      <h1 className="display-7 text-center">Bienvenido [Nombre del usuario]</h1>
      <img className="img-fluid" style={{maxHeight: '80vh', margin: 'auto', display: 'block'}} src={process.env.PUBLIC_URL + '/img/usuarios/usuario.jpg'} alt="[Nombre del usuario]"/>
    </Fragment>
  );
}

