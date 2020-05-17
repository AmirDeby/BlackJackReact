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
        <h3 style={{ marginBottom: "18px" }}>BL<img alt="icon" className="icon-img" src="/Heart.png" />ckJACK</h3>
        <Game />
      </div>
    );
  }
}

export default App;
