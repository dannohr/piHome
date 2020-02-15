import React from "react";
import axios from "axios";
// import moment from "moment";
import DataTable from "../DataTable/DataTable";
import "./DailyUsageTable.css";

class DailyUsageTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: {
        columns: [
          {
            field: "id",
            title: "ID"
          },
          {
            field: "meterDate",
            title: "Read Date"
          },
          {
            field: "consumption",
            title: "kWh Used"
          }
        ],
        data: [
          {
            id: 590,
            meterDate: "2019-04-01",
            startRead: 11925.763,
            endRead: 11928.006,
            consumption: 2.235,
            createdAt: "2020-01-21T23:19:19.737Z",
            updatedAt: "2020-01-21T23:19:19.737Z"
          },
          {
            id: 591,
            meterDate: "2019-04-02",
            startRead: 11928.006,
            endRead: 11931.11,
            consumption: 3.101,
            createdAt: "2020-01-21T23:19:19.739Z",
            updatedAt: "2020-01-21T23:19:19.739Z"
          },
          {
            id: 592,
            meterDate: "2019-04-03",
            startRead: 11931.11,
            endRead: 11935.705,
            consumption: 4.601,
            createdAt: "2020-01-21T23:19:19.740Z",
            updatedAt: "2020-01-21T23:19:19.740Z"
          }
        ]
      }
    };
  }

  componentDidMount() {
    console.log(this.state);
    // this.handleGetUsageData();
    console.log(this.state);
  }

  handleGetUsageData() {
    axios
      .get("/api/meterReader/allDaily")
      .then(response => {
        console.log(response.data);

        // let labels = response.data.dataPoints.map(data =>
        //   moment(data.start, "MM/DD/YYYY hh:mm a").format("LT")
        // );

        // let data = response.data.dataPoints.map(data => data.consumption);
        // console.log(labels);
        // console.log(data);
        // this.setState({
        //   chartData: {
        //     labels: labels,
        //     datasets: []
        //   }
        // });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      // <div className="container">
      <DataTable
        data={this.state.tableData.data}
        columns={this.state.tableData.columns}
      />
      // </div>
    );
  }
}

// export default withStyles(styles, { withTheme: true })(DailyUsageTable);
export default DailyUsageTable;
