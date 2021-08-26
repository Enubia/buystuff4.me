import { Document, Model, model, ObjectId, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  wishLists: string[];
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
    wishLists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'wishlist',
        required: true,
        trim: true,
        unique: true,
      },
    ],
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
      default: null,
    },
  },
  {
    collection: 'user',
  },
);

export const User: Model<IUser> = model<IUser>('User', UserSchema);
