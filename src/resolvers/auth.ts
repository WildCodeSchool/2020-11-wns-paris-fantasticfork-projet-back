import UserModel from '../models/User';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthFormData, LoggedInResponse } from '../models/User';

export const AuthentificationMutation = {
  login: async (
    _: unknown,
    { email, password }: AuthFormData
  ): Promise<LoggedInResponse> => {
    console.log(email, password);

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password isn't correct");
    }

    if (process.env.JWT_SECRET && process.env.JWT_LIFE_TIME) {
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFE_TIME,
      });

      return {
        userID: user._id,
        token: token,
        tokenExpiration: process.env.JWT_LIFE_TIME,
      };
    } else throw new Error('No JWT Secret provided in .env');
  },
};