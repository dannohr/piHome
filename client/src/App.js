import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import CurrentWeather from "./components/Weather/CurrentWeather";
import Header from "./components/Header/Header";
import Ticker from "./components/Ticker/Ticker";
import Recipes from "./components/Recipes/Recipes";
import Thermostat from "./components/Thermostat/Thermostat";
import Calendar from "./components/Calendar/Calendar";

import "./App.css";

class App extends Component {
  state = {
    headerTitle: "Current Weather"
  };

  render() {
    return (
      <div className="App">
        <Header headerTitle={this.state.headerTitle} />

        <Router>
          <div className="Main">
            <Route exact path="/" component={CurrentWeather} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/thermostat" component={Thermostat} />
            <Route path="/calendar" component={Calendar} />
          </div>
        </Router>

        <div className="Footer">
          <Ticker />
        </div>
      </div>
    );
  }
}

export default App;
