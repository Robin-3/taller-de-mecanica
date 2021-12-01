import React from 'react';
import MensajeError from '../componentes/MensajeError';
import InputText from '../componentes/InputText';

export default class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identificacion: '',
      contrasena: '',
    };
  };

  render() {
    return (
      <div className="w-100" style={{backgroundColor: '#8c8c8c',}}>
        <div className="row align-items-start w-100">
          <div className="container col-10 backgroundNav">
            <div className="row mt-3">
                <img className="img-fluid" src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Taller de mecánica" style={{maxWidth: '50vw', margin: 'auto', display: 'block',}} />
            </div>
            <br />
            <br />
            <MensajeError error={this.props.error} />
            <div className="row text-center">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="row" >
                <InputText classInput="col-9" id="identifiacion-registro" label="Identificación" classLabel="col-3" obtenerInfo={(dato) => this.setState({identificacion: dato})}/>
                <InputText classInput="col-9" type="password" id="contrasena-registro" label="Contraseña" classLabel="col-3" obtenerInfo={(dato) => this.setState({contrasena: dato})}/>
              </div>
              <br />
              <div className="row">
                <div className="text-center">
                  <button className="btn btn-success" onClick={() => this.props.validarRegistro(this.state)}>Ingresar</button>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="text-center text-primary">
                  <p>Si olvido la contraseña, por favor contacte al departamento administrativo</p>
                  </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

