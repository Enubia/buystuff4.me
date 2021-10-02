import { Agenda } from 'agenda';
import { createAgendaJobs } from './createAgendaJobs';

let dbString = '';
const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  dbString = process.env.MONGO_URL;
} else if (NODE_ENV === 'testing') {
  dbString = process.env.MONGO_URL_TESTING;
} else {
  dbString = process.env.MONGO_URL_LOCAL;
}

export async function createAgenda(): Promise<Agenda> {
  const agenda = new Agenda({
    db: {
      address: dbString,
    },
  });

  await agenda.start();

  createAgendaJobs(agenda);

  await agenda.every('1 day', 'update wishlist queue');

  return agenda;
}
