import React, { Component } from "react";
import CurrentWeather from "./components/weather/CurrentWeather";
import Ticker from "./components/Ticker/Ticker";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CurrentWeather />
        </header>
        <div className="Footer">
          <Ticker />
        </div>
      </div>
    );
  }
}

export default App;
