import { Agenda } from 'agenda';
import { Types } from 'mongoose';
import { WishList } from '../db/models/wishlist';
import { ResultQueue } from '../db/models/resultQueue';

export function createAgendaJobs(agenda: Agenda): void {
  agenda.define('update wishlist queue', async () => {
    const result = await WishList.updateMany(
      {
        // get every list that older than 30 days and set to unpublished
        lastPublishedAt: { $lt: new Date(new Date().getDate() - 30) },
      },
      {
        isPublished: false,
      },
    );

    if (result.nModified > 0) {
      const { wishListIds } = await ResultQueue.findOne().lean().exec();

      // update result queue according to how many lists are affected
      for (let i = 0; i < result.nModified; i++) {
        const id = wishListIds[i];

        // set the next item in queue to published
        await WishList.updateOne(
          { _id: new Types.ObjectId(id) },
          { isPublished: true },
        ).exec();

        // remove it from the queue
        await ResultQueue.updateOne(
          { wishListIds: { $in: [new Types.ObjectId(id)] } },
          { $pull: new Types.ObjectId(id) },
        ).exec();
      }
    }
  });
}
