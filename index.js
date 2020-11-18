// controllers
const SujetController = require('./src/controllers/sujet.js');
const MessageController = require('./src/controllers/message.js');

// dependancies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// init app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

// routes
app.get('/sujets', SujetController.read);
app.get('/sujet/:id', SujetController.readOne);
app.put('/sujet', SujetController.create);
app.post('/message/:sujetID', MessageController.create);

// db connect
mongoose.connect("mongodb://localhost:27017/stud-connect", {
        useCreateIndex: true,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to database !"))
    .catch((err) => console.log("Not connected :", err));

// app listen
app.listen(5000, () => console.log("Server started on port 5000."))