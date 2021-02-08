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
      throw new AuthenticationError('E-mail already exist');
    }
    //Verify password
    const hashedPassword = await hash(password, 12);
    console.log(hashedPassword);

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

    //
    const token = await jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFE_TIME,
    });
    return {
      userID: user._id || '',
      token: token || '',
      tokenExpiration: process.env.JWT_LIFE_TIME || '',
    };
  },
};
