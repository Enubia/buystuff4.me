import { Document, Model, model, ObjectId, Schema } from 'mongoose';
import { ICategory } from './category';

export enum Priority {
  'NONE' = 0,
  'LOW' = 1,
  'MEDIUM' = 2,
  'HIGH' = 3,
}
export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  wishLists: string[];
  categories: ICategory[];
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    wishLists: {
      type: [String],
      required: true,
      trim: true,
    },
    categories: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    priority: {
      type: Number,
      default: Priority.NONE,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    deletedAt: {
      type: Date,
      default: undefined,
    },
  },
  {
    collection: 'user',
  },
);

export const User: Model<IUser> = model('User', UserSchema);
