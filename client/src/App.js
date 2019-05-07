import React, { Component } from "react";
import CurrentWeather from "./components/Weather/CurrentWeather";
import MenuButtons from "./components/MenuButton/MenuButtons";
import Ticker from "./components/Ticker/Ticker";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuButtons />
        <CurrentWeather />

        <div className="Footer">
          <Ticker />
        </div>
      </div>
    );
  }
}

export default App;
