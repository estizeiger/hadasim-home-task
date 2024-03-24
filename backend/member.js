const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tz: { type: Number, required: true },
});

module.exports = mongoose.model("Member", memberSchema);
