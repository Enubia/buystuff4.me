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
  description?: string;
  isPublished: boolean;
  lastPublishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

const WishListSchema = new Schema<IWishList>(
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
    description: {
      type: String,
    },
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
      default: new Date(),
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

export const WishList = model<IWishList>('WishList', WishListSchema);
