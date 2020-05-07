import React from 'react';
import './App.css';
import { ICard } from './cardModel';
import Card from './Components/Card/Card';
import shuffle from 'lodash.shuffle';



export interface IAppState {

}

class App extends React.Component<any, IAppState> {
  state: IAppState = {

  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
