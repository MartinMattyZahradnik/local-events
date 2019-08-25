import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Components
import EventList from "pages/eventList/EventList";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={EventList} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
