const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const postRoutes=require("./routes/posts")
const userRoutes=require("./routes/auth")

mongoose
  .connect(
    "mongodb+srv://king:"+process.env.MONGO_ATLAS_PW+"@node-netninja.4r9my.mongodb.net/posts",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Connected failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE"
  );
  next();
});

app.use("/api/posts",postRoutes)
app.use("/api/user",userRoutes)

module.exports = app;
