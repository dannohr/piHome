import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./react-big-calendar.css";
import moment from "moment";

export let navigate = {
  PREVIOUS: "PREV",
  NEXT: "NEXT",
  TODAY: "TODAY",
  DATE: "DATE"
};
let events = [
  {
    id: 14,
    title: "Maths",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  },
  {
    id: 15,
    title: "English",
    start: new Date(new Date().setHours(new Date().getHours() - 2)),
    end: new Date(new Date().setHours(new Date().getHours() + 2))
  }
];

// const localizer = BigCalendar.momentLocalizer(moment);
const localizer = momentLocalizer(moment);

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ":  " + event.desc}
    </span>
  );
}

function Book({ event }) {
  return (
    <div className="rbc-day-bg">
      <button>Book Class</button>
    </div>
  );
}

class CustomToolbar extends React.Component {
  render() {
    console.log(events);
    let {
      //   localizer: { messages },
      label
    } = this.props;
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            Prev
          </button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            Next
          </button>
        </span>
      </div>
    );
  }
  navigate = action => {
    this.props.onNavigate(action);
  };
}

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue"
    }
  });

const CalendarTest = props => (
  <div>
    <Calendar
      events={events}
      views={["month", "week"]}
      step={60}
      showMultiDayTimes
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
        toolbar: CustomToolbar,
        event: Event,
        dateCellWrapper: Book
      }}
      localizer={localizer}

      //   localizer={localizer}
      //   events={events}
      //   popup
      //   startAccessor="start"
      //   endAccessor="end"
      //   className={props.calendarIsOpen ? "open" : ""}
      //   components={{
      //     event: Event,
      //     toolbar: CustomToolbar,
      //     dateCellWrapper: Book
      //   }}
    />
  </div>
);

export default CalendarTest;
