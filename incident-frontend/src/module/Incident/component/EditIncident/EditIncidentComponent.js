import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../../../service/AuthService";
import IncidentService from "../../../../service/IncidentService";

const EditIncidentComponent = (props) => {
  const history = useHistory();

  const params = useParams();

  const [incident, setIncident] = useState(null);

  const [role] = useState(() => {
    return AuthService.getRole();
  });

  const [statusOptions] = useState([
    { value: "Pending", key: "pending" },
    { value: "In Progress", key: "in progress" },
    { value: "Resolved", key: "resolved" },
  ]);

  const getIncident = async (incidentId) => {
    return IncidentService.getIncident(incidentId).then((data) => {
      if (!data.assignee) {
        data.assignee = "";
      }
      setIncident(data);
      return data;
    });
  };

  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    getIncident(params.incidentId);

    IncidentService.getAssignees().then((data) => {
      setAssignees(data);
    });
  }, []);

  function onSubmitBtnClick(e) {
    IncidentService.updateIncident(incident).then((data) => {
      toast.success("Edit successfully");
      history.push("/incidents");
    });
  }

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setIncident({
      ...incident,
      [name]: value,
    });
  }

  return (
    incident && (
      <div className="EditIncidentComponent">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Edit Incident</h1>
        </div>

        <form>
          {/* name */}
          <div className="form-group row mt-4">
            <label htmlFor="name" className="col-sm-2 font-weight-bold">
              Name
            </label>
            <input
              disabled={role === "user" ? true : false}
              type="text"
              className="form-control col-sm-7"
              name="name"
              value={incident.name}
              onChange={handleChange}
            />
          </div>

          {/* description */}
          <div className="form-group row mt-4">
            <label htmlFor="description" className="col-sm-2 font-weight-bold">
              Description
            </label>
            <input
              disabled={role === "user" ? true : false}
              type="text"
              className="form-control col-sm-7"
              name="description"
              value={incident.description}
              onChange={handleChange}
            />
          </div>

          {/* assigner */}
          <div className="form-group row mt-4">
            <label htmlFor="assigner" className="col-sm-2 font-weight-bold">
              Assigner
            </label>
            <input
              disabled
              type="text"
              className="form-control col-sm-7"
              name="assigner"
              value={`${incident.assigner?.firstName} ${incident.assigner?.lastName}`}
              onChange={handleChange}
            />
          </div>

          {/* assignee */}
          <div className="form-group row mt-4">
            <label htmlFor="assignee" className="col-sm-2 font-weight-bold">
              Assignee
            </label>
            <select
              disabled={
                (role === "user" ? true : false) || incident.acknowledged
              }
              className="form-control col-sm-7"
              name="assignee"
              value={incident.assignee}
              onChange={handleChange}
            >
              <option value="">Select a user</option>
              {assignees &&
                assignees.map((assignee, idx) => (
                  <option key={idx} value={assignee._id}>
                    {assignee.firstName} {assignee.lastName}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group row mt-4">
            <label htmlFor="status" className="col-sm-2 font-weight-bold">
              Status
            </label>
            <select
              className="form-control col-sm-7"
              name="status"
              value={incident.status}
              onChange={handleChange}
            >
              {statusOptions &&
                statusOptions.map((status, idx) => (
                  <option key={idx} value={status.key}>
                    {status.value}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group form-check mt-4">
            <input
              disabled={role === "admin" ? true : false}
              type="checkbox"
              className="form-check-input"
              name="acknowledged"
              checked={incident.acknowledged}
              onChange={handleChange}
            />
            <label htmlFor="acknowledged" className="form-check-label ml-2">
              Acknowledged
            </label>
          </div>
        </form>

        <button
          className="btn btn-outline-info my-4 mr-4 px-5"
          onClick={(e) => onSubmitBtnClick(e)}
        >
          Submit
        </button>

        <Link to="/incidents">
          <button className="btn btn-secondary my-4 mr-4 px-5">Cancel</button>
        </Link>
      </div>
    )
  );
};

export default EditIncidentComponent;
