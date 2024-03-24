const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const memberRoutes = require("./routes");

const app = express();

//mongodb:
//username: estizeiger
//password: rMLFQ9He1gRy9UNt
//current local ip address when creating (on 22/3/2024) : 213.151.37.163
mongoose
  .connect(
    "mongodb+srv://estizeiger:rMLFQ9He1gRy9UNt@cluster0.ttpd3o0.mongodb.net/angular-node-db?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection to database failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(memberRoutes);

module.exports = app;
