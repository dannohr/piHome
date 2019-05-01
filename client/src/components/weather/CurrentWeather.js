import React from "react";
import axios from "axios";
import moment from "moment";

class CurrentWeather extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    asOf: undefined
  };

  componentWillMount() {
    this.handleGetCurrentWeather();
  }

  componentDidMount() {
    this.interval = setInterval(
      () => {
        this.handleGetCurrentWeather();
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
          temperature: response.data.main.temp,
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

  render() {
    return (
      <div>
        <div className="weather-info">
          {this.state.temperature && (
            <p className="weather__key">
              Temperature:
              <span className="weather__value">
                {" "}
                {Math.round(this.state.temperature)}
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
