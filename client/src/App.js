import React, { Component } from "react";
import CurrentWeather from "./components/weather/CurrentWeather";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CurrentWeather />
        </header>
      </div>
    );
  }
}

export default App;
