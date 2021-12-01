import React from 'react';

export default function InputText(props) {
  const valorDefecto = !!props.defecto;
  const input = valorDefecto?
    <input type={props.type || 'text'} id={props.id} className={props.classInput} onChange={(e) => props.obtenerInfo(e.target.value)} value={props.defecto || ''} />:
    <input type={props.type || 'text'} id={props.id} className={props.classInput} onChange={(e) => props.obtenerInfo(e.target.value)} />;

  return (
    <React.Fragment>
      <label htmlFor={props.id} className={props.classLabel}>{props.label}</label>
      {input}
    </React.Fragment>
  );
};

