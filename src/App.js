import React, { Component } from 'react';
import './App.css';


/*Componentes */
import Header from "./components/header";
import Menu from "./components/menu";
import TabelaUserTodo from './components/tabelaTarefasUsuarios'

/*Componentes */

class App extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Menu />
        <TabelaUserTodo />        
      </div>
    );
  }
}

export default App;
