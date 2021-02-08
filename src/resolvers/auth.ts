import UserModel from '../models/User';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {} from 'apollo-server-express';
import { Request } from 'express';

export const AuthentMutation = {
  login: async (
    _: unknown,
    { email, password }: AuthFormData
  ): Promise<LoggedInResponse> => {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password isn't correct");
    }

    if (process.env.JWT_SECRET && process.env.JWT_LIFE_TIME) {
      const token = await jwt.sign(
        { userID: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFE_TIME }
      );

      await UserModel.findByIdAndUpdate(user._id, {
        $set: { lastActivity: Date.now() },
      });

      return {
        userID: user._id,
        token: token,
        tokenExpiration: process.env.JWT_LIFE_TIME,
      };
    } else throw new Error('No JWT Secret provided in .env');
  },
};

export const AuthentQuery = {
  testAuth: (_: unknown, token: string, context: Request): string => {
    if (context.isAuth) return context.userID || 'no user id';
    else return 'not connected';
  },
};

interface AuthFormData {
  email: string;
  password: string;
}

interface LoggedInResponse {
  userID: string;
  token: string;
  tokenExpiration: string;
}
