import React from "react";
import axios from "axios";
// import moment from "moment";
import DataTable from "../DataTable/DataTable";
import "./DailyUsageTable.css";

class DailyUsageTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      columns: [
        {
          field: "meterDate",
          title: "Read Date",
          defaultSort: "desc"
        },
        {
          field: "consumption",
          title: "kWh Used"
        },
        {
          field: "id",
          title: "id"
        }
      ],
      data: []
    };
  }

  componentDidMount() {
    this.handleGetUsageData();
  }

  handleGetUsageData() {
    axios
      .get("/api/meterReader/allDaily")
      .then(response => {
        console.log("Data from Get All Request:");
        console.log(response.data);
        this.setState({ data: response.data, isLoading: false });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleAddUsageData(body) {
    console.log("adding data, body is:");
    console.log(body);
    axios
      .post("/api/meterReader/meterdata", body)
      .then(response => {
        console.log(response);
        // this.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleDeleteUsageData = id => {
    console.log("starting to delete");
    console.log(id);
    axios
      .delete("/api/meterReader/meterdata/" + id)
      .then(response => {
        console.log(response);
        this.handleGetUsageData();
        // this.setState({ isLoading: true });

        // this.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleUpdateUsageData = body => {
    let id = body.id;
    axios
      .put("/api/meterReader/meterdata/" + id, body)
      .then(response => {
        console.log(response);
        this.handleGetUsageData();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        {this.state.isLoading ? null : (
          <DataTable
            data={this.state.data}
            columns={this.state.columns}
            title="Some Title"
            handleDelete={this.handleDeleteUsageData}
            handleAdd={this.handleAddUsageData}
            handleUpdate={this.handleUpdateUsageData}
          />
        )}
      </div>
    );
  }
}

export default DailyUsageTable;
