import React, { Component } from "react";

import Header from "./components/Header/Header";
// import Ticker from "./components/Ticker/Ticker";

import Routes from "./components/Routes/Routes";

import "./App.css";

class App extends Component {
  state = {
    headerTitle: "Current Weather",
    showTicker: true,
    showHeader: true
  };

  handleSetTitle = title => {
    console.log(title);
    this.setState({
      headerTitle: title
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.showHeader ? (
          <div className="Header">
            <Header
              headerTitle={this.state.headerTitle}
              updateHeaderTitle={this.handleSetTitle}
            />
          </div>
        ) : null}

        {/* <div className="Main"> */}
        <div className="Main">
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
