import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import { AuthenticationError } from 'apollo-server-express';

export default async ({ res, req, connection }: {
  res: Response;
  req: Request;
  connection: any;
}): Promise<AuthContext | any> => {
  // Subscriptions
  if (connection?.context) {
    const token = connection.context.authToken
    if(!token) throw new AuthenticationError('NOT AUTHORIZED');
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
    if(!decodedToken) throw new AuthenticationError('NOT AUTHORIZED');
    return { isAuth: true, userID: decodedToken?.userID };

  } else {
    const token = req?.get('Authorization')?.split(' ')[1] || '';
    if(!token) throw new AuthenticationError('NOT AUTHORIZED');
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
    if(!decodedToken) throw new AuthenticationError('NOT AUTHORIZED');

    try {
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
  }
};

export interface AuthContext {
  res: Response;
  isAuth: boolean;
  userID?: string;
}
