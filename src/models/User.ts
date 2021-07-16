import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  tags?: [string];
  role?: userRole;
  createdAt?: Date;
  lastActivity?: Date | number;
  tokenVersion?: number;
}

export enum userRole {
  admin = 'ADMIN',
  student = 'STUDENT',
  teacher = 'TEACHER',
}

export interface AuthFormData {
  email: string;
  password: string;
}

export interface LoggedInResponse {
  userID: string;
  token: string;
  tokenExpiration: string;
  tokenVersion?: number;
  role?: string;
  firstname?: string;
  lastname?: string;
}

const UserModel = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"]    
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: "Password is Required",
      validate: [
        function(input) {
          return input.length >= 6;
        },
        "Password should be longer."
      ]
    },
    firstname: {
      type: mongoose.SchemaTypes.String,
      required: true,
      trim: true,
    },
    lastname: {
      type: mongoose.SchemaTypes.String,
      required: true,
      trim: true,
    },
    tags: [mongoose.SchemaTypes.String],
    role: {
      type: mongoose.SchemaTypes.String,
      enum: Object.values(userRole),
      default: userRole.student,
    },
    tokenVersion: {
      type: mongoose.SchemaTypes.Number,
      default: 0,
      required: false,
    },
    lastActivity: Date,
  },
  {
    timestamps: { createdAt: 'createdAt' },
  }
);

export default mongoose.model<IUser>('User', UserModel);
