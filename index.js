// controllers
const TopicController = require('./src/controllers/topic.js');
const CommentController = require('./src/controllers/comment.js');
const UserController = require('./src/controllers/user.js')

// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

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
app.post('/topic', TopicController.create);

app.get('/comments/:topicID', CommentController.readCommentsByTopic);
app.post('/comment', CommentController.create);

app.post('/user', UserController.create);

// db connect
mongoose.connect(process.env.DB_CONN_STRING, {
        useCreateIndex: true,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to database !", new Date(Date.now()) ))
    .catch((err) => console.log("Not connected :", err));

// app listen
app.listen(process.env.APP_PORT, () => console.log("Server started on port 5000."))