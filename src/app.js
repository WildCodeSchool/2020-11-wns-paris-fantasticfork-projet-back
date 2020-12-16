const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./routes');

// init app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use(route);

module.exports = app;
