import React from "react";
import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";

import "./PeriodUsage.css";

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
        maintainAspectRatio: false,
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
    axios
      .get("/api/meterReader/currentPeriod")
      .then(response => {
        console.log(response.data);
        this.setState({
          billingPeriod: response.data.billingPeriod,
          usageData: response.data.dailyData
        });

        let labels = response.data.dailyData.map(data =>
          moment(data.meterDate, "YYYY-MM-DD").format("ddd, MMM Do")
        );

        let dailyData = response.data.dailyData.map(data => data.consumption);
        let avgDailyConsumption = response.data.dailyData.map(
          data => data.avgDailyConsumption
        );

        this.setState({
          chartData: {
            labels: labels,
            datasets: [
              {
                label: "Daily Electric Usage (kWh)",
                fill: true,
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
                data: dailyData
              },
              {
                label: "Average Usage (kWh)",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(192,75,75,1)",
                borderColor: "rgba(192,75,75,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(192,75,75,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(192,75,75,1)",
                pointHoverBorderColor: "rgba(192,75,75,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: avgDailyConsumption
              }
            ]
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="headline">
          Billing Period:{" "}
          {moment(this.state.billingPeriod.billingStart).format("M/D/YY")} to{" "}
          {moment(this.state.billingPeriod.billingEnd).format("M/D/YY")}
        </div>

        <div className="linetwo">
          {this.state.billingPeriod.daysIntoPeriod} days into period,{" "}
          {this.state.billingPeriod.daysToGoInPeriod} days remaining
        </div>
        <div className="linethree">
          {Math.round(this.state.billingPeriod.totalConsumption * 10) / 10} kWh
          used for an average of{" "}
          {Math.round(this.state.billingPeriod.avgDailyConsumption * 10) / 10}{" "}
          per day
        </div>
        <div>
          <article className="canvas-container">
            {/* <Line data={data} options={options}/> */}
            <Line
              data={this.state.chartData}
              options={{ maintainAspectRatio: false }}
            />
          </article>
        </div>
      </div>
    );
  }
}
export default PeriodUsage;
