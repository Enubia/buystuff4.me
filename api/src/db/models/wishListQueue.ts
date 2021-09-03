import { Document, model, Schema, Types } from 'mongoose';

export interface IWishListQueue extends Document {
  _id: Types.ObjectId;
  wishListId: Types.ObjectId;
  createdAt: Date;
}

const wishlistQueueSchema = new Schema<IWishListQueue>(
  {
    wishListId: {
      type: Schema.Types.ObjectId,
      ref: 'wishlist',
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
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
