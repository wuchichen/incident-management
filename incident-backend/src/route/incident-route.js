const router = require("express").Router();
const incidentController = require("../controller/incident-controller");

router.post("/", incidentController.createIncident);

router.get("/", incidentController.getIncidents);

router.get("/:incidentId", incidentController.getIncident);

router.put("/:incidentId", incidentController.updateIncident);

router.delete("/:incidentId", incidentController.deleteIncident);

router.get("/assignees/list", incidentController.getAssignees);

module.exports = router;
