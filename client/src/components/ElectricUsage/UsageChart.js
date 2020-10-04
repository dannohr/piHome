import React from "react";
import { Line } from "react-chartjs-2";

import "./PeriodUsage.css";

function UsageChart(props) {
  let chartData = {
    labels: props.labels,
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
        data: props.dailyData,
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
        data: props.avgDailyConsumption,
      },
      {
        label: "Average Remaining (kWh)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(0,128,0,1)",
        borderColor: "rgba(0,128,0,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(0,128,0,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(192,75,75,1)",
        pointHoverBorderColor: "rgba(192,75,75,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.avgRemaining,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div>
        <article className="canvas-container">
          <Line data={chartData} options={options} />
        </article>
      </div>
    </div>
  );
}
export default UsageChart;
