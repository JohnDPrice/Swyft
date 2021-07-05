import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Hello from "../Components/Hello"
import Dashboard from "./Dashboard/Dashboard";
import LeadList from "./Lead/LeadList";
import LeadForm from "./Lead/LeadForm";
import LeadDetails from "./Lead/LeadDetails";
import ClientList from "./[Client]/ClientList";
import ClientDetails from "./[Client]/ClientDetails";
import ClientForm from "./[Client]/ClientForm";
import AppointmentCalendar from "./Appointment/Calendar";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
      <Route exact path="/">
          {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
      </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/leads">
          <LeadList />
        </Route>

        <Route path="/lead/add">
          <LeadForm />
        </Route>

        <Route exact path="/lead/edit/:leadId">
          <LeadForm />
        </Route>

        <Route exact path="/lead/:id">
          <LeadDetails />
        </Route>

        <Route path="/clients">
          <ClientList />
        </Route>

        <Route path="/client/add">
          <ClientForm/>
        </Route>

        <Route exact path="/client/:id">
          <ClientDetails />
        </Route>

        <Route exact path="/client/edit/:clientId">
          <ClientForm/>
        </Route>

        <Route exact path="/appointments">
          <AppointmentCalendar/>
        </Route>
      </Switch>
    </main>
  );
};