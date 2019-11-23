import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Components
import {
  EventList,
  EventDetail,
  LoginPage,
  PasswordReset,
  RegisterUser,
  UpdateUser,
  CreateEvent,
  UpdateEvent,
  SetNewPassword,
  MyEvents
} from "pages";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={EventList} />
      <Route exact path="/event/:id" component={EventDetail} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/password-reset" component={PasswordReset} />
      <Route exact path="/set-new-password" component={SetNewPassword} />
      <Route exact path="/register-user" component={RegisterUser} />
      <Route exact path="/user/:id/update" component={UpdateUser} />
      <Route exact path="/user/:id/events" component={MyEvents} />
      <Route exact path="/create-event" component={CreateEvent} />
      <Route exact path="/event/:id/update" component={UpdateEvent} />

      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
