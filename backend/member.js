const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tz: { type: Number, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  houseNumber: { type: Number, required: true },
  phone: { type: String, required: true },
  mobile: { type: String, required: true },
  positiveResultDate: { type: Date, default: new Date() },
  recoveryDate: { type: Date },
  vaccines: [
    {
      vaccineDate: { type: Date, required: true },
      manufacturer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Member", memberSchema);
