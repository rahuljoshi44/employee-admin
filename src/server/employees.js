const express = require("express");
const router = express.Router();
const Employee = require("./models/Employee");

// get ALL employees from database.
router.get("/all", async (req, res) => {
  Employee.find().exec(function (err, leads) {
    res.send(leads);
  });
});

// Add employeee to database.
router.post("/add", async (req, res) => {
  const employee = new Employee({
    username: req.body.username,
    number: req.body.number,
    email: req.body.email,
  });
  try {
    res.send(employee.save());
  } catch (err) {
    res.json(err);
  }
});

// edit employee
router.post("/edit", async (req, res) => {
  Employee.findById(req.body.id).exec(function (err, employee) {
    employee.username = req.body.username;
    employee.email = req.body.email;
    employee.number = req.body.number;
    employee.save();
    res.send(employee);
  });
});

// delete employee
router.post("/delete", async (req, res) => {
  Employee.findById(req.body.id).exec(function (err, employee) {
    employee.remove();
    res.send({});
  });
});

module.exports = router;
