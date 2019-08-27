import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Components
import { EventList, EventDetail } from "pages";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={EventList} />
      <Route exact path="/event/:id" component={EventDetail} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
