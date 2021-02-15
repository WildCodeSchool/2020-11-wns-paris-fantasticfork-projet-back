import { Request } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

export default async ({
  req,
}: {
  req: Request;
}): Promise<AuthContextReturn> => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return { isAuth: false };
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    return { isAuth: false };
  }

  let decodedToken;
  try {
    // was not able to find a way to give a type to the return of the jwt.verify() function
    decodedToken = <any>jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return { isAuth: false };
  }

  if (!decodedToken) {
    return { isAuth: false };
  }

  await UserModel.findByIdAndUpdate(decodedToken.userID, {
    $set: { lastActivity: Date.now() },
  });

  return { isAuth: true, userID: decodedToken.userID };
};

interface AuthContextReturn {
  isAuth: boolean;
  userID?: string;
}
