const SujetController = require('./src/controllers/sujet.js');
const express = require("express");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const cors = require("cors");

const app = express();

mongoose.connect("mongodb://localhost:27017/stud-connect", {
        useCreateIndex: true,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to database !"))
    .catch((err) => console.log("Not connected :", err));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());

app.get('/sujet', asyncHandler(SujetController.read));
app.post('/sujet', asyncHandler(SujetController.create));
// app.get('/sujet/:_id', SujetController.readOne)

app.listen(5000, () => console.log("Server started on port 5000."))