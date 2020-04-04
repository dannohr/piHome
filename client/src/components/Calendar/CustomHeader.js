import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";

class CustomHeader extends React.Component {
  state = {
    events: []
  };

  handleGetCurrentEvents() {
    axios
      .get("/api/calendar")
      .then(response => {
        console.log(response.data);
        this.setState({
          events: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    // load current data
    this.handleGetCurrentEvents();
  }

  render() {
    // const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
    const localizer = momentLocalizer(moment);
    let MyCustomHeader = ({ label }) => (
      <div>
        {/* CUSTOM HEADER: */}
        <div>{label}</div>
        <MyOtherNestedComponent />
      </div>
    );

    let MyOtherNestedComponent = () => <div> </div>;

    return (
      <Calendar
        events={this.state.events}
        localizer={localizer}
        defaultDate={new Date(2019, 5, 12)}
        components={{
          day: { header: MyCustomHeader },
          week: { header: MyCustomHeader },
          month: { header: MyCustomHeader }
        }}
      />
    );
  }
}
export default CustomHeader;

//

// // let CustomHeader = ({ localizer }) => (

// const CustomHeader = props => (

// );
