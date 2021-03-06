import React from "react";
import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";

class ElectricUsage extends React.Component {
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
    }
  };

  componentDidMount() {
    console.log(this.state);
    this.handleDailyElectricData();
    console.log(this.state);
  }

  handleDailyElectricData() {
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
      .get("/api/meterReader/today")
      .then(response => {
        console.log(response.data);
        let labels = response.data.dataPoints.map(data =>
          moment(data.start, "MM/DD/YYYY hh:mm a").format("LT")
        );
        let data = response.data.dataPoints.map(data => data.consumption);
        console.log(labels);
        console.log(data);
        this.setState({
          chartData: {
            labels: labels,
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
                data: data
              }
            ]
          }
        });
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
    // var config = {
    // 	type: 'line',
    // 	data: {
    // 		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    // 		datasets: [{
    // 			label: 'My First dataset',
    // 			backgroundColor: window.chartColors.red,
    // 			borderColor: window.chartColors.red,
    // 			data: [
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor()
    // 			],
    // 			fill: false,
    // 		}, {
    // 			label: 'My Second dataset',
    // 			fill: false,
    // 			backgroundColor: window.chartColors.blue,
    // 			borderColor: window.chartColors.blue,
    // 			data: [
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor(),
    // 				randomScalingFactor()
    // 			],
    // 		}]
    // 	},
    // 	options: {
    // 		responsive: true,
    // 		title: {
    // 			display: true,
    // 			text: 'Chart.js Line Chart'
    // 		},
    // 		tooltips: {
    // 			mode: 'index',
    // 			intersect: false,
    // 		},
    // 		hover: {
    // 			mode: 'nearest',
    // 			intersect: true
    // 		},
    // 		scales: {
    // 			xAxes: [{
    // 				display: true,
    // 				scaleLabel: {
    // 					display: true,
    // 					labelString: 'Month'
    // 				}
    // 			}],
    // 			yAxes: [{
    // 				display: true,
    // 				scaleLabel: {
    // 					display: true,
    // 					labelString: 'Value'
    // 				}
    // 			}]
    // 		}
    // 	}
    // };

    return <Line data={this.state.chartData} />;
  }
}
export default ElectricUsage;
