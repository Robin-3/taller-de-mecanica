import React from 'react';

export default function HeaderInfo(props) {
  return (
    <div className="row align-items-center mb-3">
      <h2 className="text-success col">{props.titulo}</h2>
      <div className="col-md-auto">{props.usuarioNombre}</div>
      <div className="col-md-auto">{props.usuarioImagen}</div>
    </div>
  );
};

