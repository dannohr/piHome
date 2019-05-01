import React from "react";
import Weather from "./Weather";
import Form from "./Form";
// import SWeather from "./components/stateless_weather";
// import SForm from "./components/stateless_form"
import Titles from "./Titles";

const Api_Key = process.env.REACT_APP_WEATHER_API_KEY;

class WeatherWidget extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  //getWeather is a method we'll use to make the api call
  getWeather = async e => {
    const city = "Dallas"; //e.target.elements.city.value;
    const country = "us"; //e.target.elements.country.value;
    e.preventDefault();
    const api_call = await fetch(`/api/weather/current`);
    const response = await api_call.json();
    console.log(response);
    if (city && country) {
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        error: "Please input search values..."
      });
    }
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default WeatherWidget;
