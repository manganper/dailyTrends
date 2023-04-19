import { Origin } from '@config/Origin';
import { saveNotice } from '@middlewares/Notice';
import { INotice } from '@types';
import { getTodayDate } from '../../helpers/Notice';

const createMockNotice = (): INotice => ({
  tittle: 'Test Notice',
  body: 'This is a test notice',
  url: 'http://www.test.com',
  date: getTodayDate(),
  origin: Origin.MUNDO
});

const mundoNotices: INotice[] = [
  {
    tittle: 'Title 1',
    body: 'Body 1',
    url: 'http://example.com/1',
    date: getTodayDate(),
    origin: Origin.MUNDO,
  },
  {
    tittle: 'Title 2',
    body: 'Body 2',
    url: 'http://example.com/2',
    date: getTodayDate(),
    origin: Origin.MUNDO,
  },
];
const paisNotices: INotice[] = [
  {
    tittle: 'Title 3',
    body: 'Body 3',
    url: 'http://example.com/3',
    date: getTodayDate(),
    origin: Origin.PAIS,
  },
];
const apiNotices: INotice[] = [
  {
    tittle: 'Title 4',
    body: 'Body 4',
    url: 'http://example.com/4',
    date: getTodayDate(),
    origin: Origin.API,
  },
  {
    tittle: 'Title 5',
    body: 'Body 5',
    url: 'http://example.com/5',
    date: getTodayDate(),
    origin: Origin.API,
  },
];

const insertNotices = async (notices: INotice[]): Promise<void> => {
  for (const notice of notices) {
    await saveNotice(notice);
  }
};

export {
  createMockNotice,
  insertNotices,
  apiNotices,
  mundoNotices,
  paisNotices,
};
