import express, { Request, Response } from 'express';
// controllers
import TopicController from '../controllers/topic.js';
import CommentController from '../controllers/comment.js';

const router = express.Router();

// routes
router.get('/', (req: Request, res: Response) => {
  res.send('Connected!');
});
router.get('/topics', TopicController.read);
router.get('/topic/:id', TopicController.readOne);
router.post('/topic', TopicController.create);
router.post('/message/:topicID', CommentController.create);

export default router;
