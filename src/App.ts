import express from 'express';
import { PORT } from '@config/Envs';
import { connect } from '@database/Mongo';
import './env';

const app = express();
const port = PORT;

app.use(express.json());

app.get('/', (req, res): void => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  await connect();
  return console.log(`server is listening on ${port}`);
});
