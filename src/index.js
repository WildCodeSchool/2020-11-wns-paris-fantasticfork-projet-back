// controllers
const TopicController = require('./controllers/topic.js');
const CommentController = require('./controllers/comment.js');
const UserController = require('./controllers/user.js');

// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// init app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.get('/topics', TopicController.read);
app.get('/topic/:id', TopicController.readOne);
app.post('/topic', TopicController.create);
app.put('/topic/:id', TopicController.updateOne);
app.delete('/topic/:id', TopicController.deleteOne);

app.get('/comments/:topicID', CommentController.readCommentsByTopic);
app.post('/comment', CommentController.create);

app.post('/user', UserController.create);

// db connect
mongoose
  .connect(process.env.DB_CONN_STRING, {
    useCreateIndex: true,
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      'Connected to database on ',
      new Date(Date.now()).toLocaleString('fr-FR')
    )
  )
  .catch((err) => console.log('Not connected to database : ', err));

// app listen
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server runs on port :${process.env.APP_PORT} 🏃`)
);