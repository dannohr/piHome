import React, { Component } from "react";

import Header from "./components/Header/Header";
import Ticker from "./components/Ticker/Ticker";

import Routes from "./components/Routes/Routes";

import "./App.css";

class App extends Component {
  state = {
    headerTitle: "Current Weather",
    showTicker: false,
    showHeader: false
  };

  render() {
    return (
      <div className="App">
        {this.state.showHeader ? (
          <div className="Header">
            <Header headerTitle={this.state.headerTitle} />
          </div>
        ) : null}

        <div className="Main">
          <Routes />
        </div>

        {this.state.showTicker ? (
          <div className="Footer">
            <Ticker />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
