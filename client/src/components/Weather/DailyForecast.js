import React from "react";
import axios from "axios";
import moment from "moment";

import "./DailyForecast.css";

class DailyForecast extends React.Component {
  state = {
    forecastData: null
  };

  componentDidMount() {
    // load current data
    this.handleGetDailyForecast();

    // set interval to update every minute
    this.interval = setInterval(
      () => {
        this.handleGetDailyForecast();
        console.log("Updated Forecast Info");
      },
      600000 // refresh every 600 seconds, 10 mins
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    console.log("stopped interval");
  }

  handleGetDailyForecast() {
    axios
      .get("/api/weather/forecast/daily")
      .then(response => {
        let forecastData = [];
        let totalCount = 0;

        // loop through returned data and get every 4th one (gives a datapoint every 12 hours)
        // limit the data array to 8 values
        for (let i = 0; i < response.data.list.length; i++) {
          if (i % 4 === 0 && totalCount < 8) {
            forecastData.push(response.data.list[i]);
            totalCount++;
          }
        }

        this.setState({
          forecastData: forecastData
        });
        console.log(this.state);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  columnData(list) {
    return list.map((listItem, index) => {
      let iconUrl =
        "http://openweathermap.org/img/w/" + listItem.weather[0].icon + ".png";
      return (
        <td key={index + 200} className="DailyData">
          <table className="DailyData">
            <tbody className="DailyData">
              <tr className="DailyData">
                <td key={index} className="TableHeader">
                  {moment.unix(listItem.dt).format("ddd")}
                </td>
              </tr>
              <tr>
                <td key={index + 100} className="DailyData">
                  {moment.unix(listItem.dt).format("h:mm a")}
                </td>
              </tr>
              <tr>
                <td key={index + 300} className="DailyTemp">
                  {Math.round(listItem.main.temp)}&deg;F
                </td>
              </tr>
              <tr>
                <td key={index + 500} className="DailyData">
                  {listItem.weather[0].main}
                </td>
              </tr>
              <tr>
                <td key={index + 400} className="DailyData">
                  <img className="DailyData" src={iconUrl} alt="new" />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      );
    });
  }

  render() {
    return (
      <div>
        <table className="DailyForecastTable">
          <tbody>
            <tr>
              {this.state.forecastData
                ? this.columnData(this.state.forecastData)
                : null}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default DailyForecast;
