import express from 'express';
import { verify } from 'jsonwebtoken';
import UserModel from './models/User';
import { createAccessToken } from './helpers/createToken';

const router = express.Router();

export default router.post('/', async (req, res) => {
  console.log(req.cookies);

  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, token: '' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decodedToken: any = null;
  try {
    decodedToken = verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, token: '' });
  }

  const user = await UserModel.findOne({ _id: decodedToken.userID });
  if (!user) {
    return res.send({ ok: false, token: '' });
  }

  return res.send({ ok: true, token: createAccessToken(user) });
});
