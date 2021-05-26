const incidentSvc = require("../service/incident-service");

const createIncident = async (req, res) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Permission denied" });
  }
  const result = await incidentSvc.createIncident(
    req.user._id,
    req.body.name,
    req.body.description,
    req.body.assignee,
  );

  return res.status(200).json(result);
};

const getIncidents = async (req, res) => {
  const result = await incidentSvc.getIncidents(req.user, req.query);
  return res.status(200).json(result);
};

const getIncident = async (req, res) => {
  const incidentId = req.params.incidentId;
  const result = await incidentSvc.getIncident(incidentId);
  return result
    ? res.status(200).json(result)
    : res.status(404).json({ message: "Incident not found" });
};

const updateIncident = async (req, res) => {
  const incidentId = req.params.incidentId;
  await incidentSvc.updateIncident(req.user?.role, req.body, incidentId);
  return res.status(200).json({ message: "Success" });
};

const deleteIncident = async (req, res) => {
  const incidentId = req.params.incidentId;
  await incidentSvc.deleteIncident(incidentId);
  return res.status(200).json({ message: "Success" });
};

const getAssignees = async (req, res) => {
  const assignees = await incidentSvc.getAssignees();
  return res.status(200).json(assignees);
};

module.exports = {
  createIncident,
  getIncidents,
  getIncident,
  updateIncident,
  deleteIncident,
  getAssignees,
};
