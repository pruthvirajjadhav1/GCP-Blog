
var express = require('express');
var cors = require("cors");
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // Connect to MongoDB
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api', require('./api'))

module.exports = app;