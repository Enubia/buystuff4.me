import { model, Schema, Types, Document } from 'mongoose';

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
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
    collection: 'category',
  },
);

export const Category = model<ICategory>('Category', CategorySchema);
