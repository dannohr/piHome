import React, { Component } from "react";

import Header from "./components/Header/Header";
import Ticker from "./components/Ticker/Ticker";

import Routes from "./components/Routes/Routes";

import "./App.css";

class App extends Component {
  state = {
    headerTitle: "Current Weather"
  };

  render() {
    return (
      <div className="App">
        <div className="Header">
          <Header headerTitle={this.state.headerTitle} />
        </div>
        <div className="Main">
          <Routes />
        </div>

        <div className="Footer">
          <Ticker />
        </div>
      </div>
    );
  }
}

export default App;
