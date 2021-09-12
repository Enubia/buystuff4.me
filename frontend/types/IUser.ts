export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  wishListIds: string[];
  image?: string;
}

export interface IPreparedUser {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
  wishLists: {
    link: string;
    categories: {
      name: string;
    }[];
  }[];
}
