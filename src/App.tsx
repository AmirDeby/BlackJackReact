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
        <h1 style={{marginBottom:"33px",padding:"10px"}}><u><b>Welcome To My Black Jack Game</b></u></h1>
        {/* <img src={"/cards/icon.png"}/> */}
        <Game />
      </div>
    );
  }
}

export default App;
