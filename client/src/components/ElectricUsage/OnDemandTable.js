import React from 'react';
import axios from 'axios';
// import moment from "moment";
import DataTable from '../DataTable/DataTable';
import './DailyUsageTable.css';

class OnDemandTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      columns: [
        {
          field: 'id',
          title: 'id',
          defaultSort: 'desc',
        },
        {
          field: 'correlationId',
          title: 'correlationId',
        },
        {
          field: 'statusReason',
          title: 'statusReason',
        },
        {
          field: 'registeredRead',
          title: 'registeredRead',
        },
        {
          field: 'readDate',
          title: 'readDate',
        },
      ],
      data: [],
    };
  }

  componentDidMount() {
    this.handleGetOnDemandData();
  }

  handleGetOnDemandData() {
    axios
      .get('/api/ondemand/ondemand')
      .then((response) => {
        console.log('Data from Get All onDemand data Request:');
        console.log(response);
        this.setState({ data: response.data, isLoading: false });
        console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleAddUsageData = (body) => {
    console.log('adding data, body is:');
    console.log(body);
    axios
      .post('/api/ondemand/ondemand', body)
      .then((response) => {
        console.log(response);
        this.handleGetOnDemandData();
        // this.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleDeleteUsageData = (id) => {
    console.log('starting to delete');
    console.log(id);
    axios
      .delete('/api/ondemand/ondemand/' + id)
      .then((response) => {
        console.log(response);
        this.handleGetOnDemandData();
        // this.setState({ isLoading: true });

        // this.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleUpdateUsageData = (body) => {
    let id = body.id;
    axios
      .put('/api/ondemand/ondemand/' + id, body)
      .then((response) => {
        console.log(response);
        this.handleGetOnDemandData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        {this.state.isLoading ? null : (
          // <p>Test</p>
          <DataTable
            data={this.state.data}
            columns={this.state.columns}
            title="On Demand Requests"
            handleDelete={this.handleDeleteUsageData}
            handleAdd={this.handleAddUsageData}
            handleUpdate={this.handleUpdateUsageData}
          />
        )}
      </div>
    );
  }
}

export default OnDemandTable;
