import React from "react";
// import axios from "axios";
import BigCalendar from "react-big-calendar";
import events from "./events";

import moment from "moment";

import "./react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue"
    }
  });

// let handleGetCalendarData = () => {
//   axios
//     .get("/api/calendar")
//     .then(response => {
//       console.log(response);
//       return response;
//       // this.setState({
//       //   outsideTemp: response.data.main.temp,
//       //   city: response.data.name,
//       //   country: response.data.sys.country,
//       //   humidity: response.data.main.humidity + "%",
//       //   description: response.data.weather[0].description,
//       //   asOf: currentTime,
//       //   error: ""
//       // });
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// };

let FancyCalendar = () => {
  return (
    <BigCalendar
      events={events}
      views={["month", "week"]}
      step={60}
      showMultiDayTimes
      components={{
        timeSlotWrapper: ColoredDateCellWrapper
      }}
      localizer={localizer}
    />
  );
};

export default FancyCalendar;
