const mongoose = require("mongoose");

// const vaccineSchema = new Schema({ vaccineDate: Date, manufacturer: String });

const memberSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tz: { type: Number, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  houseNumber: { type: Number, required: true },
  phone: { type: Number, required: true },
  mobile: { type: Number, required: true },
  positiveResultDate: { type: Date },
  recoveryDate: { type: Date },
  vaccines: [
    {
      vaccineDate: { type: Date, required: true },
      manufacturer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Member", memberSchema);
