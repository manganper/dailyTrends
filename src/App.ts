import express, { NextFunction, Request, Response } from 'express';
import './env';
import { PORT, SECURITY_HEADER } from '@config/Envs';
import { connect } from '@database/Mongo';
import { NoticeRouter } from '@routes/Notice';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  if (SECURITY_HEADER && req.headers.security !== SECURITY_HEADER) {
    res.status(401).send('Unauthorized request');
  } else {
    next();
  }
});

app.use(express.json());

app.use('/notice', NoticeRouter);

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});

app.listen(PORT, async () => {
  await connect();
  return console.log(`server is listening on ${PORT}`);
});
