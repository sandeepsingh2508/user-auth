const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

//routes
const userRoutes = require("./routes/user");
//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

module.exports = app;
