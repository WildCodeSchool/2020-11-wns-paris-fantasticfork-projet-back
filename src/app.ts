export {}
const express = require('express');
const cors = require('cors');
const route = require('./routes/index');

// init app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use(route);

module.exports = app;
