import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";

import "./OurCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class OurCalendar extends Component {
  state = {
    events: [],
  };

  handleGetCalendarData = () => {
    axios
      .get("/api/calendar")
      .then((response) => {
        let allEvents = response.data;

        this.setState({
          events: allEvents,
        });
        console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    // load current data
    this.handleGetCalendarData();
  }

  render() {
    console.log(this.state.events);
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default OurCalendar;
