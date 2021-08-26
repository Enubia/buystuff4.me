import { Document, model, Model, ObjectId, Schema } from 'mongoose';

export interface ICategory extends Document {
  _id: ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
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
      default: null,
    },
  },
  {
    collection: 'category',
  },
);

export const Category: Model<ICategory> = model<ICategory>(
  'Category',
  CategorySchema,
);
