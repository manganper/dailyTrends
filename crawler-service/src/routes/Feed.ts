import express, { NextFunction, Request, Response } from 'express';
import { urlOrigin } from '@config/Origin';
import { scrape } from '@services/Crawler';

export const FeedRouter = express.Router();

FeedRouter.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.body.url) {
    res.status(400).send('Request malformed');
  } else if (!urlOrigin.includes(req.body.url)) {
    res.status(400).send('Incorrect url');
  } else {
    next();
  }
});

FeedRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body;
  try {
    await scrape(url);
    res.send('Successfully scraped');
  } catch (e) {
    res.status(500).send('Scraped failed');
  }
});
