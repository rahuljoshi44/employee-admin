const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

// middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Server for admin");
});

const employeeRoutes = require("./employees");
app.use("/api/employees", employeeRoutes);

// connect to MongoDB
mongoose.connect(
  "mongodb+srv://rahul:leTTuce212@employeecluster-w9qp4.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

const port = 4000;
app.listen(port);
console.log(`Listening on port ${port}`);
