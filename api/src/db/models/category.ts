import { model, Model, ObjectId, Schema } from 'mongoose';

export interface ICategory {
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
  },
  {
    collection: 'category',
  },
);

export const Category: Model<ICategory> = model('Category', CategorySchema);
