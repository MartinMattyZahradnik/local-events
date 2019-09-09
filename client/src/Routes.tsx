import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Components
import { EventList, EventDetail, LoginPage, PasswordReset } from "pages";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={EventList} />
      <Route exact path="/event/:id" component={EventDetail} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/password-reset" component={PasswordReset} />
      {/* <Route exact path="/register-user" component={RegisterUser} />  */}
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
