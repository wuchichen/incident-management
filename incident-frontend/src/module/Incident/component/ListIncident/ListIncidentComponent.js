import "./ListIncidentComponent.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import AuthService from "../../../../service/AuthService";
import IncidentService from "../../../../service/IncidentService";

const ListIncidentComponent = (props) => {
  const pageLimit = 5;
  const [incidents, setIncidents] = useState(null);
  const [pagination, setPagination] = useState([]);
  const [query, setQuery] = useState({});
  const [statusOptions] = useState([
    { value: "- Status -", key: "" },
    { value: "Pending", key: "pending" },
    { value: "In Progress", key: "in progress" },
    { value: "Resolved", key: "resolved" },
  ]);
  const [sortOptions] = useState([
    { value: "- Sort By -", key: "" },
    { value: "Name", key: "name" },
    { value: "Created Date", key: "createdAt" },
    { value: "Updated Date", key: "updatedAt" },
    { value: "Status", key: "status" },
  ]);
  const [role] = useState(() => {
    return AuthService.getRole();
  });

  const formatDate = (milliseconds) => {
    const date = new Date(milliseconds);
    return date.toLocaleDateString();
  };

  const makeQuery = async (page = 1) => {
    const name = document.querySelector("#name-selector").value;
    const status = document.querySelector("#status-selector").value;
    const sortBy = document.querySelector("#sortBy-selector").value;

    const queryObj = {
      ...(name && { name }),
      ...(status && { status }),
      ...(sortBy && { sortBy }),
      page: page,
      limit: pageLimit,
    };
    setQuery(queryObj);
    getIncidents(queryObj);
  };

  const onPageClick = (e, page) => {
    makeQuery(page);
  };

  const onDeleteBtnClick = (e, incidentId) => {
    IncidentService.deleteIncident(incidentId).then((_) => {
      getIncidents(query);
    });
  };

  const getIncidents = async (queryObj) => {
    return IncidentService.getIncidents(queryObj).then((data) => {
      // set incidents
      setIncidents(data.docs);

      // set pagination
      let items = [];
      for (let i = 1; i <= data.totalPages; i++) {
        items.push(
          <Pagination.Item
            onClick={(e) => {
              onPageClick(e, i);
            }}
            key={i}
            active={i === data.page}
          >
            {i}
          </Pagination.Item>,
        );
      }
      setPagination(items);

      return data.docs;
    });
  };

  // Init page with async data
  useEffect(() => {
    // async call
    getIncidents({ page: 1, limit: pageLimit });
  }, []);

  return (
    <div className="ListIncidentComponent">
      <div className="d-flex justify-content-between align-items-center">
        <h1>List Incidents</h1>

        {role === "admin" && (
          <Link to="/incidents/create">
            <button className="btn btn-outline-info">Create Incident</button>
          </Link>
        )}
      </div>

      <div className="row mt-4">
        <div className="col-sm-4">
          <input
            id="name-selector"
            type="search"
            className="form-control rounded"
            placeholder="Search By Name"
            onChange={makeQuery}
          />
        </div>

        <div className="col-sm-4">
          <select
            id="status-selector"
            className="form-control"
            onChange={makeQuery}
          >
            {statusOptions &&
              statusOptions.map((status, idx) => (
                <option key={idx} value={status.key}>
                  {status.value}
                </option>
              ))}
          </select>
        </div>

        <div className="col-sm-4">
          <select
            id="sortBy-selector"
            className="form-control"
            onChange={makeQuery}
          >
            {sortOptions &&
              sortOptions.map((sortBy, idx) => (
                <option key={idx} value={sortBy.key}>
                  {sortBy.value}
                </option>
              ))}
          </select>
        </div>
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Assigner</th>
            <th>Assignee</th>
            <th>Acknowledged</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>

        <tbody>
          {incidents &&
            incidents.map((incident, idx) => (
              <tr key={idx}>
                <th>
                  <Link to={`/incidents/${incident._id}`}>
                    <button className="btn btn-action btn-outline-info py-0 m-0">
                      Edit
                    </button>
                  </Link>

                  {role === "admin" && (
                    <button
                      className="btn btn-action btn-outline-danger py-0 m-0"
                      onClick={(e) => {
                        onDeleteBtnClick(e, incident._id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </th>
                <th>{incident.name}</th>
                <td>
                  {statusOptions.find((s) => s.key === incident.status).value}
                </td>
                <td>
                  {incident.assigner?.firstName} {incident.assigner?.lastName}
                </td>
                <td>
                  {incident.assignee?.firstName} {incident.assignee?.lastName}
                </td>
                <td>{incident.acknowledged ? "Yes" : "No"}</td>
                <td>{formatDate(incident.createdAt)}</td>
                <td>{formatDate(incident.updatedAt)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination>{pagination}</Pagination>
    </div>
  );
};

export default ListIncidentComponent;
