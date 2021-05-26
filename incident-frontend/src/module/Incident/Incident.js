import "./Incident.css";
import { Route, Switch } from "react-router-dom";
import ListIncidentComponent from "./component/ListIncident/ListIncidentComponent";
import CreateIncidentComponent from "./component/CreateIncident/CreateIncidentComponent";
import EditIncidentComponent from "./component/EditIncident/EditIncidentComponent";
import { useState } from "react";
import AuthService from "../../service/AuthService";

const Incident = () => {
  const [role, setRole] = useState(() => {
    return AuthService.getRole();
  });
  return (
    <div className="Incident">
      <Switch>
        <Route
          exact
          path="/incidents"
          component={ListIncidentComponent}
        ></Route>

        {role === "admin" && (
          <Route
            exact
            path="/incidents/create"
            component={CreateIncidentComponent}
          ></Route>
        )}

        <Route
          path="/incidents/:incidentId"
          component={EditIncidentComponent}
        ></Route>
      </Switch>
    </div>
  );
};

export default Incident;
