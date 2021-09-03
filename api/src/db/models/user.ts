import { model, Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  wishListIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date | null;
}

const UserSchema = new Schema<IUser>(
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
    wishListIds: [
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
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'user',
  },
);

export const User = model<IUser>('User', UserSchema);
