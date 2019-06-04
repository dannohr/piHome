import React from "react";
import BigCalendar from "react-big-calendar";
import events from "./events";
import dates from "./dates";
import localizer from "react-big-calendar/lib/localizers/globalize";
import globalize from "globalize";
import moment from "moment";

import "./react-big-calendar.css";

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue"
    }
  });

const globalizeLocalizer = localizer(globalize);

let Basic = ({ localizer }) => (
  <BigCalendar
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    max={dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours")}
    defaultDate={new Date(2019, 6, 4)}
    components={{
      timeSlotWrapper: ColoredDateCellWrapper
    }}
    localizer={globalizeLocalizer}
  />
);

export default Basic;
