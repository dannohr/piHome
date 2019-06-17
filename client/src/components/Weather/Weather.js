import React from "react";
import Ticker from "../Ticker/Ticker";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";

import "./Weather.css";

class Weather extends React.Component {
  render() {
    return (
      <div className="Wrapper">
        <CurrentWeather />
        <DailyForecast />
        <Ticker />
      </div>
    );
  }
}
export default Weather;
