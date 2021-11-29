import React from 'react';

export default function MensajeError(props) {
  const error = props.error?
    <div className="row">
      <div className="alert alert-danger" role="alert">{props.error}</div>
    </div>:
    <React.Fragment></React.Fragment>;

  return (
    <React.Fragment>{error}</React.Fragment>
  );
};

