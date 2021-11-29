import React from 'react';

export default function InputList(props) {
  return (
    <React.Fragment>
      <label htmlFor={props.id} className={props.classLabel}>{props.label}</label>
      <select name={props.id} id={props.id} className={props.classInput}>
        {props.opciones.map((opcion) =>
          <option value={opcion} key={opcion}>{(opcion[0].toUpperCase()+opcion.substring(1)).replace(/-/g, ' ')}</option>
        )}
      </select>
    </React.Fragment>
  );
};

