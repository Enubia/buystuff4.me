export interface IWishList {
  _id: string;
  link: string;
  description: string;
  categories: {
    _id: string;
    name: string;
  }[];
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
}

export interface IWishListManyResult {
  link: string;
  description: string;
  _id: string;
  categoryIds: string[];
  categories: {
    _id: string;
    name: string;
  }[];

  userByWishListId: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
}
