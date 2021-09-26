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
    try {
      const token = connection.context.authToken
      if(!token) throw new Error("no token")
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
      if(!decodedToken.userID) throw new Error("Token not valid")

      return { isAuth: true, userID: decodedToken?.userID };
    } catch(e) {
      console.log(e)
      return { res, isAuth: false };
    }

  } else {
    try {
      const token = req?.get('Authorization')?.split(' ')[1] || '';
      if(!token) throw new Error("no authorization token")
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
      if(!decodedToken.userID) throw new Error("Token not valid")
      await UserModel.findByIdAndUpdate(decodedToken?.userID, {
        $set: { lastActivity: Date.now() },
      });

      return { res, isAuth: true, userID: decodedToken?.userID };
    } catch (e) {
        console.log(e);
        return { res, isAuth: false };
    }
  }
};

export interface AuthContext {
  res: Response;
  isAuth: boolean;
  userID?: string;
}
