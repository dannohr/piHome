import React from "react";
import "./Thermostat.css";

function Thermostat() {
  return (
    <div className="wrapper">
      <div className="currentTemp">
        <h1 className="title">Indoor Temperature</h1>
        <h2 className="temp">71°</h2>
        <ul className="inlineList">
          <p className="nextChange">
            At 5:30 PM the target temp will be set to 75°
          </p>
          <p className="lastContact">
            Last thermostat contact was 09/02/2020 at 4:34 PM
          </p>
        </ul>
      </div>
      <div className="targetTemp">
        <h1 className="title">Target Temperature</h1>
      </div>
    </div>
  );
}

export default Thermostat;
