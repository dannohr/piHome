import React from "react";
import BigCalendar from "react-big-calendar";
import events from "./events";
import localizer from "react-big-calendar/lib/localizers/globalize";
import globalize from "globalize";

import "./react-big-calendar.css";

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue"
    }
  });

const globalizeLocalizer = localizer(globalize);

let FancyCalendar = ({ localizer }) => (
  <BigCalendar
    events={events}
    views={["month", "week"]}
    step={60}
    showMultiDayTimes
    components={{
      timeSlotWrapper: ColoredDateCellWrapper
    }}
    localizer={globalizeLocalizer}
  />
);

export default FancyCalendar;
