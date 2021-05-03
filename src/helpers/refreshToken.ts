import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UserModel from '../models/User';
import { createAccessToken, createRefreshToken } from './createToken';
import sendRefreshToken from './sendRefreshToken';

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  const token = req.cookies.jid;
  console.log(token);

  if (!token) {
    console.log('no token');
    return res.send({ ok: false, token: '' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decodedToken: any;
  try {
    decodedToken = verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    console.log('no decoded token');
    console.log(err);
    return res.send({ ok: false, token: '' });
  }

  const user = await UserModel.findOne({ _id: decodedToken.userID });
  if (!user) {
    console.log('no user');
    return res.send({ ok: false, token: '' });
  }
  if (user.tokenVersion !== decodedToken.tokenVersion) {
    console.log('version diff');
    return res.send({ ok: false, token: '' });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, token: createAccessToken(user) });
};

export default refreshToken;
