import React from "react";
import axios from "axios";
import moment from "moment";

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
    this.handleGetCurrentWeather();
    this.handleGetCurrentThermostatStatus();
  }

  componentDidMount() {
    this.interval = setInterval(
      () => {
        this.handleGetCurrentWeather();
        this.handleGetCurrentThermostatStatus();
      },
      60000 // refresh every 60 seconds
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleGetCurrentWeather() {
    axios
      .get("/api/weather/current")
      .then(response => {
        let currentTime = moment(new Date()).format("MMMM Do YYYY, h:mm a");
        console.log(currentTime);
        this.setState({
          outsideTemp: response.data.main.temp,
          city: response.data.name,
          country: response.data.sys.country,
          humidity: response.data.main.humidity + "%",
          description: response.data.weather[0].description,
          asOf: currentTime,
          error: ""
        });
        console.log(this.state);
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
        console.log(this.state);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="weather-info">
          {this.state.outsideTemp && (
            <p className="weather__key">
              Outside Temp:
              <span className="weather__value">
                {" "}
                {Math.round(this.state.outsideTemp)}
                &deg;F
              </span>
            </p>
          )}

          {this.state.insideTemp && (
            <p className="weather__key">
              Inside Temp:
              <span className="weather__value">
                {" "}
                {Math.round(this.state.insideTemp)}
                &deg;F
              </span>
            </p>
          )}

          {this.state.time && (
            <p className="weather__key">
              Current Time:
              <span className="weather__value">{this.state.time}</span>
            </p>
          )}

          {this.state.humidity && (
            <p className="weather__key">
              Humidity:
              <span className="weather__value"> {this.state.humidity}</span>
            </p>
          )}

          {this.state.description && (
            <p className="weather__key">
              Conditions:
              <span className="weather__value"> {this.state.description}</span>
            </p>
          )}

          {this.state.asOf && (
            <p className="weather__key">
              As of:
              <span className="weather__value"> {this.state.asOf}</span>
            </p>
          )}

          {this.state.error && (
            <p className="weather__error">{this.state.error}</p>
          )}
        </div>
      </div>
    );
  }
}
export default CurrentWeather;
