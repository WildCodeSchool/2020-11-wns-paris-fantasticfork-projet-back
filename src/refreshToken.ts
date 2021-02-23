import express from 'express';

const router = express.Router();

export default router.post('/', async (req, res) => {
  console.log(req.cookies);
});
