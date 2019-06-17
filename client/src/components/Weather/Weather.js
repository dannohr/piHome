import React from "react";
import Ticker from "../Ticker/Ticker";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";

import "./CurrentWeather.css";

class Weather extends React.Component {
  render() {
    return (
      <div>
        <CurrentWeather />
        <DailyForecast />
        <Ticker />
      </div>
    );
  }
}
export default Weather;
