import { AuthenticationError } from 'apollo-server-express';
import { hash } from 'bcryptjs';
import UserModel, { IUser, LoggedInResponse } from '../models/User';
import { createAccessToken } from '../helpers/createToken';

export const userQuery = {
  users: async (): Promise<IUser[]> => {
    const users = await UserModel.find({});
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

    return {
      userID: user._id,
      token: createAccessToken(user),
      tokenExpiration,
      firstname,
      lastname,
      role,
    };
  },
};
