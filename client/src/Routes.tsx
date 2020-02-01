import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Components

const EventList = lazy(() => import("pages/eventList/EventList"));
const EventDetail = lazy(() => import("pages/eventDetail/EventDetail"));
const LoginPage = lazy(() => import("pages//login/LoginPage"));
const PasswordReset = lazy(() => import("pages/passwordReset/PasswordReset"));
const RegisterUser = lazy(() => import("pages/registerUser/RegisterUser"));
const UpdateUser = lazy(() => import("pages/updateUser/UpdateUser"));
const CreateEvent = lazy(() => import("pages/createEvent/CreateEvent"));
const UpdateEvent = lazy(() => import("pages/updateEvent/UpdateEvent"));
const SetNewPassword = lazy(() =>
  import("pages/setNewPassword/SetNewPassword")
);
const MyEvents = lazy(() => import("pages/myEvents/MyEvents"));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default Routes;
