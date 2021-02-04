import UserModel, { IUser } from '../models/User';
import { hash, compare } from 'bcryptjs';

export const AuthentQuery = {
    login: async (_: unknown, { email, password }: AuthFormData) => {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            throw new Error('User not found');
        }
        const hashedPassword = await hash(password, 12);
        console.log(user.password, hashedPassword, password);
        // if (hashedPassword === user.password && hashedPassword !== '') {
        if (await compare(password, user.password)) {
            console.log('Good')
        } else {
            console.log('Bad')
        }
        return { userID: user._id, token: 'TOKEN', tokenExpiration: 1 };
    }
}

interface AuthFormData {
    email: string,
    password: string
}