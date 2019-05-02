import React, { Component } from "react";
import CurrentWeather from "./components/weather/CurrentWeather";
// import StockTicker from "./components/StockTicker/StockTicker";
import Ticker from "./components/StockTicker/Ticker";

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
          {/* <StockTicker /> */}
        </div>
      </div>
    );
  }
}

export default App;
