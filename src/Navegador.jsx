import React from 'react';
import Bienvenida from './Bienvenida';
import Dashboard from './Dashboard';

export class Navegador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginas: {
        dashboard: <Dashboard />,
        bienvenida: <Bienvenida />,
      },
      actual: 'dashboard'
    };
  }

  render () {
    let paginaActual;
    if(this.state.actual === 'dashboard')
      paginaActual = this.state.paginas.dashboard;
    else
      paginaActual = this.state.paginas.bienvenida;
    return (
      <div className="container col-10 backgroundNav">
        {paginaActual}
      </div>
    )
  };
}

