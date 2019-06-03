import React, { Component } from "react";
import CurrentWeather from "./components/Weather1/CurrentWeather";
import Header from "./components/Header/Header";
import Ticker from "./components/Ticker/Ticker";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="Main">
          <CurrentWeather />
        </div>

        <div className="Footer">
          <Ticker />
        </div>
      </div>
    );
  }
}

export default App;
