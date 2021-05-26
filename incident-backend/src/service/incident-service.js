const { dbManager } = require("./db-manager");
const ObjectId = require("mongoose").Types.ObjectId;

const createIncident = async (adminId, name, description, assignee) => {
  const incident = new dbManager.incident.model({
    name: name,
    description: description,
    assigner: new ObjectId(adminId),
    ...(assignee && { assignee: new ObjectId(assignee) }),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    status: "pending",
  });
  return incident.save();
};

const getIncidents = async (user, query) => {
  // Pagination query
  var filterQuery = {};
  if (user.role === "user") {
    filterQuery.assignee = new ObjectId(user._id);
  }
  if (query?.name) {
    filterQuery.name = { $regex: new RegExp(query.name), $options: "i" };
  }
  if (query?.status) {
    filterQuery.status = query.status;
  }

  // Pagination options
  var paginateOptions = {};
  if (query?.sortBy) {
    let arg = {};
    arg[query.sortBy] = "asc";
    paginateOptions.sort = arg;
  }
  paginateOptions.populate = [{ path: "assigner" }, { path: "assignee" }];
  paginateOptions.limit = query?.limit ? query.limit : 5;
  paginateOptions.page = query?.page ? query.page : 1;

  return dbManager.incident.model.paginate(filterQuery, paginateOptions);
};

const getIncident = async (incidentId) => {
  return dbManager.incident.model
    .findById(incidentId)
    .populate([{ path: "assigner" }])
    .lean();
};

const updateIncident = async (role, body, incidentId) => {
  var data;
  switch (role) {
    case "admin":
      data = {
        name: body.name,
        description: body.description,
        status: body.status,
        ...(body.assignee && { assignee: new ObjectId(body.assignee) }),
        updatedAt: Date.now(),
      };
      break;
    case "user":
      data = {
        acknowledged: body.acknowledged,
        status: body.status,
        updatedAt: Date.now(),
      };
      break;
    default:
      return Promise.reject();
  }
  return dbManager.incident.model.findOneAndUpdate(
    { _id: new ObjectId(incidentId) },
    data,
    {
      useFindAndModify: false,
      new: true,
    },
  );
};

const deleteIncident = async (incidentId) => {
  return dbManager.incident.model
    .findOneAndDelete({
      _id: new ObjectId(incidentId),
    })
    .lean();
};

const getAssignees = async () => {
  const users = await dbManager.user.model.find().lean();
  return users.map((user) => {
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  });
};

module.exports = {
  createIncident,
  getIncidents,
  getIncident,
  updateIncident,
  deleteIncident,
  getAssignees,
};
