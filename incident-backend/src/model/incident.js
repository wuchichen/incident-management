const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  assigner: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
  assignee: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Number },
  updatedAt: { type: Number },
  acknowledged: { type: Boolean },
  status: { type: String }, // Pending, InProgress, Resolved,
});

schema.plugin(mongoosePaginate);

const model = mongoose.model("Incident", schema);

module.exports = {
  schema,
  model,
};
