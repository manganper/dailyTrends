import { Origin } from '@config/Origin';

export interface INotice {
  tittle: string,
  body: string,
  url: string,
  date: string,
  origin: Origin,
}
