import { Document, model, Schema, Types } from 'mongoose';

export interface IWishListQueue extends Document {
  _id: Types.ObjectId;
  wishListId: Types.ObjectId;
  createdAt: Date;
}

const wishlistQueueSchema = new Schema<IWishListQueue>(
  {
    wishListId: {
      type: Types.ObjectId,
      ref: 'wishlist',
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: 'wishListQueue',
  },
);

export const WishListQueue = model<IWishListQueue>(
  'WishListQueue',
  wishlistQueueSchema,
);
