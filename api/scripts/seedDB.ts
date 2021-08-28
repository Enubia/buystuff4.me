/* eslint-disable import/no-extraneous-dependencies */
import * as faker from 'faker';
import { Types } from 'mongoose';
import { Category } from '../src/db/models/category';
import { logger } from '../src/helper/logger';
import { Mongoose } from '../src/db/connection';
import { Priority, WishList } from '../src/db/models/wishlist';
import { User } from '../src/db/models/user';

(async () => {
  const connection = await Mongoose.connect();

  await connection.dropCollection('user');
  await connection.dropCollection('wishList');
  await connection.dropCollection('category');

  // categories
  const available = [
    'Appliances',
    'Apps & Games',
    'Arts, Crafts, & Sewing',
    'Automotive Parts & Accessories',
    'Baby',
    'Beauty & Personal Care',
    'Books',
    'CDs & Vinyl',
    'Cell Phones & Accessories',
    'Clothing, Shoes and Jewelry',
    'Collectibles & Fine Art',
    'Computers',
    'Electronics',
    'Garden & Outdoor',
    'Grocery & Gourmet Food',
    'Handmade',
    'Health, Household & Baby Care',
    'Home & Kitchen',
    'Industrial & Scientific',
    'Kindle',
    'Luggage & Travel Gear',
    'Movies & TV',
    'Musical Instruments',
    'Office Products',
    'Pet Supplies',
    'Sports & Outdoors',
    'Tools & Home Improvement',
    'Toys & Games',
    'Video Games',
  ];

  const categoryPromises = [];
  const wishListPromises = [];
  const userPromises = [];

  for (const category of available) {
    categoryPromises.push(Category.create({ name: category }));
  }

  try {
    await Promise.all(categoryPromises);
  } catch (err) {
    logger.error(err);
  }

  // wishlists
  const categoryIds = await Category.find().select('_id').lean().exec();

  const getUsableCategories = () => {
    const result = [];

    for (let i = 0; i < faker.datatype.number({ min: 1, max: 3 }); i++) {
      const category =
        categoryIds[faker.datatype.number(categoryIds.length - 1)]._id;

      if (result.includes(category)) {
        result.push(
          categoryIds[faker.datatype.number(categoryIds.length - 1)]._id,
        );
      } else {
        result.push(category);
      }
    }

    return result;
  };

  const usedUrl = [];

  const getUsableUrl = () => {
    const url = faker.internet.url();
    if (usedUrl.includes(url)) {
      getUsableUrl();
    }

    usedUrl.push(url);
    return url;
  };

  for (let i = 0; i < 100; i++) {
    const data = {
      link: getUsableUrl(),
      priority: Priority[faker.datatype.number(3)],
      categoryIds: getUsableCategories(),
    };

    wishListPromises.push(WishList.create(data));
  }

  try {
    await Promise.all(wishListPromises);
  } catch (err) {
    logger.error(err);
  }

  // user
  const wishListIds = await WishList.find().select('_id').lean().exec();

  const usedLists = new Set<Types.ObjectId>();
  const getUsableLists = (): Types.ObjectId[] => {
    const result: Types.ObjectId[] = [];

    // eslint-disable-next-line @typescript-eslint/naming-convention
    for (const { _id } of wishListIds) {
      if (result.length < 4) {
        if (!usedLists.has(_id)) {
          usedLists.add(_id);
          result.push(_id);
        }
      } else {
        break;
      }
    }

    return result;
  };

  const usedEmails = [];
  const getUsableEmail = () => {
    const email = faker.internet.email();

    if (usedEmails.includes(email)) {
      getUsableEmail();
    }

    usedEmails.push(email);
    return email;
  };

  for (let i = 0; i < 25; i++) {
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: getUsableEmail(),
      wishListIds: getUsableLists(),
    };

    userPromises.push(User.create(data));
  }

  await Promise.all(userPromises);

  await Mongoose.disconnect();
})();
