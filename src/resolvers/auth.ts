import UserModel from '../models/User';
import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { AuthFormData, LoggedInResponse } from '../models/User';
import { createAccessToken, createRefreshToken } from '../helpers/createToken';
import sendRefreshToken from '../helpers/sendRefreshToken';

export const AuthQuery = {
  testAuth: (_: unknown, token: string, context: Request): string => {
    if (context.isAuth) return context.userID || 'no user id';
    else return 'not connected';
  },
};

export const AuthMutation = {
  login: async (
    _: unknown,
    { email, password }: AuthFormData,
    { res }: { res: Response }
  ): Promise<LoggedInResponse> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password isn't correct");
    }

    if (process.env.JWT_SECRET && process.env.JWT_LIFE_TIME) {
      await UserModel.findByIdAndUpdate(user._id, {
        $set: { lastActivity: Date.now() },
      });

      sendRefreshToken(res, createRefreshToken(user));

      return {
        userID: user._id,
        token: createAccessToken(user),
        tokenExpiration: process.env.JWT_LIFE_TIME,
      };
    } else throw new Error('No JWT Secret provided in .env');
  },

  revokeRefreshToken: async (
    _: unknown,
    { userId }: { userId: string }
  ): Promise<boolean> => {
    try {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { $inc: { tokenVersion: 1 } }
      );

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
