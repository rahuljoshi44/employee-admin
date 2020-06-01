const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 20,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employees", EmployeeSchema);
