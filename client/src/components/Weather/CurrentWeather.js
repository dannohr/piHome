import React from "react";
import axios from "axios";
import moment from "moment";
import Ticker from "../Ticker/Ticker";

import "./CurrentWeather.css";

class CurrentWeather extends React.Component {
  state = {
    outsideTemp: undefined,
    insideTemp: 6,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    asOf: undefined
  };

  componentWillMount() {
    // // load current data
    // this.handleGetCurrentWeather();
    // this.handleGetCurrentThermostatStatus();
    // // set interval to update every minute
    // this.interval = setInterval(
    //   () => {
    //     this.handleGetCurrentWeather();
    //     this.handleGetCurrentThermostatStatus();
    //     console.log("Updated Weather Info");
    //   },
    //   60000 // refresh every 60 seconds
    // );
  }

  componentDidMount() {
    // load current data
    this.handleGetCurrentWeather();
    this.handleGetCurrentThermostatStatus();

    // set interval to update every minute
    this.interval = setInterval(
      () => {
        this.handleGetCurrentWeather();
        this.handleGetCurrentThermostatStatus();
        console.log("Updated Weather Info");
      },
      60000 // refresh every 60 seconds
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    console.log("stopped interval");
  }

  handleGetCurrentWeather() {
    axios
      .get("/api/weather/current")
      .then(response => {
        let currentTime = moment(new Date()).format("MMMM Do YYYY, h:mm a");
        this.setState({
          outsideTemp: response.data.main.temp,
          city: response.data.name,
          country: response.data.sys.country,
          humidity: response.data.main.humidity + "%",
          description: response.data.weather[0].description,
          asOf: currentTime,
          error: ""
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleGetCurrentThermostatStatus() {
    axios
      .get("/api/thermostat/status")
      .then(response => {
        this.setState({
          insideTemp: response.data.temp
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="WeatherInfo">
          {this.state.outsideTemp && (
            <p className="WeatherRow">
              Outside Temp:
              <span>
                {" "}
                {Math.round(this.state.outsideTemp)}
                &deg;F
              </span>
            </p>
          )}

          {this.state.insideTemp && (
            <p className="WeatherRow">
              Inside Temp:
              <span>
                {" "}
                {Math.round(this.state.insideTemp)}
                &deg;F
              </span>
            </p>
          )}

          {this.state.time && (
            <p className="WeatherRow">
              Current Time:
              <span>{this.state.time}</span>
            </p>
          )}

          {this.state.humidity && (
            <p className="WeatherRow">
              Humidity:
              <span> {this.state.humidity}</span>
            </p>
          )}

          {this.state.description && (
            <p className="WeatherRow">
              Conditions:
              <span> {this.state.description}</span>
            </p>
          )}

          {this.state.error && <p>{this.state.error}</p>}
        </div>
        <Ticker />
      </div>
    );
  }
}
export default CurrentWeather;
