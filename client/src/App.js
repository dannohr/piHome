import React, { Component } from "react";
import WeatherWidget from "./components/weather/WeatherWidget";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <WeatherWidget />
        </header>
      </div>
    );
  }
}

export default App;
