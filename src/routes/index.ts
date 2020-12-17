export {}
import { Request, Response } from 'express'

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// controllers
const TopicController = require('../controllers/topic.js');
const CommentController = require('../controllers/comment.js');

// routes
router.get('/', (req: Request, res: Response) => {
  res.send('Connected!');
});
router.get('/topics', TopicController.read);
router.get('/topic/:id', TopicController.readOne);
router.post('/topic', TopicController.create);
router.post('/message/:topicID', CommentController.create);

module.exports = router;
