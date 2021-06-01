import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import { AuthenticationError } from 'apollo-server-express';

export default async ({
  res,
  req,
}: {
  res: Response;
  req: Request;
}): Promise<AuthContextReturn> => {
  // when using websocket subscriptions, req is unset
  if (!req) {
    if (process.env.NODE_ENV !== 'dev')
      throw new AuthenticationError('NOT AUTHORIZED');
    return { res, isAuth: false };
  }

  const authHeader = req.get('Authorization');
  if (!authHeader) {
    if (process.env.NODE_ENV !== 'dev')
      throw new AuthenticationError('NOT AUTHORIZED');
    return { res, isAuth: false };
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    if (process.env.NODE_ENV !== 'dev')
      throw new AuthenticationError('NOT AUTHORIZED');
    return { res, isAuth: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (process.env.NODE_ENV !== 'dev')
      throw new AuthenticationError('NOT AUTHORIZED');
    return { res, isAuth: false };
  }

  if (!decodedToken) {
    if (process.env.NODE_ENV !== 'dev')
      throw new AuthenticationError('NOT AUTHORIZED');
    return { res, isAuth: false };
  }

  await UserModel.findByIdAndUpdate(decodedToken.userID, {
    $set: { lastActivity: Date.now() },
  });

  return { res, isAuth: true, userID: decodedToken.userID };
};

interface AuthContextReturn {
  res: Response;
  isAuth: boolean;
  userID?: string;
}
