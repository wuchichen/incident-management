import Ajax from "./ajax";
import AuthService from "./AuthService";

const createIncident = async (incident) => {
  var url = "http://localhost:8080/api/v1/incidents";

  return Ajax.restCall(url, "post", {
    token: AuthService.getJWT(),
    data: incident,
  });
};

const getIncidents = async (queryObj) => {
  var url = "http://localhost:8080/api/v1/incidents";
  if (queryObj) {
    let keys = Object.keys(queryObj);
    let queryString = "";
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (i === 0) {
        queryString += `?${key}=${queryObj[key]}`;
      } else {
        queryString += `&${key}=${queryObj[key]}`;
      }
    }
    url += queryString;
  }

  return Ajax.restCall(url, "get", {
    token: AuthService.getJWT(),
  });
};

const getIncident = async (incidentId) => {
  var url = `http://localhost:8080/api/v1/incidents/${incidentId}`;

  return Ajax.restCall(url, "get", {
    token: AuthService.getJWT(),
  });
};

const updateIncident = async (incident) => {
  var url = `http://localhost:8080/api/v1/incidents/${incident._id}`;

  return Ajax.restCall(url, "put", {
    token: AuthService.getJWT(),
    data: incident,
  });
};

const deleteIncident = async (incidentId) => {
  var url = `http://localhost:8080/api/v1/incidents/${incidentId}`;

  return Ajax.restCall(url, "delete", {
    token: AuthService.getJWT(),
  });
};

const getAssignees = async () => {
  var url = `http://localhost:8080/api/v1/incidents/assignees/list`;

  return Ajax.restCall(url, "get", {
    token: AuthService.getJWT(),
  });
};

const IncidentService = {
  createIncident,
  getIncidents,
  getIncident,
  updateIncident,
  deleteIncident,
  getAssignees,
};
export default IncidentService;
