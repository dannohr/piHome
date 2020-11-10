import React from "react";
import { Route, Switch } from "react-router-dom";

import Recipes from "../Recipes/Recipes";
import Thermostat from "../Thermostat/Thermostat";
import FancyCalendar from "../Calendar/FancyCalendar";
import CustomHeader from "../Calendar/CustomHeader";
import Calendar from "../Calendar/Calendar";
import CalendarToolbar from "../Calendar/CalendarToolbar";
import Weather from "../Weather/Weather";
import NotFound from "../NotFound/NotFound";
import ElectricUsage from "../ElectricUsage/ElectricUsage";
// import PeriodUsage from "../ElectricUsage/PeriodUsage";
import MeterReadForm from "../MeterReadForm/MeterReadForm";
// import DailyUsageTable from "../ElectricUsage/DailyUsageTable";
import OnDemandTable from "../ElectricUsage/OnDemandTable";

export default ({ childProps }) => (
  // <Router>
  <Switch>
    <Route exact path="/" component={Weather} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/thermostat" component={Thermostat} />
    <Route path="/electricusage" component={ElectricUsage} />
    <Route path="/calendar" component={FancyCalendar} />
    <Route path="/custom" component={CustomHeader} />
    <Route path="/outlet1" component={Calendar} />
    <Route path="/outlet2" component={CalendarToolbar} />
    <Route path="/meterread" component={MeterReadForm} />
    {/* <Route path="/dailyusagetable" component={DailyUsageTable} /> */}
    <Route path="/ondemandtable" component={OnDemandTable} />
    {/* <Route path="/electricusage" component={PeriodUsage} />   OLD NOT USED ANYMORE*/}

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
  // </Router>
);
