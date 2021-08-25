import { ObjectId } from 'mongoose';

export function getObjectIdAsString(id: ObjectId): string {
  return id.toString();
}
