import { AuthenticationError } from 'apollo-server-express';
import { hash } from 'bcryptjs';
import UserModel, { IUser } from '../models/User';

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
  ): Promise<IUser> => {
    //Verify if user exist
    const existUser = await UserModel.findOne({ email }).exec();
    console.log(existUser);

    if (existUser) {
      throw new AuthenticationError('E-mail already exist');
    }

    const hashedPassword = await hash(password, 12);
    console.log(hashedPassword);

    const newUser = {
      email,
      password: hashedPassword,
      firstname,
      lastname,
      tags,
      role,
    };

    const user = new UserModel(newUser);
    return await user.save();
  },
};
