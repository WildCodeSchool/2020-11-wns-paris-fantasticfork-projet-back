import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import UserModel from '../models/User';
import { createAccessToken, createRefreshToken } from './createToken';
import sendRefreshToken from './sendRefreshToken';

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.cookies.jid;
    console.log(token);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await UserModel.findOne({ _id: decodedToken.userID });
    if (user && user.tokenVersion === decodedToken.tokenVersion) {
      sendRefreshToken(res, createRefreshToken(user));
      return res.send({ ok: true, token: createAccessToken(user) });
    } else {
      return res.send({ ok: false, token: '' });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== 'dev') {
      throw new AuthenticationError('NOT AUTHORIZED');
    } else {
      console.log(e);
      return res.send({ ok: false, token: '' });
    }
  }
};

export default refreshToken;
