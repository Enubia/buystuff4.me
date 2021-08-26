import { Document, model, Model, ObjectId, Schema } from 'mongoose';

export const Priority = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

export interface IWishList extends Document {
  _id: ObjectId;
  link: string;
  priority: number;
  categoryIds: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const WishlistSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
      unique: true,
    },
    priority: {
      type: Number,
      default: Priority.NONE,
    },
    categoryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
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
    collection: 'wishList',
  },
);

export const WishList: Model<IWishList> = model<IWishList>(
  'WishList',
  WishlistSchema,
);
