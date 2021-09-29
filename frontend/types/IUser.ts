export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  wishListIds: string[];
  image?: string;
  wishLists?: {
    _id: string;
    link: string;
    description: string;
    categoryIds: string[];
    categories: {
      name: string;
    }[];
  }[];
}
