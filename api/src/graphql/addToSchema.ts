import { schemaComposer } from 'graphql-compose';
import { ObjectTypeComposerWithMongooseResolvers } from 'graphql-compose-mongoose';
import { Document } from 'mongoose';

export function addToSchema<T extends Document>(
  collection: string,
  TC: ObjectTypeComposerWithMongooseResolvers<T>,
): ObjectTypeComposerWithMongooseResolvers<T> {
  const query = {};
  // query[`${collection}ById`] = TC.mongooseResolvers.findById();
  // query[`${collection}ByIds`] = TC.mongooseResolvers.findByIds();
  // query[`${collection}One`] = TC.mongooseResolvers.findOne();
  // query[`${collection}Many`] = TC.mongooseResolvers.findMany();
  // query[`${collection}DataLoader`] = TC.mongooseResolvers.dataLoader();
  // query[`${collection}DataLoaderMany`] = TC.mongooseResolvers.dataLoaderMany();
  query[`${collection}ByIdLean`] = TC.mongooseResolvers.findById({
    lean: true,
  });
  query[`${collection}ByIdsLean`] = TC.mongooseResolvers.findByIds({
    lean: true,
  });
  query[`${collection}OneLean`] = TC.mongooseResolvers.findOne({ lean: true });
  query[`${collection}ManyLean`] = TC.mongooseResolvers.findMany({
    lean: true,
  });
  query[`${collection}DataLoaderLean`] = TC.mongooseResolvers.dataLoader({
    lean: true,
  });
  query[`${collection}DataLoaderManyLean`] =
    TC.mongooseResolvers.dataLoaderMany({ lean: true });
  query[`${collection}Count`] = TC.mongooseResolvers.count();
  // query[`${collection}Connection`] = TC.mongooseResolvers.connection();
  query[`${collection}Pagination`] = TC.mongooseResolvers.pagination();
  schemaComposer.Query.addFields(query);

  const mutations = {};
  mutations[`${collection}CreateOne`] = TC.mongooseResolvers.createOne();
  // mutations[`${collection}CreateMany`] = TC.mongooseResolvers.createMany();
  mutations[`${collection}UpdateById`] = TC.mongooseResolvers.updateById();
  // mutations[`${collection}UpdateOne`] = TC.mongooseResolvers.updateOne();
  // mutations[`${collection}UpdateMany`] = TC.mongooseResolvers.updateMany();
  mutations[`${collection}RemoveById`] = TC.mongooseResolvers.removeById();
  // mutations[`${collection}RemoveOne`] = TC.mongooseResolvers.removeOne();
  // mutations[`${collection}RemoveMany`] = TC.mongooseResolvers.removeMany();
  schemaComposer.Mutation.addFields(mutations);

  return TC;
}
