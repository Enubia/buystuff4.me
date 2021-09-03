import { Agenda } from 'agenda';
import { Types } from 'mongoose';
import { WishList } from '../db/models/wishList';
import { WishListQueue } from '../db/models/wishListQueue';

export function createAgendaJobs(agenda: Agenda): void {
  agenda.define('update wishlist queue', async () => {
    const result = await WishList.updateMany(
      {
        // get every list that is older than 30 days and set to unpublished
        lastPublishedAt: { $lt: new Date(new Date().getDate() - 30) },
      },
      {
        isPublished: false,
      },
    );

    if (result.modifiedCount > 0) {
      const queueResult = await WishListQueue.find().lean().exec();

      // update result queue according to how many lists are affected
      for (let i = 0; i < result.modifiedCount; i++) {
        const item = queueResult[i];

        // set the next item in queue to published
        await WishList.updateOne(
          { _id: new Types.ObjectId(String(item.wishListId)) },
          { isPublished: true },
        ).exec();

        // remove it from the queue
        await WishListQueue.remove({
          wishListId: new Types.ObjectId(String(item.wishListId)),
        }).exec();
      }
    }
  });
}
