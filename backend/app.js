const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const userRoutes = require("./routes/user.js");

const app = express();

mongoose
  .connect(`mongodb://127.0.0.1:27017/todo-app-v3`)
  .then(() => {
    console.log("conected to database");
  })
  .catch(() => {
    console.log("Conection to database failed");
  });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requestesd-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("server started on port 3000");
});
