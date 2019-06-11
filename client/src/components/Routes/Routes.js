import React from "react";
import { Route, Switch } from "react-router-dom";

import Recipes from "../Recipes/Recipes";
import Thermostat from "../Thermostat/Thermostat";
import FancyCalendar from "../Calendar/FancyCalendar";
import Calendar from "../Calendar/Calendar";
import CurrentWeather from "../Weather/CurrentWeather";
import NotFound from "../NotFound/NotFound";

export default ({ childProps }) => (
  // <Router>
  <Switch>
    <Route exact path="/" component={FancyCalendar} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/thermostat" component={Thermostat} />
    <Route path="/calendar" component={FancyCalendar} />
    <Route path="/outlet1" component={Calendar} />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
  // </Router>
);
