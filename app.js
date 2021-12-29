const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require('./DB')
const urlRouter = require('./src/routes/URL')

connectDB();

app.use(bodyParser.json())
app.use('/',urlRouter)

module.exports = app;
