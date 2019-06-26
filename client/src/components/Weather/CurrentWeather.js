import React from "react";
import axios from "axios";
import moment from "moment";
import "./CurrentWeather.css";
// let accuSample = require("./SampleWeather.json");

const iconPath = process.env.PUBLIC_URL + "/weatherIcons/";
class CurrentWeather extends React.Component {
  state = {
    outsideTemp: 1,
    insideTemp: 1,
    humidity: 1,
    description: "unknown",
    error: undefined,
    asOf: undefined,
    weatherIcon: "01d"
  };

  componentDidMount() {
    // load current data
    // this.handleGetCurrentWeatherOpenweather();
    this.handleGetCurrentWeatherAccuweather();
    this.handleGetCurrentThermostatStatus();

    // set interval to update every minute
    this.interval = setInterval(
      () => {
        // this.handleGetCurrentWeatherOpenweather();
        this.handleGetCurrentWeatherAccuweather();
        this.handleGetCurrentThermostatStatus();

        console.log("Updated Weather Info");
      },
      1800000 // refresh every 1,800 seconds, 30 mins
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    console.log("stopped interval");
  }

  handleGetCurrentWeatherAccuweather() {
    // this.setState({
    //   outsideTemp: accuSample[0].Temperature.Imperial.Value,
    //   humidity: accuSample[0].RelativeHumidity + "%",
    //   description: accuSample[0].WeatherText,
    //   // asOf: currentTime,
    //   weatherIcon: accuSample[0].WeatherIcon,
    //   error: ""
    // });

    // console.log(this.state);

    axios
      .get("/api/weather/accuweather/current")
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

  handleGetCurrentWeatherOpenweather() {
    axios
      .get("/api/weather/openweather/current")
      .then(response => {
        console.log(response.data);
        let currentTime = moment(new Date()).format("MMMM Do YYYY, h:mm a");
        this.setState({
          outsideTemp: response.data.main.temp,
          humidity: response.data.main.humidity + "%",
          description: response.data.weather[0].description,
          asOf: currentTime,
          weatherIcon: response.data.weather[0].icon,
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
          <div className="WeatherIcon">
            <img
              // src={
              //   process.env.PUBLIC_URL +
              //   "/weatherIcons/" +
              //   this.state.weatherIcon +
              //   ".png"
              // }
              src={iconPath + this.state.weatherIcon + ".png"}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}
export default CurrentWeather;
