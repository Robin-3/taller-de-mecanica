import React from 'react';

export default function Bienvenida(props) {
  return (
    <section className="container mb-3 mt-2">
      <h2 className="display-7 text-center">Bienvenido {props.usuarioNombre}</h2>
      <img className="img-fluid" style={{maxHeight: '81vh', margin: 'auto', display: 'block'}} src={process.env.PUBLIC_URL + '/img/usuarios/' + props.usuarioImagen} alt={props.usuarioNombre} />
    </section>
  );
}

