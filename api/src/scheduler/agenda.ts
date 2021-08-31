import { Agenda } from 'agenda';
import { environment } from '../config';
import { createAgendaJobs } from './createAgendaJobs';

export async function createAgenda(): Promise<Agenda> {
  const agenda = new Agenda({
    db: {
      address: environment[process.env.NODE_ENV || 'development'].dbString,
    },
  });

  await agenda.start();

  createAgendaJobs(agenda);

  await agenda.every('1 day', 'update wishlist queue');

  return agenda;
}
