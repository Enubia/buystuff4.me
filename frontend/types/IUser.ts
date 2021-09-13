export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  wishListIds: string[];
  image?: string;
}
