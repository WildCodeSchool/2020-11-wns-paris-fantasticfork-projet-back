import UserModel, { IUser } from '../models/User';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const AuthentQuery = {
    login: async (_: unknown, { email, password }: AuthFormData) => {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Password isn\'t correct');
        }

        if (process.env.JWT_SECRET) {
            const token = await jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFE_TIME });
            return { userID: user._id, token: token, tokenExpiration: process.env.JWT_LIFE_TIME };
        }

    }
}

interface AuthFormData {
    email: string,
    password: string
}
