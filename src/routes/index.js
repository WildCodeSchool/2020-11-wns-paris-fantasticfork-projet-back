const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// controllers
const TopicController = require('../controllers/topic.js');
const MessageController = require('../controllers/message.js');

// routes
router.get('/topics', TopicController.read);
router.get('/topic/:id', TopicController.readOne);
router.put('/topic', TopicController.create);
router.post('/message/:topicID', MessageController.create);

module.exports = router;
