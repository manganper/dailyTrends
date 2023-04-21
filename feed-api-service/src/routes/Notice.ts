import { getFeed, getNotice, saveNotice, deleteNotice } from '@middlewares/Notice';
import { INotice } from '@types';
import express, { Request, Response } from 'express';

export const NoticeRouter = express.Router();

NoticeRouter.get('/notice/:id', async (req: Request, res: Response): Promise<void> => {
  const  id = req.params.id as string;
  try {
    const notice = await getNotice(id);
    if (notice) res.send(notice);
    else res.status(404).send('Notice not found');
  } catch (e) {
    res.status(404).send(e.message);
  }
});

NoticeRouter.get('/feed', async (req: Request, res: Response): Promise<void> => {
  const feed = await getFeed();
  res.send(feed);
});

NoticeRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  const notice = req.body as INotice;
  try {
    const id = await saveNotice(notice);
     if (id) res.status(201).send(`Create notice with id ${id}`);
     else res.status(400).send('Can\'t create the notice');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

NoticeRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const  id = req.params.id as string;
  try {
    const result = await deleteNotice(id);
    if (result) res.status(201).send('Delete notice!');
    else res.status(400).send('Can\'t delete the notice');
  } catch (e) {
    res.status(500).send(e.message);
  }
});
