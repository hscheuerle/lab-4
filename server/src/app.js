const express = require("express");
const bodyParser = require("body-parser");
const { mongoClient } = require("./middleware/setup");

const mainRouter = require("./routes/mainRouter");

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(mongoClient());

app.use(mainRouter);

module.exports = app;
