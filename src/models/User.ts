import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  tags?: [string];
  role?: userRole;
  createdAt?: Date;
}

export enum userRole {
  admin = 'ADMIN',
  student = 'STUDENT',
  teacher = 'TEACHER',
}

const UserModel = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
      match: /.+@.+\..+/,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
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
  },
  {
    timestamps: { createdAt: 'createdAt' },
  }
);

export default mongoose.model('User', UserModel);
