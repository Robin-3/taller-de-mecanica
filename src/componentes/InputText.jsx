import React from 'react';

export default function InputText(props) {
  return (
    <React.Fragment>
      <label htmlFor={props.id} className={props.classLabel}>{props.label}</label>
      <input type={props.type || "text"} id={props.id} className={props.classInput} onChange={(e) => props.obtenerInfo(e.target.value)} />
    </React.Fragment>
  );
};

