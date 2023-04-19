import { MAX_NEWSPAPER_NOTICES } from '@config/Envs';
import { Origin } from '@config/Origin';
import { buildNoticeSchema, Notice } from '@models/Notice';
import { Feed, INotice } from '@types';
import { getTodayDate } from '../helpers/Notice';

const getNoticesFromOrigin = async (
  origin: Origin,
  date: string,
): Promise<INotice[]> => {
  const query = { origin, date };
  return (await Notice.find(query).limit(MAX_NEWSPAPER_NOTICES).exec()) as INotice[];
};

const saveNotice = async (notice: INotice): Promise<string> => {
  const noticeModel = buildNoticeSchema(notice);
  const result = await noticeModel.save();
  return result.id;
};

const getNotice = async (id: string): Promise<INotice> => {
  try {
    const query = Notice.findById(id);
    return (await query.exec()) as INotice;
  } catch (e) {
    throw new Error(`Unable to get a notice with id ${id}`);
  }
};

const deleteNotice = async (id: string): Promise<boolean> => {
  try {
    const query = Notice.findByIdAndDelete(id);
    const result = await query.exec();
    return !!result;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getFeed = async (): Promise<Feed> => {
  const mundoNotices = await getNoticesFromOrigin(Origin.MUNDO, getTodayDate());
  const paisNotices = await getNoticesFromOrigin(Origin.PAIS, getTodayDate());
  const apiNotices = await getNoticesFromOrigin(Origin.API, getTodayDate());
  const notices = mundoNotices.concat(paisNotices, apiNotices);
  return { notices };
};

export {
  deleteNotice,
  getFeed,
  getNotice,
  saveNotice,
};
