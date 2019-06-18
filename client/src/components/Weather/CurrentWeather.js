import React from "react";
import axios from "axios";
import moment from "moment";

import "./CurrentWeather.css";

class CurrentWeather extends React.Component {
  state = {
    outsideTemp: 1,
    insideTemp: 1,
    humidity: 1,
    description: "unknown",
    error: undefined,
    asOf: undefined,
    weatherIcon: "02"
  };

  componentDidMount() {
    // load current data
    this.handleGetCurrentWeather();
    this.handleGetCurrentThermostatStatus();

    // set interval to update every minute
    this.interval = setInterval(
      () => {
        this.handleGetCurrentWeather();

        console.log("Updated Weather Info");
      },
      1800000 // refresh every 1,800 seconds, 30 mins
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
        console.log(response.data[0]);
        let currentTime = moment(new Date()).format("MMMM Do YYYY, h:mm a");
        this.setState({
          outsideTemp: response.data[0].Temperature.Imperial.Value,
          humidity: response.data[0].RelativeHumidity + "%",
          description: response.data[0].WeatherText,
          asOf: currentTime,
          weatherIcon: response.data[0].WeatherIcon,
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
      <div className="Container">
        <div className="Column1" />
        <div className="Column2">
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
        </div>
        <div className="Column3">
          <img
            src={
              process.env.PUBLIC_URL +
              "/weatherIcons/" +
              this.state.weatherIcon +
              ".png"
            }
            alt=""
          />
        </div>
      </div>
    );
  }
}
export default CurrentWeather;
