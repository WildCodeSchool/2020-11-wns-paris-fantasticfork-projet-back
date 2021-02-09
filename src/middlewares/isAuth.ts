import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

export default async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  // was not able to find a way to give a type to the return of the jwt.verify() function
  // wich is the function that returns the decoded token from the request
  let decodedToken: any;
  try {
    if (process.env.JWT_SECRET) {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } else {
      req.isAuth = false;
      return next();
    }
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userID = decodedToken.userID;

  await UserModel.findByIdAndUpdate(decodedToken.userID, {
    $set: { lastActivity: Date.now() },
  });

  next();
};
