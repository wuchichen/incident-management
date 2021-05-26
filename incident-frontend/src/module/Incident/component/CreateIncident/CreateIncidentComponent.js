import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import IncidentService from "../../../../service/IncidentService";
import AuthSvc from "../../../../service/AuthService";

const CreateIncidentComponent = (props) => {
  const history = useHistory();

  const [incident, setIncident] = useState(() => {
    return {
      name: "",
      description: "",
      assigner: AuthSvc.getFullName(),
      assignee: "",
    };
  });

  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    IncidentService.getAssignees().then((data) => {
      setAssignees(data);
    });
  }, []);

  function onSubmitBtnClick(e) {
    IncidentService.createIncident(incident).then((data) => {
      toast.success("Create successfully");
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
      <div className="CreateIncidentComponent">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Create Incident</h1>
        </div>

        <form>
          {/* name */}
          <div className="form-group row mt-4">
            <label htmlFor="name" className="col-sm-2 font-weight-bold">
              Name
            </label>
            <input
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
              value={incident.assigner}
              onChange={handleChange}
            />
          </div>

          {/* assignee */}
          <div className="form-group row mt-4">
            <label htmlFor="assignee" className="col-sm-2 font-weight-bold">
              Assignee
            </label>
            <select
              type="text"
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

export default CreateIncidentComponent;
