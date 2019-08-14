import React from "react";
import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";

class PeriodUsage extends React.Component {
  state = {
    chartData: {
      labels: [],
      datasets: [
        {
          label: "Daily Electric Usage (kWh)",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ],
      options: {
        scales: {
          yAxes: [
            {
              beginAtZero: true,
              ticks: {
                suggestedMin: 50,
                suggestedMax: 100
              }
            }
          ]
        }
      }
    },
    billingPeriod: {},
    usageData: []
  };

  componentDidMount() {
    // console.log(this.state);
    this.handleGetElectricData();
    // console.log(this.state);
  }

  handleGetElectricData() {
    // this.setS

    axios
      .get("/api/meterReader/currentPeriod")
      .then(response => {
        console.log(response.data);

        this.setState({
          billingPeriod: response.data.billingPeriod,
          usageData: response.data.data
        });

        console.log(this.state);

        // this.setState({
        //   userInfo: {
        //     ...this.state.userInfo,
        //     [event.target.id]: event.target.value
        //   }
        // });

        // let labels = response.data.dataPoints.map(data =>
        //   moment(data.start, "MM/DD/YYYY hh:mm a").format("LT")
        // );
        // let data = response.data.dataPoints.map(data => data.consumption);
        // console.log(labels);
        // console.log(data);
        // this.setState({
        //   chartData: {
        //     labels: labels,
        //     datasets: [
        //       {
        //         label: "Daily Electric Usage (kWh)",
        //         fill: false,
        //         lineTension: 0.1,
        //         backgroundColor: "rgba(75,192,192,0.4)",
        //         borderColor: "rgba(75,192,192,1)",
        //         borderCapStyle: "butt",
        //         borderDash: [],
        //         borderDashOffset: 0.0,
        //         borderJoinStyle: "miter",
        //         pointBorderColor: "rgba(75,192,192,1)",
        //         pointBackgroundColor: "#fff",
        //         pointBorderWidth: 1,
        //         pointHoverRadius: 5,
        //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //         pointHoverBorderColor: "rgba(220,220,220,1)",
        //         pointHoverBorderWidth: 2,
        //         pointRadius: 1,
        //         pointHitRadius: 10,
        //         data: data
        //       }
        //     ]
        //   }
        // });
        // console.log(response.data[0]);
        // let currentTime = moment(new Date()).format("MMMM Do YYYY, h:mm a");
        // this.setState({
        //   outsideTemp: response.data[0].Temperature.Imperial.Value,
        //   humidity: response.data[0].RelativeHumidity + "%",
        //   description: response.data[0].WeatherText,
        //   asOf: currentTime,
        //   weatherIcon: response.data[0].WeatherIcon,
        //   error: ""
        // });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <p>
          Billing Period Start{" "}
          {moment(this.state.billingPeriod.billingStart).format("M/D/YY")}
        </p>
        <p>
          Billing Period End{" "}
          {moment(this.state.billingPeriod.billingEnd).format("M/D/YY")}
        </p>
        <p>
          {this.state.billingPeriod.daysIntoPeriod} days into period and{" "}
          {this.state.billingPeriod.daysToGoInPeriod} days remaining
        </p>
        <p>
          {Math.round(this.state.billingPeriod.totalConsumption * 10) / 10} kWh
          used for an average of{" "}
          {Math.round(this.state.billingPeriod.avgDailyConsumption * 10) / 10}{" "}
          per day
        </p>
        {/* <Line data={this.state.chartData} />; */}
      </div>
    );
  }
}
export default PeriodUsage;
