import React from "react";
import "./Thermostat.css";

function Thermostat() {
  return (
    <div className="wrapper">
      <div className="currentTemp">Indoor Temperature</div>
      <div className="targetTemp">Target Temperature</div>
    </div>
  );
}

export default Thermostat;
