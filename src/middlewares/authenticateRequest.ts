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
  // Remind : when using websocket subscriptions, req is unset

  try {
    const token = req?.get('Authorization')?.split(' ')[1] || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);

    await UserModel.findByIdAndUpdate(decodedToken?.userID, {
      $set: { lastActivity: Date.now() },
    });

    return { res, isAuth: true, userID: decodedToken?.userID };
  } catch (e) {
    if (process.env.NODE_ENV !== 'dev') {
      throw new AuthenticationError('NOT AUTHORIZED');
    } else {
      console.log(e);
      return { res, isAuth: false };
    }
  }
};

interface AuthContextReturn {
  res: Response;
  isAuth: boolean;
  userID?: string;
}
