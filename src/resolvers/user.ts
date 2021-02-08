import { AuthenticationError } from 'apollo-server-express';
import { hash } from 'bcryptjs';
import UserModel, { IUser, LoggedInResponse } from '../models/User';
import jwt from 'jsonwebtoken';

export const userQuery = {
  users: async (): Promise<IUser[]> => {
    const users = await UserModel.find({});
    console.log(users);

    return users;
  },
};

export const userMutation = {
  signUp: async (
    _: unknown,
    { email, password, firstname, lastname, tags, role }: IUser
  ): Promise<LoggedInResponse> => {
    //Verify if user exist
    const existUser = await UserModel.findOne({ email }).exec();
    if (existUser) {
      throw new AuthenticationError('E-mail already in use');
    }

    //Verify password
    const hashedPassword = await hash(password, 12);

    //Register a new user
    const newUser = {
      email,
      password: hashedPassword,
      firstname,
      lastname,
      tags,
      role,
    };
    const user = await new UserModel(newUser).save();
    if (!user) {
      throw new Error('User not found');
    }

    //create token
    const tokenExpiration = process.env.JWT_LIFE_TIME || '';

    const token = jwt.sign(
      { userID: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: tokenExpiration }
    );
    console.log(token);

    return {
      userID: user._id,
      token: token,
      tokenExpiration,
    };
  },
};
