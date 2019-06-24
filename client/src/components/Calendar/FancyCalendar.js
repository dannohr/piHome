import React from "react";
import axios from "axios";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import "./react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue"
    }
  });

class FancyCalendar extends React.Component {
  state = {
    events: []
  };

  handleGetCalendarData = () => {
    axios
      .get("/api/calendar")
      .then(response => {
        let allEvents = response.data;

        this.setState({
          events: allEvents
        });
        console.log(this.state);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    // load current data
    this.handleGetCalendarData();

    // set interval to update every minute
    // this.interval = setInterval(
    //   () => {
    //     this.handleGetCurrentWeatherOpenweather();

    //     console.log("Updated Weather Info");
    //   },
    //   1800000 // refresh every 1,800 seconds, 30 mins
    // );
  }

  render() {
    return (
      <BigCalendar
        events={this.state.events}
        views={["month", "week"]}
        step={60}
        showMultiDayTimes
        components={{
          timeSlotWrapper: ColoredDateCellWrapper
        }}
        localizer={localizer}
      />
    );
  }
}

export default FancyCalendar;
