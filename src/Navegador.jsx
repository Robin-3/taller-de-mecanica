import React from 'react';
import Menu from './Menu';
import Bienvenida from './Bienvenida';
import Dashboard from './Dashboard';

export class Navegador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginas: {
        bienvenida: <Bienvenida />,
        dashboard: <Dashboard />,
      },
      actual: 'bienvenida',
    };
  }

  render () {
    let paginaActual;
    if(this.state.actual === 'dashboard')
      paginaActual = this.state.paginas.dashboard;
    else
      paginaActual = this.state.paginas.bienvenida;

    return (
      <Menu actual={paginaActual} cargarPagina={(p) => this.setState({actual: p})} />
    )
  };
}

