import React from 'react';
import './App.css';
import { Game } from './Components/Game/Game';

export interface IAppState {

}
class App extends React.Component<any, IAppState> {
  state: IAppState = {

  }
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
