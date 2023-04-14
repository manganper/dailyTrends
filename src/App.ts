import express from 'express';
import './env';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res): void => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
