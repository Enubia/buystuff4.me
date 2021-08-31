import { Document, model, Schema, Types } from 'mongoose';

export const Priority = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

export interface IWishList extends Document {
  _id: Types.ObjectId;
  link: string;
  priority: number;
  categoryIds: Types.ObjectId[];
  isPublished: boolean;
  lastPublishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

const WishlistSchema = new Schema<IWishList>(
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
        type: Types.ObjectId,
        ref: 'category',
        required: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    lastPublishedAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'wishList',
  },
);

export const WishList = model<IWishList>('WishList', WishlistSchema);
