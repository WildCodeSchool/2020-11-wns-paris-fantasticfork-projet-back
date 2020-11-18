// controllers
const TopicController = require('./src/controllers/topic.js');
const MessageController = require('./src/controllers/message.js');

// dependencies
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
app.get('/topics', TopicController.read);
app.get('/topic/:id', TopicController.readOne);
app.put('/topic', TopicController.create);
app.post('/message/:topicID', MessageController.create);

// db connect
mongoose.connect("mongodb+srv://fantastic:fork@stud-connect.zfeul.mongodb.net/stud-connect?retryWrites=true&w=majority", {
        useCreateIndex: true,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to database !", new Date(Date.now()) ))
    .catch((err) => console.log("Not connected :", err));

// app listen
app.listen(5000, () => console.log("Server started on port 5000."))