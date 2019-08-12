import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// Components
import EventList from "components/pages/event-list/EventList";

export const history = createBrowserHistory();

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={EventList} />
      </Switch>
    </Router>
  );
};

export default Routes;
