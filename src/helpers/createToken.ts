import { sign } from 'jsonwebtoken';
import { IUser } from '../models/User';

export const createAccessToken = (user: IUser): string => {
  return sign({ userID: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  });
};

export const createRefreshToken = (user: IUser): string => {
  const tokenVersion: number = user.tokenVersion || 0;
  return sign(
    { userID: user._id, tokenVersion },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};
