import { INotice } from '@types';
import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema<INotice, mongoose.Model<INotice>>({
  tittle: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
});

const Notice = mongoose.model('Notice', NoticeSchema);

const buildNoticeSchema = (attr: INotice) => new Notice(attr);

export {
  Notice,
  buildNoticeSchema,
};
