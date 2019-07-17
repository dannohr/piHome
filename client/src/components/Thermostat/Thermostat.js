import React from "react";
import { LineChart } from "react-chartkick";
import "chart.js";

import "./Thermostat.css";

class Thermostat extends React.Component {
  render() {
    return (
      <div className="Wrapper">
        <h1>Thermostat</h1>
        <LineChart data={{ "2017-05-13": 2, "2017-05-14": 5 }} />
      </div>
    );
  }
}
export default Thermostat;
