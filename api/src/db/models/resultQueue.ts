import { Document, model, Schema, Types } from 'mongoose';

export interface IResultQueue extends Document {
  wishListIds: Types.ObjectId[];
}

const resultQueueSchema = new Schema<IResultQueue>({
  wishListIds: [
    {
      type: Types.ObjectId,
      ref: 'wishlist',
      required: true,
    },
  ],
});

export const ResultQueue = model<IResultQueue>(
  'ResultQueue',
  resultQueueSchema,
);
